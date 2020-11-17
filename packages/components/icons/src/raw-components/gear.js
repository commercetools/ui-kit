import * as React from 'react';

function Gear(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="gear__Icons" stroke="none" strokeWidth={1} fillRule="evenodd">
        <g id="gear__MC-icon-set" transform="translate(-168 -744)" fill="#000">
          <g id="gear__Actions" transform="translate(24 648)">
            <g id="gear__Pin" transform="translate(144 96)">
              <path
                d="M13.993 2.982l.235 2.102a7.241 7.241 0 012.625 1.515l1.937-.851 2 3.468-1.71 1.25c.104.49.163.996.163 1.516s-.06 1.026-.164 1.516l1.711 1.25-2 3.468-1.937-.851a7.241 7.241 0 01-2.625 1.515l-.235 2.102h-4L9.76 18.88a7.241 7.241 0 01-2.625-1.515l-1.937.851-2-3.468 1.71-1.25a7.269 7.269 0 01-.164-1.516c0-.52.06-1.026.165-1.516l-1.711-1.25 2-3.468 1.937.851A7.241 7.241 0 019.76 5.084l.234-2.102h4zm-2 4.625a4.366 4.366 0 00-4.375 4.375 4.366 4.366 0 004.375 4.375 4.366 4.366 0 004.375-4.375 4.366 4.366 0 00-4.375-4.375z"
                id="gear__Combined-Shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Gear;
