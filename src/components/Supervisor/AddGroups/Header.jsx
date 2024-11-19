import React from "react";

const Header = () => {
  return (
    <div className="text-right">
      <div className="flex items-center justify-end gap-2">
        <p className="h-4 w-4 bg-[#FED600] rounded-full"></p>
        <p>Good Morning</p>
      </div>
      <p className="text-sm">14 January 2024 · 22:45:04</p>
    </div>
  );
};

export default Header;
