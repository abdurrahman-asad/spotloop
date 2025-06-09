import { useEffect, useState } from 'react';
import { getCurrentTab, injectScriptInCurrentTab, STORAGE_KEYS } from '../../utils';
import { startDOMCapture, stopDOMCapture } from '../../messaging/signals';
import createSpotScriptPath from '../../content-scripts/createSpot?script';
import type { StopDOMCapturePayload } from '../../messaging/types';

export const useElementSelection = () => {
  const [isSelectingElement, setIsSelectingElement] = useState<boolean>(false);
  const [selectedElement, setSelectedElement] = useState<StopDOMCapturePayload>();

  const selectElement = async () => {
    setSelectedElement(undefined);
    setIsSelectingElement(true);
    const currentTab = await getCurrentTab();
    await injectScriptInCurrentTab(createSpotScriptPath);
    startDOMCapture.emit({ tabId: currentTab?.id });
    chrome.storage.local.set({ [STORAGE_KEYS.captureTabId]: currentTab?.id });
  };

  const cancelSelection = async () => {
    setIsSelectingElement(false);
    const { tabId } = await chrome.storage.local.get(STORAGE_KEYS.captureTabId);
    stopDOMCapture.emit({ tabId });
    await chrome.storage.local.remove(STORAGE_KEYS.captureTabId);
  };

  useEffect(() => {
    const handleStopCapture = (payload: StopDOMCapturePayload) => {
      setSelectedElement(payload);
      setIsSelectingElement(false);
    };
    stopDOMCapture.subscribe(handleStopCapture);
    return () => {
      stopDOMCapture.unsubscribe();
    };
  }, []);

  return {
    selectElement,
    cancelSelection,
    selectedElement,
    setSelectedElement,
    isSelectingElement,
  };
};
