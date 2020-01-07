import React from 'react';

function PinLinear(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g
        id="pin-linear__Icons"
        stroke="none"
        strokeWidth={1}
        fillRule="evenodd"
      >
        <g
          id="pin-linear__MC-icon-set"
          transform="translate(-240 -744)"
          fill="#000"
        >
          <g id="pin-linear__Actions" transform="translate(24 648)">
            <g id="pin-linear__Pin-active" transform="translate(216 96)">
              <path
                d="M8.833 13.351h3.435V6.41H8.833v6.942zm7.728 1.683c0-.93-.769-1.683-1.717-1.683h-.859V6.407c.932-.019 1.682-.764 1.682-1.681H5.398c0 .93.77 1.683 1.718 1.683v6.942h-.859c-.949 0-1.717.754-1.717 1.683h5.152v6.522h1.717v-6.522h5.152z"
                id="pin-linear__shape"
                transform="rotate(35 10.55 13.14)"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default PinLinear;
