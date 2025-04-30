import { BLOCKED_EVENTS, PRIMARY_COLOR } from './constants';
import { blockEvents, debounce } from './utils';

let highlight: HTMLDivElement;
let lastElement: HTMLElement | null = null;
const shadowHostsToClear = new Set<HTMLElement>();

const renderHighlight = (rect: DOMRect) => {
  highlight.style.opacity = '1';
  highlight.style.top = `${rect.top + window.scrollY}px`;
  highlight.style.left = `${rect.left + window.scrollX}px`;
  highlight.style.width = `${rect.width}px`;
  highlight.style.height = `${rect.height}px`;
};

const hideHighlight = () => {
  highlight.style.opacity = '0';
};

const injectHighlight = () => {
  const highlight = document.createElement('div');
  highlight.style.position = 'absolute';
  highlight.style.borderRadius = '0.25rem';
  highlight.style.border = `2px solid ${PRIMARY_COLOR}`;
  highlight.style.backgroundColor = `oklch(0.93 0.0173 176.53 / 0.2)`;
  highlight.style.pointerEvents = 'none';
  highlight.style.zIndex = '2147483647';
  highlight.style.transition = 'all 0.2s ease';
  highlight.style.cursor = 'pointer';
  document.body.appendChild(highlight);
  return highlight;
};

const handleHover = (e: Event) => {
  const target = e.target as HTMLElement | null;
  if (!target) return;

  if (target.tagName.toLowerCase() === 'iframe') {
    lastElement = null;
    hideHighlight();
    return;
  }

  const rects = target.getBoundingClientRect();
  if (!(rects.width + rects.height)) return;

  renderHighlight(rects);
  lastElement = target;

  if (lastElement.shadowRoot) {
    shadowHostsToClear.add(lastElement);
    lastElement.shadowRoot.addEventListener('mouseover', handleHover);
    // attach mouse leave to shadow host as it won't work on shadow root
    lastElement.addEventListener('mouseleave', onShadowDomHoverOut);
  }
};

const onHover = debounce((e: Event) => handleHover(e), 40);

const onShadowDomHoverOut = (e: Event) => {
  const target = e.target as HTMLElement | null;
  if (!target) return;

  target.shadowRoot?.removeEventListener('mouseover', handleHover);
  target.removeEventListener('mouseleave', onShadowDomHoverOut);
  shadowHostsToClear.delete(target);
};

const removeAllListeners = () => {
  BLOCKED_EVENTS.forEach(evt => {
    document.removeEventListener(evt, blockEvents, {
      capture: true,
    });
  });

  document.removeEventListener('mouseover', onHover);
  document.removeEventListener('mouseleave', iframeMouseLeave);

  shadowHostsToClear.forEach(host => {
    host.shadowRoot?.removeEventListener('mouseover', handleHover);
    host.removeEventListener('mouseleave', onShadowDomHoverOut);
  });
  shadowHostsToClear.clear();
};

const onClick = (e: Event) => {
  blockEvents(e);
  removeAllListeners();
};

const iframeMouseLeave = debounce(hideHighlight, 40);

// entery point for the script
function startDOMCapture() {
  highlight = injectHighlight();

  BLOCKED_EVENTS.forEach(evt => {
    document.addEventListener(evt, blockEvents, {
      capture: true,
      passive: false,
    });
  });

  document.addEventListener('click', onClick, {
    capture: true,
    passive: false,
    once: true,
  });
  document.addEventListener('mouseover', onHover);

  if (window !== window.parent) {
    document.addEventListener('mouseleave', iframeMouseLeave);
  }
}

startDOMCapture();
