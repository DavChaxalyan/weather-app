import React from 'react';
import { BsSun, BsMoon } from 'react-icons/bs';

function ThemeSwitcher({ theme, setTheme }) {
  return (
    <div className="flex justify-end mb-6">
      <button
        className="p-2 rounded-full bg-gray-300 shadow-lg"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? <BsSun className="text-yellow-500" /> : <BsMoon />}
      </button>
    </div>
  );
}

export default ThemeSwitcher;
