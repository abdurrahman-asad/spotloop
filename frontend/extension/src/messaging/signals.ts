import { createSignal } from './utils/signalFactory';
import type { StopDOMCapturePayload } from './types';

/*
  SIGNAL NAME MUST BE UNIQUE

  DON'T FORGET TO UNSUBSCRIBE THE SIGNALS IN THE CONTENT SCRIPTS
*/

export const stopDOMCapture = createSignal<StopDOMCapturePayload>('STOP_DOM_CAPTURE');

export const startDOMCapture = createSignal('START_DOM_CAPTURE');

export const pingDOMCaptureScript = createSignal('PING_DOM_CAPTURE_SCRIPT');
