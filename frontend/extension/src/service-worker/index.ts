import { messageHandler } from '../messaging/utils/messageHandler';

chrome.runtime.onMessage.addListener(messageHandler);

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});
