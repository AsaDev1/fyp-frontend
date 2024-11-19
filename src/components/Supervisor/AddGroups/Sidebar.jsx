import React from "react";
import Profile from "./Profile";
import Navigation from "./Navigation";

const Sidebar = () => {
  return (
    <div className="bg-[#3096FF] text-white w-[295px] h-screen flex flex-col max-lg:w-[225px]">
      <div className="flex items-center justify-center">
        <img src="/Assets/logo.png" alt="Logo" />
      </div>
      <Profile />
      <Navigation />
      <div className="mt-auto bg-[#001F3F] text-xs flex justify-between px-6 py-2 text-white/70">
        <p>
          Developed by <a href="#">Titans</a> © FA21
        </p>
        <p>v 1</p>
      </div>
    </div>
  );
};

export default Sidebar;
