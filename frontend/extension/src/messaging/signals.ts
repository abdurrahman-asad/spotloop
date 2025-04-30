import { createSignal } from './utils/signalFactory';

/*
  SIGNAL NAME MUST BE UNIQUE

  DON'T FORGET TO UNSUBSCRIBE THE SIGNALS IN THE CONTENT SCRIPTS
*/

export const testingSignal = createSignal<string>('testing');
