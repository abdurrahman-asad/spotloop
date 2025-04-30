import { handlers } from './proxyHandlers';
import { generateMessageProxies } from './utils/proxyFactory';

// Just use the intellisense to export all your proxies,
// hitting CMD+I or OPTION+ESC on vscode will give you the unexported proxies.

// Must use the _px suffix to be clear that this is a proxy. These should only be used in content scripts.
export const {
  mytest: mytest_px,
  test1: test1_px,
  test2: test2_px,
} = generateMessageProxies(handlers);
