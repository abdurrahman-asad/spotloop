import { getCurrentTab, injectScriptInCurrentTab, STORAGE_KEYS } from '../../utils';
import createSpotScriptPath from '../../content-scripts/createSpot?script';
import { startDOMCapture } from '../../messaging/signals';

/**
 * Injects the createSpot script into the current tab.
 * If the script is alredy injected, ignore the injection and trigger the already present script.
 */
export const onCreateSpot = async () => {
  const currentTab = await getCurrentTab();
  await injectScriptInCurrentTab(createSpotScriptPath);
  startDOMCapture.emit({ tabId: currentTab?.id });
  chrome.storage.local.set({ [STORAGE_KEYS.captureTabId]: currentTab?.id });
};
