import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Card: React.FC<CardProps> = ({ children, className = "", onClick }) => (
  <div
    className={`bg-white rounded-xl shadow-md p-4 ${className}`}
    onClick={onClick}
    style={onClick ? { cursor: "pointer" } : undefined}
  >
    {children}
  </div>
);

export default Card;