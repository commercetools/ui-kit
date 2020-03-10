import * as React from 'react';

function Truck(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g id="truck__Icons" stroke="none" strokeWidth={1} fillRule="evenodd">
        <g id="truck__MC-icon-set" transform="translate(-96 -408)" fill="#000">
          <g id="truck__Switch-states" transform="translate(24 408)">
            <g id="truck__Truck" transform="translate(72)">
              <path
                d="M20.19 14.308a2.9 2.9 0 00-5.535 0h-1.27V7.385l2.43-.012c1.914-.008 3.149 1.082 2.762 2.435l1.59 1.061c.454.304.833 1.008.833 1.565v1.874h-.81zm-9.75 0a2.9 2.9 0 00-5.535 0H3v-4.3A4.01 4.01 0 016.998 6h5.694v8.308h-2.251zm-2.767 3.115a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5zm9.75 0a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5z"
                id="truck__shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Truck;
