import * as React from 'react';

function Indeterminate(props) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" {...props}>
      <g
        id="indeterminate__ATOM---Checkboxes---Radio-buttons"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="indeterminate__Checkboxes-Radio-Buttons"
          transform="translate(-177 -909)"
        >
          <g
            id="indeterminate__checkbox-indeterminate-default"
            transform="translate(177 908)"
          >
            <rect
              id="indeterminate__background"
              fill="#FFF"
              x={0}
              y={1}
              width={16}
              height={16}
              rx={4}
            />
            <g id="indeterminate__borderAndContent" transform="translate(0 .5)">
              <rect
                id="indeterminate__border"
                stroke="#AFAFAF"
                x={0.5}
                y={1}
                width={15}
                height={15}
                rx={4}
              />
              <path
                id="indeterminate__content"
                fill="#00B6A1"
                d="M3 7.5h10v2H3z"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Indeterminate;
