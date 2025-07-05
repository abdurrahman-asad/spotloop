# Messaging Module

The messaging module provides a robust system for communication between different parts of the extension, particularly between content scripts and the service worker(or sidepanel). It consists of two main components: signals and message proxies.

## Signals

Signals are used for broadcasting events from serivce worker(or sidepanel) to content scripts and across the internal pages. They follow a publish-subscribe pattern.

### Registering a Signal

You can create new signals in `signals.ts` file and add the payload type, to be used later for the callback in content script, if necessary:

```typescript
// Create a new signal with a unique identifier
export const mySignal = createSignal<payloadTypeForCallback>('myUniqueSignalIdentifier');
```

### Using Signals

Emit the signal from service worker or sidepanel:
```typescript
import { mySignal } from '../messaging/signals';

mySignal.emit()
```

In content scripts:
```typescript
import { mySignal } from '../messaging/signals';

// Subscribe to the signal
mySignal.subscribe((data) => {
  // Handle the signal data
  console.log('Signal received:', data);
});

// Don't forget to unsubscribe when component unmounts or however appropriate
mySignal.unsubscribe();
```

## Message Proxies

Message proxies provide a type-safe way to send messages between different parts of the extension. They are primarily used in content scripts to communicate with the service worker or the sidepanel.

### Registering a Message Proxy

1. First, create handlers in the `proxyHandlers` directory:
```typescript
// proxyHandlers/myHandler.ts
export const handle = async (data: any) => {
    // Do something
    return { success: true };
  }
```

2. Register the handlers in `proxyHandlers/index.ts` as follows:
```typescript
import * as myHandler from './myHandler';

export const handlers = {
  ...myHandler,
  // ... other handlers
};
```

3. The proxies will be automatically generated in `proxies.ts` and you just need to export them like:
```typescript
export const {
  myHandler: myHandler_px,
  // ... other proxies
} = generateMessageProxies(handlers);
```

### Using Message Proxies

In content scripts:
```typescript
import { myHandler_px } from '../messaging/proxies';

// Send a message using the proxy
const result = await myHandler_px({ /* your data */ });
```

## Mandatory Guidelines

1. Always use the `_px` suffix for message proxies to clearly indicate their purpose
2. Message proxies should only be used in content scripts
3. Always unsubscribe from signals when components unmount to prevent memory leaks
4. Keep signal identifiers unique and descriptive
5. Use TypeScript types for message data to ensure type safety

## Module Structure

```
messaging/
├── proxyHandlers/    # Contains message handlers
├── utils/            # Utility functions and factories
├── proxies.ts        # Generated message proxies
├── signals.ts        # Signal definitions
└── readme.md         # This documentation
```
