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

// chrome.scripting.executeScript({
//   target: { tabId: currentTab.id!, allFrames: true },
//   func: () => {
//     // const input = document.querySelector('.icon-search-input');
//     const input = document.querySelector('#twotabsearchtextbox') as HTMLInputElement;
//     // const input = document.elementFromPoint(275, 70) as HTMLInputElement;
//     // const clickEvent = new MouseEvent('click', {
//     //   view: window,
//     //   bubbles: true,
//     //   cancelable: true,
//     //   composed: true,
//     //   clientX: 100,
//     //   clientY: 335,
//     // });
//     // document.dispatchEvent(clickEvent);

//     console.log(input);

//     // ['mousedown', 'mouseup', 'click'].forEach(type => {
//     //   const event = new Event(type, { bubbles: true, cancelable: true });
//     //   input.dispatchEvent(event);
//     // });

//     input.value = 'Hello';
//     input.focus();
//     input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
//     input.dispatchEvent(new Event('change', { bubbles: true }));

//     const press = new KeyboardEvent('keypress', {
//       key: 'Enter',
//       code: 'Enter',
//       keyCode: 13,
//       which: 13,
//       bubbles: true,
//       cancelable: true,
//       composed: true,
//     });

//     const down = new KeyboardEvent('keydown', {
//       key: 'Enter',
//       code: 'Enter',
//       keyCode: 13,
//       which: 13,
//       bubbles: true,
//       cancelable: true,
//       composed: true,
//     });

//     const up = new KeyboardEvent('keyup', {
//       key: 'Enter',
//       code: 'Enter',
//       keyCode: 13,
//       which: 13,
//       bubbles: true,
//       cancelable: true,
//       composed: true,
//     });

//     setTimeout(() => {
//       console.log('dispatching');
//       input.dispatchEvent(down);
//       input.dispatchEvent(up);
//       input.dispatchEvent(press);
//       input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
//       input.dispatchEvent(new Event('change', { bubbles: true }));
//     }, 2000);
//   },
// });

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
