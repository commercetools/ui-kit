import * as React from 'react';

function Arrows(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g id="arrows__Icons" stroke="none" strokeWidth={1} fillRule="evenodd">
        <g id="arrows__MC-icon-set" transform="translate(-24 -744)" fill="#000">
          <g id="arrows__Actions" transform="translate(24 648)">
            <path
              d="M21 12l-3.375-3.375v2.25h-4.5v-4.5h2.25L12 3 8.625 6.375h2.25v4.5h-4.5v-2.25L3 12l3.375 3.375v-2.25h4.5v4.5h-2.25L12 21l3.375-3.375h-2.25v-4.5h4.5v2.25"
              transform="translate(0 96)"
              id="arrows__Arrows"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Arrows;
