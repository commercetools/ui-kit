import * as React from 'react';

function Edit(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="edit__Icons" stroke="none" strokeWidth={1} fillRule="evenodd">
        <g id="edit__MC-icon-set" transform="translate(-24 -120)" fill="#000">
          <g id="edit__CRUD" transform="translate(24 120)">
            <g id="edit__Edit">
              <path
                d="M16.883 10.854l-8.029 8.029L6 16.028 14.028 8l2.855 2.854zM5 19.854V17l2.855 2.855H5zM18.962 6.358a1.335 1.335 0 010 1.888l-1.108 1.108L15 6.5l1.108-1.108a1.335 1.335 0 011.888 0l.966.966z"
                id="edit__shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Edit;
