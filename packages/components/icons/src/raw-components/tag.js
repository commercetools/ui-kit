import * as React from 'react';

function Tag(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="tag__Icons" stroke="none" strokeWidth={1} fillRule="evenodd">
        <g id="tag__MC-icon-set" transform="translate(-24 -456)" fill="#000">
          <g id="tag__Switch-states" transform="translate(24 408)">
            <g id="tag__Tag" transform="translate(0 48)">
              <path
                d="M20.659 12.424L11.235 3 4.554 3C3.696 3 3 3.696 3 4.553v6.683l9.424 9.423a1.164 1.164 0 001.647 0l6.587-6.588a1.164 1.164 0 000-1.647zM6.474 6.474A1.164 1.164 0 114.827 4.83a1.164 1.164 0 011.647 1.644z"
                id="tag__shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Tag;
