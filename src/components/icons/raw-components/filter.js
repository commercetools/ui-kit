import React from 'react';

function Filter(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g id="filter__Icons" stroke="none" strokeWidth={1} fillRule="evenodd">
        <g id="filter__MC-icon-set" transform="translate(-24 -792)" fill="#000">
          <g id="filter__Actions" transform="translate(24 648)">
            <g id="filter__Filter" transform="translate(0 144)">
              <path
                d="M19.718 3H4.298c-.325 0-.606.143-.756.483-.093.275-.036.695.213.949l5.94 6.476v5.516c0 .227.076.425.228.591l3.085 3.362c.144.167.325.25.542.25a.78.78 0 00.302-.066c.313-.148.47-.407.47-.775v-8.878l5.94-6.476a.996.996 0 00.195-.934.752.752 0 00-.739-.498z"
                id="filter__shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Filter;
