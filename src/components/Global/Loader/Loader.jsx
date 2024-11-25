import React from "react";
import "./Loader.css";
import cui_logo from './CUI.png';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-2/3 z-20 absolute right-[40%] top-[10%]">
      <img
        src={cui_logo}
        alt="Loading"
        className="loader w-1/2 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
      />
    </div>
  );
};

export default Loader;
