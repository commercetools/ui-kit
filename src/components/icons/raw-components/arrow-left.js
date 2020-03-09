import * as React from 'react';

function ArrowLeft(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g
        id="arrow-left__Icons"
        stroke="none"
        strokeWidth={1}
        fillRule="evenodd"
      >
        <g
          id="arrow-left__MC-icon-set"
          transform="translate(-96 -1032)"
          fill="#000"
        >
          <g id="arrow-left__Directions" transform="translate(24 888)">
            <g id="arrow-left__Arrow-Left" transform="translate(72 144)">
              <path
                d="M18.238 14.798h-4.705V4.668c0-.79-.66-1.43-1.473-1.43-.814 0-1.473.64-1.473 1.43v10.13H5.762l6.298 6.44 6.178-6.44z"
                id="arrow-left__shape"
                transform="rotate(90 12 12.238)"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default ArrowLeft;
