import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  username: string;
}

export default function UserDropdown({username}:Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="bg-red-500 text-white rounded px-4 py-2 mr-2 hover:bg-orange-600 transition duration-200"
      >
        {username}
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">

            <Link
              to="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100"
              role="menuitem"
            >
              Profile
            </Link>
            <Link
              to="/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:hover:bg-orange-100"
              role="menuitem"
            >
              Settings
            </Link>
            <Link
              to="/logout"
              className="block px-4 py-2 text-sm text-gray-700 hover:hover:bg-orange-100"
              role="menuitem"
            >
              Logout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
