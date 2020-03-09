import * as React from 'react';

function Minimize(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g id="minimize__Icons" stroke="none" strokeWidth={1} fillRule="evenodd">
        <g
          id="minimize__MC-icon-set"
          transform="translate(-24 -648)"
          fill="#000"
        >
          <g id="minimize__Actions" transform="translate(24 648)">
            <g id="minimize__Minimize">
              <path id="minimize__shape" d="M6 11h12v2H6z" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Minimize;
