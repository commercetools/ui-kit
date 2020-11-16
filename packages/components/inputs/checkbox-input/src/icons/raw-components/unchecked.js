import * as React from 'react';

function Unchecked(props) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        id="unchecked__ATOM---Checkboxes---Radio-buttons"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="unchecked__Checkboxes-Radio-Buttons"
          transform="translate(-177 -645)"
        >
          <g
            id="unchecked__checkbox-empty-default"
            transform="translate(177 644)"
          >
            <rect
              id="unchecked__background"
              fill="#FFF"
              x={0}
              y={1}
              width={16}
              height={16}
              rx={4}
            />
            <g
              id="unchecked__borderAndContent"
              transform="translate(0 .5)"
              stroke="#AFAFAF"
            >
              <rect
                id="unchecked__border"
                x={0.5}
                y={1}
                width={15}
                height={15}
                rx={4}
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Unchecked;
