import React from 'react';

function Circle(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g
        id="circle__Symbols"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="circle__Component-/-icon-/-24px-/-circle-Copy"
          fill="#000"
          fillRule="nonzero"
        >
          <path
            d="M12.5 17.5a5 5 0 100-10 5 5 0 000 10zm0 2.5a7.5 7.5 0 110-15 7.5 7.5 0 010 15z"
            id="circle__circle"
          />
        </g>
      </g>
    </svg>
  );
}

export default Circle;
