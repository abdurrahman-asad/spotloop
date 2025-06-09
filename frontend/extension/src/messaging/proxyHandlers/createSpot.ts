import { STORAGE_KEYS } from '../../utils';
import { stopDOMCapture } from '../signals';
import type { StopDOMCapturePayload } from '../types';

export const emitStopDOMCapture = async (
  payload: StopDOMCapturePayload,
  senderTab?: chrome.tabs.Tab,
) => {
  stopDOMCapture.emit({ payload, tabId: senderTab?.id });
  chrome.storage.local.remove(STORAGE_KEYS.captureTabId);
};
