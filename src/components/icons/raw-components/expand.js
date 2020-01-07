import React from 'react';

function Expand(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g id="expand__Icons" stroke="none" strokeWidth={1} fillRule="evenodd">
        <g
          id="expand__MC-icon-set"
          transform="translate(-168 -696)"
          fill="#000"
        >
          <g id="expand__Actions" transform="translate(24 648)">
            <g id="expand__Expand" transform="translate(144 48)">
              <path
                d="M10.344 12.532l1.094 1.094-4.741 4.74 2.591 2.593H3V14.67l2.602 2.603 4.742-4.741zM20.959 3v6.288l-2.592-2.591-4.741 4.74-1.094-1.093 4.74-4.742L14.67 3h6.289z"
                id="expand__shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Expand;
