import { MemoryRouter, Route, Routes } from 'react-router';
import { Layout } from './pages/Layout';
import { Login } from './pages/Login';
import { Settings } from './pages/Settings';
import { ThemeProvider } from 'ui';
import { Home } from './pages/Home';
import { Unavailable } from './pages/Unavailable';
import { useIsPageUnsupported } from './utils/hooks';

function App() {
  const { isPageUnsupported, loading } = useIsPageUnsupported();

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
            </Route>
            <Route path="login" element={<Login />} />
          </Routes>
        )}
      </MemoryRouter>
    </ThemeProvider>
  );
}

export default App;
