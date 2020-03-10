import * as React from 'react';

function CaretUp(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g id="caret-up__Icons" stroke="none" strokeWidth={1} fillRule="evenodd">
        <g
          id="caret-up__MC-icon-set"
          transform="translate(-240 -936)"
          fill="#000"
        >
          <g id="caret-up__Directions" transform="translate(24 888)">
            <g id="caret-up__Caret-Up" transform="translate(216 48)">
              <path
                d="M20.666 7.354A1.052 1.052 0 0019.875 7H4.125c-.305 0-.568.118-.791.354A1.18 1.18 0 003 8.192c0 .322.111.601.334.837l7.875 8.34c.223.236.486.354.791.354.305 0 .568-.118.791-.354l7.875-8.34A1.18 1.18 0 0021 8.192c0-.323-.112-.602-.334-.838z"
                id="caret-up__shape"
                transform="rotate(-180 12 12.361)"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default CaretUp;
