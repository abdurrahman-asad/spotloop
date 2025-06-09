import { messageHandler } from '../messaging/utils/messageHandler';
import createSpotScriptPath from '../content-scripts/createSpot?script';
import { STORAGE_KEYS } from '../utils';
import { stopDOMCapture } from '../messaging/signals';

chrome.runtime.onMessage.addListener(messageHandler);

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

chrome.runtime.onConnect.addListener(function (port) {
  if (port.name === 'sidepanel-close-trigger-offloadit') {
    port.onDisconnect.addListener(async () => {
      stopDOMCapture.emit();
    });
  }
});

// remove the captureTabId when the tab is reloaded/navigated
chrome.webNavigation.onBeforeNavigate.addListener(async details => {
  if (details.frameId === 0) {
    const { captureTabId } = await chrome.storage.local.get(STORAGE_KEYS.captureTabId);
    if (details.tabId === captureTabId) {
      chrome.storage.local.remove(STORAGE_KEYS.captureTabId);
    }
  }
});

chrome.webNavigation.onCompleted.addListener(async details => {
  if (details.frameId !== 0) {
    const { captureTabId } = await chrome.storage.local.get(STORAGE_KEYS.captureTabId);
    if (details.tabId === captureTabId) {
      try {
        chrome.scripting.executeScript<any[], boolean>({
          target: { tabId: details.tabId, frameIds: [details.frameId] },
          files: [createSpotScriptPath],
        });
      } catch (err) {
        console.warn('Injection failed:', err);
      }
    }
  }
});

// remove the captureTabId when the tab is closed
chrome.tabs.onRemoved.addListener(async tabId => {
  const { captureTabId } = await chrome.storage.local.get(STORAGE_KEYS.captureTabId);
  if (tabId === captureTabId) {
    chrome.storage.local.remove(STORAGE_KEYS.captureTabId);
  }
});
