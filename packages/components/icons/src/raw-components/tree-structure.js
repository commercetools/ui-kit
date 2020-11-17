import * as React from 'react';

function TreeStructure(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        id="tree-structure__Icons"
        stroke="none"
        strokeWidth={1}
        fillRule="evenodd"
      >
        <g
          id="tree-structure__MC-icon-set"
          transform="translate(-168 -168)"
          fill="#000"
        >
          <g id="tree-structure__Menu" transform="translate(24 168)">
            <g id="tree-structure__Tree-Structure" transform="translate(144)">
              <path
                d="M11.25 4.91V4.5H15v-.495C15 3.45 15.448 3 15.999 3H18.5c.552 0 .999.445.999 1.005v1.74c0 .555-.448 1.005-.999 1.005H16A.999.999 0 0115 5.745V5.22h-3.03v6.03H15v-.495c0-.555.448-1.005.999-1.005H18.5c.552 0 .999.445.999 1.005v1.74c0 .555-.448 1.005-.999 1.005H16A.999.999 0 0115 12.495v-.525h-3.03v6.78H15v-.495c0-.555.448-1.005.999-1.005H18.5c.552 0 .999.445.999 1.005v1.74c0 .555-.448 1.005-.999 1.005H16A.999.999 0 0115 19.995v-.525h-3.75v-7.5h-3v-.72h3V4.91zm-7.5 5.845c0-.555.448-1.005.999-1.005H7.25c.552 0 .999.445.999 1.005v1.74c0 .555-.448 1.005-.999 1.005H4.75a.999.999 0 01-.999-1.005v-1.74z"
                id="tree-structure__shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default TreeStructure;
