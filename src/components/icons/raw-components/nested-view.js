import React from 'react';

function NestedView(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g
        id="nested-view__Icons"
        stroke="none"
        strokeWidth={1}
        fillRule="evenodd"
      >
        <g
          id="nested-view__MC-icon-set"
          transform="translate(-168 -552)"
          fill="#000"
        >
          <g id="nested-view__Views" transform="translate(24 552)">
            <g id="nested-view__Nested-View" transform="translate(144)">
              <path
                d="M16.235 7.176H3.53A.53.53 0 013 6.647V4.53A.53.53 0 013.53 4h12.705a.53.53 0 01.53.53v2.117a.53.53 0 01-.53.53zM20.538 14H9.462C9.207 14 9 13.776 9 13.5v-2c0-.276.207-.5.462-.5h11.076c.255 0 .462.224.462.5v2c0 .276-.207.5-.462.5zm0 6H9.462C9.207 20 9 19.776 9 19.5v-2c0-.276.207-.5.462-.5h11.076c.255 0 .462.224.462.5v2c0 .276-.207.5-.462.5zM7.01 19c.317 0 .573.224.573.5s-.256.5-.573.5H3.573C3.257 20 3 19.776 3 19.5v-10c0-.276.257-.5.573-.5.316 0 .573.224.573.5V13H7.01c.317 0 .573.224.573.5s-.256.5-.573.5H4.146v5H7.01z"
                id="nested-view__shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default NestedView;
