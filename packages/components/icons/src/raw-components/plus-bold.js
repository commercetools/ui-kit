import * as React from 'react';

function PlusBold(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="plus-bold__Icons" stroke="none" strokeWidth={1} fillRule="evenodd">
        <g
          id="plus-bold__MC-icon-set"
          transform="translate(-240 -120)"
          fillRule="nonzero"
          fill="#000"
        >
          <g id="plus-bold__CRUD" transform="translate(24 120)">
            <g id="plus-bold__Add-Bold" transform="translate(216)">
              <path
                d="M13.844 10.334v-3.51c0-.97-.784-1.755-1.75-1.755-.967 0-1.75.785-1.75 1.755v3.51h-3.5c-.967 0-1.75.785-1.75 1.754 0 .97.783 1.755 1.75 1.755h3.5v3.51c0 .97.783 1.755 1.75 1.755.966 0 1.75-.786 1.75-1.755v-3.51h3.5c.966 0 1.75-.785 1.75-1.755 0-.969-.784-1.754-1.75-1.754h-3.5z"
                id="plus-bold__shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default PlusBold;
