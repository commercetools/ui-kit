import * as React from 'react';

function Error(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g id="error__Icons" stroke="none" strokeWidth={1} fillRule="evenodd">
        <g id="error__MC-icon-set" transform="translate(-96 -360)" fill="#000">
          <g id="error__Notices" transform="translate(24 312)">
            <g id="error__Error" transform="translate(72 48)">
              <path
                d="M8.337 17.491a6.6 6.6 0 009.154-9.154l-9.154 9.154zm-1.72-1.673l9.201-9.202a6.6 6.6 0 00-9.202 9.202zM12 21a9 9 0 110-18 9 9 0 010 18z"
                id="error__shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Error;
