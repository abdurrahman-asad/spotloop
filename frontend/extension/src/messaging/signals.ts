import { createSignal } from './utils/signalFactory';

/*
  SIGNAL NAME MUST BE UNIQUE

  DON'T FORGET TO UNSUBSCRIBE THE SIGNALS IN THE CONTENT SCRIPTS
*/

export const stopDOMCapture = createSignal('STOP_DOM_CAPTURE');

export const startDOMCapture = createSignal('START_DOM_CAPTURE');

export const pingDOMCaptureScript = createSignal('PING_DOM_CAPTURE_SCRIPT');
