import React from "react";

interface ProgressProps {
  value: number; // percentage (0-100)
}

const Progress: React.FC<ProgressProps> = ({ value }) => (
  <div className="w-full bg-gray-200 rounded-full h-4">
    <div
      className="bg-blue-600 h-4 rounded-full transition-all"
      style={{ width: `${value}%` }}
    />
  </div>
);

export default Progress;