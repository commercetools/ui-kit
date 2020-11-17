import * as React from 'react';

function Close(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="close__Icons" stroke="none" strokeWidth={1} fillRule="evenodd">
        <g id="close__MC-icon-set" transform="translate(-96 -648)" fill="#000">
          <g id="close__Actions" transform="translate(24 648)">
            <g id="close__Close" transform="translate(72)">
              <path
                d="M11.031 11.616l-7.75 7.46a.442.442 0 000 .647.429.429 0 00.329.139c.14 0 .234-.047.375-.14l7.722-7.455 7.746 7.456a.429.429 0 00.328.139.512.512 0 00.328-.14c.235-.184.235-.461 0-.646l-7.738-7.45 7.739-7.471c.235-.185.235-.462 0-.647a.458.458 0 00-.657 0l-7.758 7.468-7.758-7.468a.458.458 0 00-.656 0 .442.442 0 000 .647l7.75 7.46z"
                id="close__shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Close;
