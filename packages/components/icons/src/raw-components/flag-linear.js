import * as React from 'react';

function FlagLinear(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g
        id="flag-linear__Icons"
        stroke="none"
        strokeWidth={1}
        fillRule="evenodd"
      >
        <g
          id="flag-linear__MC-icon-set"
          transform="translate(-240 -408)"
          fill="#000"
        >
          <g id="flag-linear__Switch-states" transform="translate(24 408)">
            <g id="flag-linear__Flag" transform="translate(216)">
              <path
                d="M4.167 3.25v17.417h1.79v-8.178H19.75l-4.408-4.195L19.75 4.1H5.957v-.85h-1.79zm1.79 2.549h9.479l-2.623 2.495 2.623 2.496h-9.48V5.8z"
                id="flag-linear__shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default FlagLinear;
