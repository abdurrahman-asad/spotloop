import { useEffect } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { ThemeProvider } from 'ui';
import { useIsPageUnsupported } from './utils/hooks';
import { Home, CreateAutomation, Layout, Login, Settings, Unavailable } from './pages';

function App() {
  const { isPageUnsupported, loading } = useIsPageUnsupported();

  useEffect(() => {
    chrome.runtime.connect({ name: 'sidepanel-close-trigger-offloadit' });
  }, []);

  if (loading) return;

  return (
    <ThemeProvider>
      <MemoryRouter>
        {isPageUnsupported ? (
          <Unavailable />
        ) : (
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="settings" element={<Settings />} />
              <Route path="create-automation" element={<CreateAutomation />} />
            </Route>
            <Route path="login" element={<Login />} />
          </Routes>
        )}
      </MemoryRouter>
    </ThemeProvider>
  );
}

export default App;
