export const getCurrentTab = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
};

export const injectScriptInCurrentTab = async (script: string) => {
  const currentTab = await getCurrentTab();
  await chrome.scripting.executeScript<any[], boolean>({
    target: { tabId: currentTab.id!, allFrames: true },
    files: [script],
  });
};
