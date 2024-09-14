import React from "react";

const Button = ({ label, onClick, className = "", title = "" }) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`font-head px-8 py-3 bg-primary-400 border-2 border-black shadow-md hover:shadow-xs transition-all ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
