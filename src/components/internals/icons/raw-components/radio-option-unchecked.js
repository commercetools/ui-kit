import React from 'react';

function RadioOptionUnchecked(props) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" {...props}>
      <g
        id="radio-option-unchecked__ATOM---Checkboxes---Radio-buttons"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="radio-option-unchecked__Checkboxes-Radio-Buttons"
          transform="translate(-402 -645)"
        >
          <g
            id="radio-option-unchecked__RadioButton-empty-default"
            transform="translate(402 645)"
          >
            <circle
              id="radio-option-unchecked__background"
              fill="#FFF"
              cx={8}
              cy={8}
              r={8}
            />
            <g id="radio-option-unchecked__borderAndContent" stroke="#AFAFAF">
              <circle
                id="radio-option-unchecked__border"
                cx={8}
                cy={8}
                r={7.5}
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default RadioOptionUnchecked;
