import { handlers } from './proxyHandlers';
import { generateMessageProxies } from './utils/proxyFactory';

// Just use the intellisense to export all your proxies,
// hitting CMD+I or OPTION+ESC on vscode will give you the unexported proxies.

// Must use the _px suffix to be clear that this is a proxy. These should only be used in content scripts.

export const { emitStopDOMCapture: emitStopDOMCapture_px } = generateMessageProxies(handlers);
