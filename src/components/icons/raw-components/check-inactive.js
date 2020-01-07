import React from 'react';

function CheckInactive(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g
        id="check-inactive__Icons"
        stroke="none"
        strokeWidth={1}
        fillRule="evenodd"
      >
        <g id="check-inactive__MC-icon-set" transform="translate(-24 -360)">
          <g id="check-inactive__Notices" transform="translate(24 312)">
            <g id="check-inactive__Check-Inactive" transform="translate(0 48)">
              <path
                d="M12 21a9 9 0 110-18 9 9 0 010 18zm-6-9.495v.99c0 .291.224.505.5.505h11c.271 0 .5-.226.5-.505v-.99a.495.495 0 00-.5-.505h-11c-.271 0-.5.226-.5.505z"
                id="check-inactive__shape"
                fill="#000"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default CheckInactive;
