import * as React from 'react';

function RadioOptionChecked(props) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" {...props}>
      <g
        id="radio-option-checked__ATOM---Checkboxes---Radio-buttons"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="radio-option-checked__Checkboxes-Radio-Buttons"
          transform="translate(-402 -725)"
        >
          <g
            id="radio-option-checked__RadioButton-active-default"
            transform="translate(402 725)"
          >
            <circle
              id="radio-option-checked__background"
              stroke="#AFAFAF"
              fill="#FFF"
              cx={8}
              cy={8}
              r={7.5}
            />
            <g id="radio-option-checked__borderAndContent">
              <circle
                id="radio-option-checked__border"
                stroke="#AFAFAF"
                fill="#FFF"
                cx={8}
                cy={8}
                r={7.5}
              />
              <circle
                id="radio-option-checked__content"
                fill="#20AD92"
                cx={8}
                cy={8}
                r={4}
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default RadioOptionChecked;
