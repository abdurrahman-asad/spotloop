export const getCurrentTab = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
};

export const injectScriptInCurrentTab = (script: string, callback?: () => void) => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const tab = tabs[0];
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id!, allFrames: true },
        files: [script],
      },
      () => {
        callback?.();
      },
    );
  });
};
