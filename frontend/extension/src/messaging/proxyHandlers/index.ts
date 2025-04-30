import * as ping from './ping';
import * as test from './test';

/*
  Any function exported from following modules will be registered as a message handler
  in the service worker. The same functions will be available to be used as message proxies
  in the content script(export them form index file in the messaging module).

  Function names should be unique across all handlers.
*/
export const handlers = {
  ...ping,
  ...test,
};
