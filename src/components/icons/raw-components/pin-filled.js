import * as React from 'react';

function PinFilled(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g
        id="pin-filled__Icons"
        stroke="none"
        strokeWidth={1}
        fillRule="evenodd"
      >
        <g
          id="pin-filled__MC-icon-set"
          transform="translate(-168 -744)"
          fill="#000"
        >
          <g id="pin-filled__Actions" transform="translate(24 648)">
            <g id="pin-filled__Pin" transform="translate(144 96)">
              <path
                d="M16.425 15.121c0-.928-.746-1.681-1.666-1.681h-.832V6.502a1.673 1.673 0 001.63-1.68H5.601c0 .93.745 1.682 1.665 1.682v6.936h-.833c-.92 0-1.665.753-1.665 1.681h4.996v6.516h1.665V15.12h4.996z"
                id="pin-filled__shape"
                transform="rotate(35 10.596 13.23)"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default PinFilled;
