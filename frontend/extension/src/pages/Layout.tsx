import { Outlet } from 'react-router';
import { NavBar } from '../components/NavBar';

export const Layout = () => {
  return (
    <div className="flex flex-col h-full p-3">
      <NavBar />
      <div className="grow-1">
        <Outlet />
      </div>
    </div>
  );
};
