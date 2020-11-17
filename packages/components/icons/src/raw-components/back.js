import * as React from 'react';

function Back(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="back__Icons" stroke="none" strokeWidth={1} fillRule="evenodd">
        <g id="back__MC-icon-set" transform="translate(-24 -984)" fill="#000">
          <g id="back__Directions" transform="translate(24 888)">
            <path
              d="M19.862 10.922H7.25l5.82-5.906-1.478-1.454-8.269 8.392 8.27 8.437 1.478-1.5-5.821-5.86h12.612"
              transform="translate(0 96)"
              id="back__Back"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Back;
