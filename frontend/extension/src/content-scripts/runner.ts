import { STORAGE_KEYS } from '../utils';
import { injectHighlight } from './utils';

let highlight: HTMLDivElement;

const hideHighlight = () => {
  highlight.style.opacity = '0';
};

const renderHighlight = (rect: DOMRect) => {
  highlight.style.opacity = '1';
  highlight.style.top = `${rect.top + window.scrollY}px`;
  highlight.style.left = `${rect.left + window.scrollX}px`;
  highlight.style.width = `${rect.width}px`;
  highlight.style.height = `${rect.height}px`;
};

function findElementByXPath(xpath: string): Element | null {
  const result = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null,
  );
  return result.singleNodeValue as Element | null;
}

const getAutomationData = async () => {
  const result = await chrome.storage.local.get(STORAGE_KEYS.currentAutomation);
  return result[STORAGE_KEYS.currentAutomation];
};

const startRunner = async () => {
  highlight = injectHighlight();

  const automationData = await getAutomationData();

  console.log(automationData);
};

startRunner();
