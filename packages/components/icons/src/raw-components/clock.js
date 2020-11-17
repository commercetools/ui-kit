import * as React from 'react';

function Clock(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M13.732 13A2 2 0 1111 10.268V7a1 1 0 012 0v3.268c.304.175.557.428.732.732H15a1 1 0 010 2h-1.268zM12 21a9 9 0 110-18 9 9 0 010 18zm0-2a7 7 0 100-14 7 7 0 000 14z"
      />
    </svg>
  );
}

export default Clock;
