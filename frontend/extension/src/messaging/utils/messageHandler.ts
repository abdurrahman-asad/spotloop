import { handlers } from '../proxyHandlers';

type MessageRequest = {
  __name: string;
  params: any[];
};

export const messageHandler = (
  message: MessageRequest,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: any) => void,
) => {
  if (!message.__name) return;

  const fn = (handlers as Record<string, (...params: any[]) => any>)[message.__name];
  if (!fn) {
    sendResponse({ error: `No such method: ${message.__name}` });
    return;
  }

  Promise.resolve(fn(...message.params, sender?.tab))
    .then(result => sendResponse(result))
    .catch(err => sendResponse({ error: err.message }));

  return true;
};
