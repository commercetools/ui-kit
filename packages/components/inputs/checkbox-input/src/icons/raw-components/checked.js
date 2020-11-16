import * as React from 'react';

function Checked(props) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" {...props}>
      <g
        id="checked__ATOM---Checkboxes---Radio-buttons"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="checked__Checkboxes-Radio-Buttons"
          transform="translate(-177 -725)"
        >
          <g
            id="checked__checkbox-active-default"
            transform="translate(177 724)"
          >
            <rect
              id="checked__background"
              fill="#FFF"
              x={0}
              y={1}
              width={16}
              height={16}
              rx={4}
            />
            <g id="checked__borderAndContent" transform="translate(0 .5)">
              <rect
                id="checked__border"
                stroke="#AFAFAF"
                x={0.5}
                y={1}
                width={15}
                height={15}
                rx={4}
              />
              <path
                d="M12.918 3.759a.497.497 0 00-.7 0L6.011 9.966a.497.497 0 01-.7 0L3.78 8.438a.497.497 0 00-.699 0l-.938.938a.497.497 0 000 .7l3.167 3.165a.497.497 0 00.7 0l7.845-7.845a.496.496 0 000-.7l-.938-.937z"
                id="checked__content"
                fill="#20AD92"
                fillRule="nonzero"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Checked;
