import { ThemeToggle } from '../components/ThemeToggle';

export const Settings = () => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl self-center">Settings</h2>

      <div className="*:flex *:justify-between *:items-center mt-8">
        <div>
          <div>Toggle theme</div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};
