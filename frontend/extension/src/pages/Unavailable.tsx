import { ThemeToggle } from '../components/ThemeToggle';

export const Unavailable = () => {
  return (
    <div className="flex flex-col h-full p-3 justify-center items-center">
      <div className="absolute top-3 right-3">
        <ThemeToggle />
      </div>
      <h2 className="text-lg mb-4 -mt-20">It’s Not You, It’s Chrome 💔</h2>
      <p className="text-center">
        Try us on a real website — we promise
        <br /> we’re cool there.
      </p>
    </div>
  );
};
