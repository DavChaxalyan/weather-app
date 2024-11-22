import React from "react";

function WeatherError({ message }) {
	return (
		<div className="bg-gradient-to-r from-blue-50 via-red-100 to-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md flex items-center space-x-4 transition-transform duration-300 hover:scale-105">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				className="w-8 h-8 text-red-500 animate-pulse"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
				/>
			</svg>

			<div>
				<h3 className="font-bold text-xl text-red-700">
					Oops! Something went wrong.
				</h3>
				<p className="text-red-600">{message}</p>
			</div>
		</div>
	);
}

export default WeatherError;
