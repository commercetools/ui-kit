import * as React from 'react';

function Drag(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g id="drag__Icons" stroke="none" strokeWidth={1} fillRule="evenodd">
        <g id="drag__MC-icon-set" transform="translate(-96 -840)" fill="#000">
          <g id="drag__Actions" transform="translate(24 648)">
            <g id="drag__Drag" transform="translate(72 192)">
              <path
                d="M9 3h2v2H9V3zm4 0h2v2h-2V3zM9 7h2v2H9V7zm4 0h2v2h-2V7zm-4 4h2v2H9v-2zm4 0h2v2h-2v-2zm-4 4h2v2H9v-2zm4 0h2v2h-2v-2zm-4 4h2v2H9v-2zm4 0h2v2h-2v-2z"
                id="drag__shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Drag;
