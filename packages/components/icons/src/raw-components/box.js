import * as React from 'react';

function Box(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g id="box__Icons" stroke="none" strokeWidth={1} fillRule="evenodd">
        <g id="box__MC-icon-set" transform="translate(-96 -168)" fill="#000">
          <g id="box__Menu" transform="translate(24 168)">
            <g id="box__Box" transform="translate(72)">
              <path
                d="M20.06 16.601L12.27 21v-8.797l.867-.49 6.924-3.909v8.797zM12.03 3l3.13 1.767-7.79 4.399-3.13-1.768L12.03 3zm4.29 2.422l3.501 1.976-4.892 2.763-2.899 1.636-2.914-1.645-.588-.332 7.792-4.398zM8.28 12.57v-2.35l3.51 1.983V21L4 16.601V7.804l3.148 1.777v2.416l1.132.573z"
                id="box__shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Box;
