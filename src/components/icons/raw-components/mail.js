import * as React from 'react';

function Mail(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g
        id="mail__Icons"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="mail__MC-icon-set"
          transform="translate(-96 -232)"
          fill="#000"
          fillRule="nonzero"
        >
          <g id="mail__CRUD" transform="translate(24 152)">
            <path
              d="M12 13.312L3 6h18l-9 7.312zm-2.244-1.046L3 6.926V17.41l6.756-5.144zm2.398 1.752c-.112.092-.194.093-.308 0l-1.599-1.335-7.221 5.653h17.948l-7.221-5.653-1.599 1.335zm2.112-1.73l6.757-5.34v10.485l-6.757-5.145z"
              transform="translate(72 80)"
              id="mail__Mail"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Mail;
