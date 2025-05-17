import { getCurrentTab, STORAGE_KEYS } from '../../utils';
import { stopDOMCapture } from '../signals';

export const emitStopDOMCapture = async () => {
  const currentTab = await getCurrentTab();
  stopDOMCapture.emit({ tabId: currentTab?.id });
  chrome.storage.local.remove(STORAGE_KEYS.captureTabId);
};
