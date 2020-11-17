import * as React from 'react';

function Cube(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="cube__Icons" stroke="none" strokeWidth={1} fillRule="evenodd">
        <g id="cube__MC-icon-set" transform="translate(-24 -72)" fill="#000">
          <g id="cube__Application" transform="translate(24 24)">
            <g id="cube__Cube" transform="translate(0 48)">
              <path
                d="M8.174 9.646l-.026.016-3.445-2.127L11.998 3l2.937 1.825.031-.02 4.327 2.73-7.295 4.535-3.824-2.424zm3.599 2.845v8.369L4.5 16.325v-8.37l3.513 2.198 3.76 2.338zm.45 0l7.273-4.535v8.369l-7.273 4.535v-8.37z"
                id="cube__shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Cube;
