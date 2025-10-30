import { MemoryRouter, Route, Routes } from 'react-router';
import { ThemeProvider } from 'ui';
import { StoreProvider } from './store';
import { Home, CreateAutomation, Layout, Login, Settings } from './pages';

function App() {
  return (
    <StoreProvider>
      <ThemeProvider>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="settings" element={<Settings />} />
              <Route path="create-automation" element={<CreateAutomation />} />
            </Route>
            <Route path="login" element={<Login />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
