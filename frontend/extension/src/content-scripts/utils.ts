// import { BLOCKED_EVENTS, IGNORED_TAGS } from './constants';

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number;

  return function (...args: Parameters<T>) {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  return function (...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};

export const blockEvents = (e: Event) => {
  e.stopImmediatePropagation();
  e.stopPropagation();
  e.preventDefault();
};

// export const shouldIgnore = (el: Element): boolean => {
//   const tag = el.tagName.toLowerCase();
//   return IGNORED_TAGS.has(tag);
// };

// export const blockClickEvents = (el: HTMLElement) => {
//   const handler = (e: Event) => {
//     e.preventDefault();
//     e.stopPropagation();
//     console.log('User clicked on', el);
//   };

//   BLOCKED_EVENTS.forEach(evt => {
//     el.addEventListener(evt, handler, { capture: true, passive: false });
//   });
// };
