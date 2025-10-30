export const getCurrentTab = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
};

export const injectScriptInCurrentTab = async (script: string) => {
  const currentTab = await getCurrentTab();
  return chrome.scripting.executeScript<any[], boolean>({
    target: { tabId: currentTab.id!, allFrames: true },
    files: [script],
  });
};

export const injectScriptInTab = async (script: string, tabID: number) => {
  return chrome.scripting.executeScript<any[], boolean>({
    target: { tabId: tabID, allFrames: true },
    files: [script],
  });
};

export const isPageUnsupported = async () => {
  const tab = await getCurrentTab();

  if (!tab || !tab.url) return true;

  return tab.url.startsWith('chrome://') || tab.url.startsWith(`chrome-extension://`);
};
