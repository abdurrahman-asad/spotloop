import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { sum, subtract, Demo, Button } from 'ui';
// import { envVar } from 'shared';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-background-100 p-4 min-w-[350px] h-screen text-white flex flex-col items-center justify-center">
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{<Demo />}</h1>
      <Button variant="destructive"> Test Shadcn </Button>
      <div className="card">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setCount(count => count + 1);
          }}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR {subtract(sum(1, 2), 2)}
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to test learn more</p>
    </div>
  );
}

export default App;
