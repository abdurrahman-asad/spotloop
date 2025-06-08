import { STORAGE_KEYS } from '../../utils';
import { stopDOMCapture } from '../signals';

export const emitStopDOMCapture = async (XPath: string, senderTab?: chrome.tabs.Tab) => {
  stopDOMCapture.emit({ payload: { XPath }, tabId: senderTab?.id });
  chrome.storage.local.remove(STORAGE_KEYS.captureTabId);
};
