export const writeToConsole = (x: string) => {
  console.log('x : ', x);
};

export const envVar = () => {
  return import.meta.env.VITE_EXAMPLE;
};
