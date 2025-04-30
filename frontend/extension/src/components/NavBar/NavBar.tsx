import {
  Button,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from 'ui';
import { TbArrowBackUp, TbMapPinFilled, TbMenu3 } from 'react-icons/tb';
import { Link, useLocation, useNavigate } from 'react-router';
import { ThemeToggle } from '../ThemeToggle';
import { onCreateSpot } from './menuActions';

function Menu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" aria-label="menu-button">
          <TbMenu3 />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="*:cursor-pointer **:text-[1rem]" align="end">
        <DropdownMenuItem onClick={onCreateSpot}>
          <TbMapPinFilled /> Create spot
        </DropdownMenuItem>
        <DropdownMenuItem>Overview</DropdownMenuItem>
        <Link to="/settings">
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div>
      <div className="flex justify-between">
        <p className="text-2xl">Spotloop</p>
        <div className="flex gap-2">
          <ThemeToggle />
          <Menu />
        </div>
      </div>
      {location.pathname !== '/' && (
        <div className="my-3">
          <TbArrowBackUp className="!h-5 !w-5 cursor-pointer" onClick={() => navigate(-1)} />
        </div>
      )}
    </div>
  );
};
