import React from "react";

const ChevronRightIcon: React.FC<{ width?: string; height?: string }> = ({ width = "24", height = "24" }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" className="w-5 -rotate-90">
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.59 8.59004L12 13.17L7.41 8.59004L6 10L12 16L18 10L16.59 8.59004Z"
      ></path>
    </svg>
  );
};

export default ChevronRightIcon;
