import React from 'react';

function ErrorComponent({ message }) {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-lg flex items-center space-x-4 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6 text-red-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
      <span className="font-semibold text-lg">{message}</span>
    </div>
  );
}

export default ErrorComponent;
