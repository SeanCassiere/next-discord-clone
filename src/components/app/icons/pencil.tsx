import React from "react";

const PencilIcon: React.FC<{ width?: string; height?: string }> = ({ width = "18", height = "18" }) => {
  return (
    <svg
      aria-label="Edit Profile"
      className="text-white"
      aria-hidden="false"
      role="img"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64678 16.2292 2.64678 14.817 4.05892L14.1699 4.70694L19.2929 9.8299ZM12.8962 5.97688L5.18469 13.6906L10.3085 18.813L18.0201 11.0992L12.8962 5.97688ZM4.11851 20.9704L8.75906 19.8112L4.18692 15.239L3.02678 19.8796C2.95028 20.1856 3.04028 20.5105 3.26349 20.7337C3.48669 20.9569 3.8116 21.046 4.11851 20.9704Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

export default PencilIcon;
