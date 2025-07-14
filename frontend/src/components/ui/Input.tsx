import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ className = "", ...props }) => (
  <input
    className={`border border-gray-300 rounded-md p-2 w-full focus:ring focus:ring-blue-500 ${className}`}
    {...props}
  />
);

export default Input;