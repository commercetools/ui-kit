import * as React from 'react';

function PlusThin(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="plus-thin__Icons" stroke="none" strokeWidth={1} fillRule="evenodd">
        <g
          id="plus-thin__MC-icon-set"
          transform="translate(-168 -120)"
          fill="#000"
        >
          <g id="plus-thin__CRUD" transform="translate(24 120)">
            <g id="plus-thin__Add" transform="translate(144)">
              <path
                d="M12.5 11.5v-8a.5.5 0 10-1 0v8h-8a.5.5 0 100 1h8v8a.5.5 0 101 0v-8h8a.5.5 0 100-1h-8z"
                id="plus-thin__shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default PlusThin;
