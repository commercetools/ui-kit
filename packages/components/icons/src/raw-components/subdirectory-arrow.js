import * as React from 'react';

function SubdirectoryArrow(props) {
  return (
    <svg
      width={11}
      height={18}
      viewBox="0 0 11 18"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <defs>
        <path
          d="M16.404 17v-1.625c0-.102.04-.19.118-.264a.394.394 0 01.28-.111c.107 0 .2.037.279.111l2.78 2.625a.351.351 0 010 .527l-2.78 2.626a.393.393 0 01-.28.111.393.393 0 01-.279-.111.35.35 0 01-.118-.264V19H10a1 1 0 01-1-1V4a1 1 0 112 0v13h5.404z"
          id="subdirectory-arrow__path-1"
        />
      </defs>
      <g
        id="subdirectory-arrow__Icons"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="subdirectory-arrow__Component-/-icon-/-12px-/-suplink--"
          transform="translate(-9 -3)"
        >
          <g id="subdirectory-arrow__Component-/-icon-/-24px-/-suplink">
            <mask id="subdirectory-arrow__mask-2" fill="#fff">
              <use xlinkHref="#subdirectory-arrow__path-1" />
            </mask>
            <use
              id="subdirectory-arrow__Mask"
              fill="#1A1A1A"
              xlinkHref="#subdirectory-arrow__path-1"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

export default SubdirectoryArrow;
