import * as React from 'react';

function BinLinear(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        id="bin-linear__Icons"
        stroke="none"
        strokeWidth={1}
        fillRule="evenodd"
      >
        <g
          id="bin-linear__MC-icon-set"
          transform="translate(-96 -120)"
          fill="#000"
        >
          <g id="bin-linear__CRUD" transform="translate(24 120)">
            <g id="bin-linear__Delete" transform="translate(72)">
              <path
                d="M20.2 6.919V7.5H4V4.8h4.5V3h7.2v1.8h4.5v2.119zm-.9-.319v-.9H4.9v.9h14.4zM9.4 4.8h5.4v-.9H9.4v.9zm8.1 2.7h.9l-.788 11.82A1.797 1.797 0 0115.818 21H8.382a1.8 1.8 0 01-1.794-1.68L5.8 7.5h.9l.81 11.346A1.35 1.35 0 008.857 20.1h6.486a1.35 1.35 0 001.347-1.254L17.5 7.5zm-4.95 9h-.9V9.3h.9v7.2zm-2.25 0h-.9V9.3h.9v7.2zm4.5 0h-.9V9.3h.9v7.2z"
                id="bin-linear__shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default BinLinear;
