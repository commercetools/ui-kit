import React from 'react';

function Search(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g id="search__Icons" stroke="none" strokeWidth={1} fillRule="evenodd">
        <g id="search__MC-icon-set" transform="translate(-96 -744)" fill="#000">
          <g id="search__Actions" transform="translate(24 648)">
            <g id="search__Search" transform="translate(72 96)">
              <path
                d="M5.556 12.14a4.832 4.832 0 010-4.81A4.782 4.782 0 019.7 4.924c1.71 0 3.29.917 4.145 2.406a4.832 4.832 0 010 4.81A4.782 4.782 0 019.7 14.547c-1.71 0-3.29-.917-4.145-2.405m15.18 7.427l-5.713-5.742a6.752 6.752 0 00.48-7.458A6.694 6.694 0 009.702 3a6.694 6.694 0 00-5.803 3.368 6.765 6.765 0 000 6.735 6.676 6.676 0 009.85 2l5.715 5.745a.896.896 0 001.273 0 .909.909 0 000-1.28"
                id="search__shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Search;
