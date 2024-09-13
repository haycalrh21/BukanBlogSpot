import React from "react";
import CopyButton from "./CopyButton";

const CodeBlock = ({ code }) => {
	return (
		<div className='relative bg-gray-800 text-white p-4 rounded'>
			<CopyButton text={code} />
			<pre className='whitespace-pre-wrap'>{code}</pre>
		</div>
	);
};

export default CodeBlock;
