"use client";
import { AuthContext } from '@/context/AuthContext';
import Image from 'next/image';
import React, { useContext, useState, useEffect } from 'react';

function Header() {
  const { user } = useContext(AuthContext);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      } else {
        setIsDarkMode(prefersDark);
        document.documentElement.classList.toggle('dark', prefersDark);
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', newTheme);
    }
  };

  return (
    <div className='p-3 shadow-sm flex justify-between items-center bg-white dark:bg-gray-900 px-14 transition-colors duration-300'>
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src='/logo1.svg'
          alt='logo'
          width={40}
          height={40}
          className="transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Center - Theme Toggle */}
      <div className="flex items-center space-x-6">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="relative inline-flex items-center justify-center w-14 h-8 bg-gray-200 dark:bg-gray-700 rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 group"
          aria-label="Toggle theme"
        >
          {/* Toggle Track */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          
          {/* Toggle Slider */}
          <div
            className={`absolute w-6 h-6 bg-white dark:bg-gray-200 rounded-full shadow-lg transform transition-all duration-300 flex items-center justify-center ${
              isDarkMode ? 'translate-x-3' : '-translate-x-3'
            }`}
          >
            {/* Sun Icon */}
            <svg
              className={`w-3 h-3 text-yellow-500 transition-all duration-300 ${
                isDarkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
            
            {/* Moon Icon */}
            <svg
              className={`absolute w-3 h-3 text-purple-600 transition-all duration-300 ${
                isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </div>
        </button>

        {/* Theme Label */}
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
          {isDarkMode ? 'Dark' : 'Light'}
        </span>
      </div>

      {/* User Profile */}
      <div className="flex items-center">
        {user?.picture && (
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
            <Image
              src={user.picture}
              alt='user profile'
              width={40}
              height={40}
              className="relative rounded-full ring-2 ring-white dark:ring-gray-700 transition-all duration-300 hover:scale-110 hover:ring-blue-400 dark:hover:ring-purple-400"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;