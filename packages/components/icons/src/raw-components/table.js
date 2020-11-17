import * as React from 'react';

function Table(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="table__Icons" stroke="none" strokeWidth={1} fillRule="evenodd">
        <g id="table__MC-icon-set" transform="translate(-240 -600)" fill="#000">
          <g id="table__Grid-display" transform="translate(24 600)">
            <g id="table__Table" transform="translate(216)">
              <path
                d="M20.458 4.51a1.676 1.676 0 00-1.22-.5H4.728c-.476 0-.882.167-1.22.5A1.628 1.628 0 003 5.713v12.94c0 .47.17.87.507 1.203.339.334.745.5 1.22.5h14.51c.476 0 .883-.166 1.221-.5.338-.333.507-.734.507-1.202V5.713c0-.468-.169-.87-.507-1.203zm-9.166 14.484H4.727a.335.335 0 01-.242-.1.325.325 0 01-.103-.24V6.734h6.91v12.26zm8.291-.34a.325.325 0 01-.102.24.335.335 0 01-.243.1h-6.564V6.734h6.91v11.92z"
                id="table__shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Table;
