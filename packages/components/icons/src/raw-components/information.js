import * as React from 'react';

function Information(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g
        id="information__Icons"
        stroke="none"
        strokeWidth={1}
        fillRule="evenodd"
      >
        <g
          id="information__MC-icon-set"
          transform="translate(-168 -360)"
          fill="#000"
        >
          <g id="information__Notices" transform="translate(24 312)">
            <g id="information__Information" transform="translate(144 48)">
              <path
                d="M11.856 4.773a1.932 1.932 0 110 3.863 1.932 1.932 0 010-3.863zm3.112 14.81H9.173a.966.966 0 110-1.932h.966v-5.795h-.966a.966.966 0 110-1.932h3.864c.533 0 .966.433.966.966v6.761h.965a.966.966 0 010 1.932z"
                id="information__shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Information;
