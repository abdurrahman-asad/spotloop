import { Input } from 'ui';

export const Home = () => {
  return (
    <div className="flex flex-col items-center h-full mt-12">
      {/* <p className="font-light">Where should I loop you in?</p> */}
      <Input className="mt-4" placeholder="Where should I loop you in?" />
    </div>
  );

  /* <Link to="/login">Login</Link> */
};
