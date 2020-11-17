import * as React from 'react';

function Undo(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <defs>
        <path
          d="M12.458 7.41a8.524 8.524 0 00-6.7 3.246L3.796 8.693c-.437-.438-.795-.29-.795.33v7.335c0 .618.024.593.643.593h7.286c.619 0 .767-.358.33-.795l-2.243-2.243a6.283 6.283 0 015.697-3.64 6.283 6.283 0 016.277 6.085 8.542 8.542 0 00-8.531-8.948z"
          id="undo__path-1"
        />
      </defs>
      <g
        id="undo__Component-/-icon-/-24px-/-Richtext-/-Undo"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="undo__Component-/-icon-/-12px-/-undo--"
          transform="matrix(-1 0 0 1 24 0)"
        >
          <mask id="undo__mask-2" fill="#fff">
            <use xlinkHref="#undo__path-1" />
          </mask>
          <use
            id="undo__Shape"
            fill="#1A1A1A"
            transform="matrix(-1 0 0 1 24 0)"
            xlinkHref="#undo__path-1"
          />
        </g>
      </g>
    </svg>
  );
}

export default Undo;
