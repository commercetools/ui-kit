import * as React from 'react';

function ArrowDown(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        id="arrow-down__Icons"
        stroke="none"
        strokeWidth={1}
        fillRule="evenodd"
      >
        <g
          id="arrow-down__MC-icon-set"
          transform="translate(-24 -1032)"
          fill="#000"
        >
          <g id="arrow-down__Directions" transform="translate(24 888)">
            <g id="arrow-down__Arrow-Down" transform="translate(0 144)">
              <path
                d="M18.259 14.56H13.555V4.432c0-.79-.66-1.431-1.474-1.431-.813 0-1.473.64-1.473 1.431v10.13H5.784L12.08 21l6.178-6.44z"
                id="arrow-down__shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default ArrowDown;
