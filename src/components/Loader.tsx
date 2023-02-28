import { FC } from "react";

interface LoaderProps {}

const Loader: FC<LoaderProps> = () => {
  return (
    <div className="z-10 flex items-center justify-center bg-transparent h-[100vh] w-[100vw]">
      <div className="flex justify-center border-8 border-gray-400 rounded-full h-28 w-28 animate-spin border-y-gray-700">
        <div className="w-20 h-20 m-auto border-4 rounded-full border-y-gray-400"></div>
      </div>
    </div>
  );
};

export default Loader;
