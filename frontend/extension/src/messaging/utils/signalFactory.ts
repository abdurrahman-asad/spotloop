interface Signal<T = void> {
  emit: (params?: { tabId?: number; payload?: T }) => void;
  subscribe: (callback: (payload: T) => void) => void;
  unsubscribe: () => void;
}

const emitToContent = <T>(message: T, tabId?: number): void => {
  if (tabId) {
    chrome.tabs.sendMessage(tabId, message);
  } else {
    chrome.tabs.query({}, tabs => {
      tabs.forEach(tab => {
        if (tab.id) {
          chrome.tabs.sendMessage(tab.id, message);
        }
      });
    });
  }
  chrome.runtime.sendMessage(message);
};

/**
 * Creates a signal object that can be used to emit and subscribe to events.
 * This is useful for communication from service worker to content scripts.
 *
 * @param signalName The name of the signal.
 * @returns An object with emit, subscribe, and unsubscribe methods.
 */
export const createSignal = <T = void>(signalName: string): Signal<T> => {
  let handler: ((msg: { signal: string; payload: T }) => void) | null = null;

  const createHandler = (callback: (payload: T) => void) => {
    return (msg: { signal: string; payload: T }) => {
      if (msg.signal === signalName) {
        callback(msg.payload);
      }
    };
  };

  return {
    emit: params => {
      const { tabId, payload } = params ?? {};
      emitToContent({ signal: signalName, payload }, tabId);
    },
    subscribe: (callback: (payload: T) => void) => {
      handler = createHandler(callback);
      chrome.runtime.onMessage.addListener(handler);
    },
    unsubscribe: () => {
      if (handler) {
        chrome.runtime.onMessage.removeListener(handler);
        handler = null;
      }
    },
  };
};
