import { Outlet } from 'react-router';
import { NavBar } from '../components/NavBar';
// import { Input } from 'ui';

export const Home = () => {
  return (
    <div className="flex flex-col h-full">
      <NavBar />
      <div className="grow-1">
        <Outlet />
      </div>
      {/* <div className="flex flex-col items-center justify-center grow-1">
        <h1 className="text-2xl">Welcome to Steerbit</h1>
        <p className="font-light">What should I steer you through?</p>
        <Input className="mt-4 rounded-2xl" />
      </div> */}
      {/* <Link to="/login">Login</Link> */}
    </div>
  );
};
