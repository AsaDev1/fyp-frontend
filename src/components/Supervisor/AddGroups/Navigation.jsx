import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faUsers,
  faFileAlt,
  faPen,
  faCog,
  faBell,
  faQuestionCircle,
  faChevronDown,
  faEllipsisV,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';


const Sidebar = () => {
  const [studentsDropdownOpen, setStudentsDropdownOpen] = useState(false);
  const [evalDropdownOpen, setEvalDropdownOpen] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);

  const toggleDropdown = (setter) => () => {
    setter((prev) => !prev);
  };

  return (
    <>
    {/* // <div className="bg-[#3096FF] text-white max-lg:text-sm max-lg:w-[225px] w-[295px] shrink-0 h-screen flex flex-col"> */}

      {/* Navigation */}
      <nav className="mt-8 text-md flex flex-col gap-2">
        <a className="flex items-center py-2 px-8 hover:bg-[#001F3F]" href="index.html">
          <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" />
          <span>Dashboard</span>
        </a>
        <div className="relative">
          <button
            className="flex items-center py-2 px-8 w-full text-left hover:bg-[#001F3F] focus:outline-none"
            onClick={toggleDropdown(setStudentsDropdownOpen)}
          >
            <FontAwesomeIcon icon={faUsers} className="mr-3" />
            <span>Students Registered</span>
            <FontAwesomeIcon icon={faChevronDown} className="ml-auto" />
          </button>
          {studentsDropdownOpen && (
            <div>
              <a className="block pr-8 selected" href="FYP-I.html">
                FYP - I
              </a>
              <a className="block py-2 pr-8 hover:bg-[#001F3F]" href="FYP-II.html">
                FYP - II
              </a>
            </div>
          )}
        </div>
        <a className="flex items-center py-2 px-8 hover:bg-[#001F3F]" href="Proposals.html">
          <FontAwesomeIcon icon={faFileAlt} className="mr-3" />
          <span>Proposals</span>
        </a>
        <div className="relative">
          <button
            className="flex items-center py-2 px-8 w-full text-left hover:bg-[#001F3F] focus:outline-none"
            onClick={toggleDropdown(setEvalDropdownOpen)}
          >
            <FontAwesomeIcon icon={faPen} className="mr-3" />
            <span>Evaluations</span>
            <FontAwesomeIcon icon={faChevronDown} className="ml-auto" />
          </button>
          {evalDropdownOpen && (
            <div>
              <a className="block py-2 pl-16 pr-8 hover:bg-[#001F3F]" href="Evaluation_FYP-I.html">
                FYP - I
              </a>
              <a className="block py-2 pl-16 pr-8 hover:bg-[#001F3F]" href="Evaluation_FYP-II.html">
                FYP - II
              </a>
            </div>
          )}
        </div>
        <a className="flex items-center py-2 px-8 hover:bg-[#001F3F]" href="#">
          <FontAwesomeIcon icon={faCog} className="mr-3" />
          <span>Settings</span>
        </a>
        <a className="flex items-center py-2 px-8 hover:bg-[#001F3F]" href="#">
          <FontAwesomeIcon icon={faBell} className="mr-3" />
          <span>Alerts</span>
          <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">01</span>
        </a>
        <a className="flex items-center py-2 px-8 hover:bg-[#001F3F]" href="#">
          <FontAwesomeIcon icon={faQuestionCircle} className="mr-3" />
          <span>Help</span>
        </a>
      </nav>
    {/* </div> */}
    </>
  );
};

export default Sidebar;
