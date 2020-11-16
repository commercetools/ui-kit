import * as React from 'react';

function Review(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <defs>
        <path
          d="M11.986 17.972a5.986 5.986 0 110-11.972 5.986 5.986 0 010 11.972zm3.366-9.115a.34.34 0 00-.48 0l-4.247 4.248a.34.34 0 01-.48 0L9.1 12.06a.34.34 0 00-.479 0l-.641.642a.34.34 0 000 .48l2.167 2.166a.34.34 0 00.479 0l5.369-5.37a.34.34 0 000-.478l-.642-.642z"
          id="review__path-1"
        />
      </defs>
      <g
        id="review__Icons"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
        transform="translate(-136 -476)"
      >
        <g transform="translate(64 380)" id="review__Menu">
          <g id="review__Review" transform="translate(72 96)">
            <g id="review__review24">
              <g id="review__Shape" transform="translate(3 3)">
                <path
                  d="M16 5.07V4H2v12h3.07c.436.753.99 1.428 1.638 2H0V0h18v6.708a8.037 8.037 0 00-2-1.638zm2 12.908V18h-.019l.019-.022z"
                  id="review__Combined-Shape"
                  fill="#000105"
                />
                <mask id="review__mask-2" fill="#fff">
                  <use xlinkHref="#review__path-1" />
                </mask>
                <use
                  id="review__Combined-Shape"
                  fill="#000105"
                  xlinkHref="#review__path-1"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Review;
