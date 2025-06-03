import {
  Button,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from 'ui';
import { TbMenu3, TbRoute } from 'react-icons/tb';
import { Link } from 'react-router';
import { ThemeToggle } from '../ThemeToggle';
// import { onCreateSpot } from './menuActions';

function Menu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" aria-label="menu-button">
          <TbMenu3 />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="*:cursor-pointer **:text-[1rem]" align="end">
        <Link to="/create-automation">
          <DropdownMenuItem className="cursor-pointer">
            <TbRoute className="text-foreground" /> Create automation
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem>Overview</DropdownMenuItem>
        <Link to="/settings">
          <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const NavBar = () => {
  return (
    <div>
      <div className="flex justify-between">
        {/* TODO: Add logo here */}
        <p className="text-2xl"></p>
        <div className="flex gap-2">
          <ThemeToggle />
          <Menu />
        </div>
      </div>
    </div>
  );
};
