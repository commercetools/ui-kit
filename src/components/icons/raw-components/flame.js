import * as React from 'react';

function Flame(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g id="flame__Icons" stroke="none" strokeWidth={1} fillRule="evenodd">
        <g id="flame__MC-icon-set" transform="translate(-96 -72)" fill="#000">
          <g id="flame__Application" transform="translate(24 24)">
            <g id="flame__Flames" transform="translate(72 48)">
              <path
                d="M12.014 21C8.134 21 5 17.735 5 13.692c0-1.677.539-3.953 2.156-4.492 0 0 .266 2.208 1.617 3.347.173-1.857-1.1-7.42 4.305-9.547 0 3.414-.532 3.37 1.085 9 0-3.384.812-4.418 3.17-5.106-.03 3.264 1.667 4.372 1.667 6.768.029 4.073-3.105 7.338-6.986 7.338z"
                id="flame__shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Flame;
