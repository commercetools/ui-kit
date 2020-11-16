import * as React from 'react';

function ConnectedTriangle(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        id="connected-triangle__Connected-Triangle"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M15.023 18.375H8.977A3 3 0 116.49 15.04l3.511-6.803a3 3 0 114.053-.051l3.74 6.82a3 3 0 11-2.771 3.368zm.195-1.5a3.01 3.01 0 011.133-1.381l-3.612-6.586a3.006 3.006 0 01-1.405.018l-3.47 6.723c.403.32.722.742.918 1.226h6.436z"
          id="connected-triangle__Shape"
          fill="#000"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
}

export default ConnectedTriangle;
