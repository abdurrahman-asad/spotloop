import { getCurrentTab, injectScriptInCurrentTab, STORAGE_KEYS } from '../../utils';
import createSpotScriptPath from '../../content-scripts/createSpot?script';
import { startDOMCapture } from '../../messaging/signals';

export const onCreateAutomation = async () => {
  const currentTab = await getCurrentTab();
  await injectScriptInCurrentTab(createSpotScriptPath);
  startDOMCapture.emit({ tabId: currentTab?.id });
  chrome.storage.local.set({ [STORAGE_KEYS.captureTabId]: currentTab?.id });
};
