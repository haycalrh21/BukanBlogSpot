"use client";

import React from "react";

const CopyButton = ({ text }) => {
	const handleCopy = () => {
		navigator.clipboard.writeText(text).then(
			() => alert("Code copied to clipboard!"),
			(err) => console.error("Failed to copy code:", err)
		);
	};

	return (
		<button
			onClick={handleCopy}
			className='bg-gray-800 text-white px-2 py-1 rounded ml-2 text-xs'
		>
			Copy
		</button>
	);
};

export default CopyButton;
