import React, { useState } from "react";

const Profile = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex items-center px-4 mt-6 relative">
      <div className="flex items-center relative">
        <img
          alt="Profile"
          className="rounded-md w-16 h-16"
          src="/Assets/female- avatar.webp"
        />
        <div className="ml-4">
          <div className="text-white">Miss. Mahwish W.</div>
          <div className="text-blue-600 text-sm bg-[#D9D9D9] w-fit rounded-xl px-2">
            Faculty
          </div>
        </div>
        <div className="h-4 w-4 rounded-full bg-green-600 absolute bottom-[-4px] left-14"></div>
      </div>
      <div className="absolute top-4 right-6">
        <button
          className="text-white focus:outline-none"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <i className="fas fa-ellipsis-v"></i>
        </button>
        {dropdownOpen && (
          <div className="bg-[#001F3F] text-black rounded shadow-lg mt-2 w-36 absolute right-0">
            <a className="text-[#F0483E] block px-4 py-2 hover:bg-gray-200" href="#">
              <i className="fas fa-sign-out-alt"></i> Logout
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
