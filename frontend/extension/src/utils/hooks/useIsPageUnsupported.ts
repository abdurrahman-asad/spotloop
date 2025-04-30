import { useEffect, useState } from 'react';
import { getCurrentTab } from '../general';

export const useIsPageUnsupported = () => {
  const [isPageUnsupported, setIsPageUnsupported] = useState<boolean>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isUnsupportedPage = async () => {
      const tab = await getCurrentTab();

      if (!tab || !tab.url) return;

      setIsPageUnsupported(
        tab.url.startsWith('chrome://') || tab.url.startsWith(`chrome-extension://`),
      );
      if (loading) setLoading(false);
    };

    isUnsupportedPage();
    chrome.tabs.onActivated.addListener(isUnsupportedPage);
    chrome.tabs.onUpdated.addListener((_, changeInfo, tab) => {
      if (changeInfo.status === 'complete' && tab.active) {
        isUnsupportedPage();
      }
    });
    chrome.tabs.onAttached.addListener(isUnsupportedPage);
    chrome.tabs.onCreated.addListener(isUnsupportedPage);

    return () => {
      chrome.tabs.onActivated.removeListener(isUnsupportedPage);
      chrome.tabs.onUpdated.removeListener(isUnsupportedPage);
      chrome.tabs.onAttached.removeListener(isUnsupportedPage);
      chrome.tabs.onCreated.removeListener(isUnsupportedPage);
    };
  }, []);

  return {
    isPageUnsupported,
    loading,
  };
};
