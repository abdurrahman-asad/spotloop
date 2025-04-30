type Fn = (...args: any[]) => Promise<any> | any;

type Promisify<T> = T extends Promise<any> ? T : Promise<T>;

type Proxies<T extends Record<string, Fn>> = {
  [K in keyof T]: (...args: Parameters<T[K]>) => Promisify<ReturnType<T[K]>>;
};

/**
 * Build message proxies for handlers registered in the service worker.
 *
 * @param module An object of all the modules expanded in it.
 * @returns Flat object like { pingMe: fn, getProfile: fn }, combining all the modules.
 */
export const generateMessageProxies = <T extends Record<string, Fn>>(module: T): Proxies<T> => {
  return Object.keys(module).reduce(
    (proxies, fnName) => {
      proxies[fnName] = (...args: any[]) =>
        chrome.runtime.sendMessage({ __name: fnName, params: args });
      return proxies;
    },
    {} as Record<string, (...args: any[]) => Promise<any>>,
  ) as Proxies<T>;
};
