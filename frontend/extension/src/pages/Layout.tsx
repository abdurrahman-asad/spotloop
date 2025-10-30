import { Outlet, useLocation, useNavigate } from 'react-router';
import { NavBar } from '../components/NavBar';
import { TbArrowBackUp } from 'react-icons/tb';
import { Toaster } from 'ui';

export const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    if (location.pathname.includes('create-automation')) {
      navigate('/');
      return;
    }
    navigate(-1);
  };

  return (
    <div className="flex flex-col h-full p-3">
      <NavBar />
      <div className="grow-1 pt-6 relative">
        {location.pathname !== '/' && (
          <div className="absolute pt-1">
            <TbArrowBackUp onClick={goBack} className="!h-5 !w-5 cursor-pointer hover:opacity-80" />
          </div>
        )}
        <Outlet />
        <Toaster />
      </div>
    </div>
  );
};
