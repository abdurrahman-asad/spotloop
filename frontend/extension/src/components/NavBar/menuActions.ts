import { injectScriptInCurrentTab } from '../../utils';
import createSpotScriptPath from '../../content-scripts/createSpot?script';

/**
 * Injects the createSpot script into the current tab.
 * If the script is alredy injected, ignore the injection and send an event to the already present script.
 */
export const onCreateSpot = async () => {
  // const currentTab = await getCurrentTab();
  // testingSignal.emit({ payload: 'test', tabId: currentTab.id });
  injectScriptInCurrentTab(createSpotScriptPath);
};
