import * as React from 'react';

function Cubes(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g id="cubes__Icons" stroke="none" strokeWidth={1} fillRule="evenodd">
        <g id="cubes__MC-icon-set" transform="translate(-240 -24)" fill="#000">
          <g id="cubes__Application" transform="translate(24 24)">
            <g id="cubes__Cubes" transform="translate(216)">
              <path
                d="M20.837 12.696l-4.265-1.558V6.393a.215.215 0 00-.145-.203L12.06 4.594a.218.218 0 00-.14 0L7.56 6.146a.201.201 0 00-.1.074.215.215 0 00-.05.136v4.78l-4.26 1.516a.203.203 0 00-.1.074.215.215 0 00-.05.137v4.823c0 .09.058.172.144.202l4.362 1.5a.22.22 0 00.141 0l4.344-1.493 4.335 1.493a.22.22 0 00.142 0l4.362-1.502a.214.214 0 00.152-.205V12.9a.214.214 0 00-.145-.203zm-5.025-1.885l-3.352 1.133V8.356l3.352-1.227v3.682zM11.99 5.373l3.117 1.162-3.114 1.15-3.29-1.132 3.287-1.18zm-4.407 8.82l-3.29-1.134 3.287-1.18 3.117 1.162-3.114 1.151zm3.819 3.125L8.05 18.45v-3.588l3.352-1.226v3.682zm5.001-3.126l-3.29-1.133 3.287-1.18 3.118 1.162-3.115 1.151zm3.819 3.126L16.87 18.45v-3.588l3.352-1.226v3.682z"
                id="cubes__shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Cubes;
