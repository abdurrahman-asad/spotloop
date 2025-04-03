import { MemoryRouter, Route, Routes } from 'react-router';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Settings } from './pages/Settings';
import { ThemeProvider } from 'ui';

function App() {
  return (
    <ThemeProvider>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );
}

export default App;
