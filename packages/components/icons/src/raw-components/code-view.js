import * as React from 'react';

function CodeView(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g id="code-view__Icons" stroke="none" strokeWidth={1} fillRule="evenodd">
        <g
          id="code-view__MC-icon-set"
          transform="translate(-240 -552)"
          fill="#000"
        >
          <g id="code-view__Views" transform="translate(24 552)">
            <g id="code-view__Code-View" transform="translate(216)">
              <path
                d="M8.381 17.89a.317.317 0 01-.237.11.316.316 0 01-.237-.11l-4.804-5.137a.36.36 0 010-.507L7.907 7.11A.316.316 0 018.144 7c.09 0 .169.037.237.11l.516.551A.36.36 0 019 7.915a.36.36 0 01-.103.253L4.845 12.5l4.052 4.332a.36.36 0 01.103.253.36.36 0 01-.103.254l-.516.551zM15.62 7.11a.317.317 0 01.237-.11c.089 0 .168.036.237.11l4.804 5.137a.36.36 0 010 .507l-4.804 5.136a.316.316 0 01-.237.11.316.316 0 01-.237-.11l-.516-.551a.36.36 0 01-.103-.254.36.36 0 01.103-.253l4.052-4.332-4.052-4.332A.36.36 0 0115 7.915a.36.36 0 01.103-.254l.516-.551zm-1.83 2.343l-2.767 6.704-1.456-.072 2.767-6.705 1.456.073z"
                id="code-view__shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default CodeView;
