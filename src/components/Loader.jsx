import React from "react";

const Loader = () => {
	return (
		<div className="flex items-center justify-center absolute top-0">
			<div className="flex flex-col items-center">
				<div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
			</div>
		</div>
	);
};

export default Loader;
