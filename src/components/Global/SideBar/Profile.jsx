import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const facultyName = localStorage.getItem('faculty_name');

  const handleLogout = () => {
    localStorage.removeItem('faculty_id');
    localStorage.removeItem('faculty_name');
    window.location.href = "/";
  }

  return (
    <div className="flex items-center px-4 mt-6 relative">
      <div className="flex items-center relative">
        <img
          alt="Profile"
          className="rounded-md w-16 h-16"
          src="/Assets/female- avatar.webp"
        />
        <div className="ml-4">
          <div className="text-white">{facultyName}</div>
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
          <FontAwesomeIcon icon={faEllipsisV} className="" />
        </button>
        {dropdownOpen && (
          <div className="bg-[#001F3F] text-black rounded shadow-lg mt-2 w-32 absolute right-0">
            <button 
              className="text-[#F0483E] w-full py-2 hover:bg-gray-200 rounded"
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
