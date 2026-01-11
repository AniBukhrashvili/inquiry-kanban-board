"use client";

import HotelIcon from "@/assets/svgs/HotelIcon";
import SettingsIcon from "@/assets/svgs/SettingsIcon";
import ProfileIcon from "@/assets/svgs/ProfileIcon";

export default function Header() {
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 cursor-pointer group"
            aria-label="Refresh page"
          >
            <HotelIcon className="w-8 h-8 text-gray-600 group-hover:text-blue-500 transition-colors duration-200" />
            <h1 className="text-xl font-semibold text-gray-800 group-hover:text-blue-500 transition-colors duration-200">
              Inquiry Kanban Board
            </h1>
          </button>

          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Settings"
            >
              <SettingsIcon className="w-6 h-6 text-gray-600" />
            </button>
            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Profile"
            >
              <ProfileIcon className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
