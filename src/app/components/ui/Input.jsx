import React from "react";

const Input = ({
	placeholder = "Enter text...",
	value = "",
	onChange,
	className = "",
}) => {
	return (
		<input
			type='text'
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			className={`px-4 py-2 w-full border-2 border-black shadow-md transition focus:outline-none focus:shadow-xs ${className}`}
		/>
	);
};

export default Input;
