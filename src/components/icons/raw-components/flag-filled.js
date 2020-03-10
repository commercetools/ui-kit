import * as React from 'react';

function FlagFilled(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g
        id="flag-filled__Icons"
        stroke="none"
        strokeWidth={1}
        fillRule="evenodd"
      >
        <g
          id="flag-filled__MC-icon-set"
          transform="translate(-168 -408)"
          fill="#000"
        >
          <g id="flag-filled__Switch-states" transform="translate(24 408)">
            <path
              d="M4 3v18h1.838v-8.451H20l-4.526-4.336L20 3.878H5.838V3"
              transform="translate(144)"
              id="flag-filled__Flag-Fulflilled"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

export default FlagFilled;
