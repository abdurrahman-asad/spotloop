import {
  Button,
  useTheme,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from 'ui';
import { TbMenu3, TbMoonFilled, TbSunHigh } from 'react-icons/tb';

export function Menu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" aria-label="menu-button">
          <TbMenu3 />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-10 *:cursor-pointer" align="end">
        <DropdownMenuItem>Walkthrough</DropdownMenuItem>
        <DropdownMenuItem>Overview</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <TbMoonFilled className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <TbSunHigh className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const NavBar = () => {
  return (
    <div className="flex justify-between">
      <p className="text-2xl">Spotloop</p>
      <ModeToggle />
      <Menu />
    </div>
  );
};
