import * as React from 'react';

function Info(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g id="info__Icons" stroke="none" strokeWidth={1} fillRule="evenodd">
        <g id="info__MC-icon-set" transform="translate(-96 -312)" fill="#000">
          <g id="info__Notices" transform="translate(24 312)">
            <g id="info__Info" transform="translate(72)">
              <path
                d="M12 3a9 9 0 100 18 9 9 0 000-18zm0 4.5a1.125 1.125 0 110 2.25 1.125 1.125 0 010-2.25zm1.688 9h-3.376a.562.562 0 110-1.125h.563V12h-.563a.562.562 0 110-1.125h2.25c.311 0 .563.252.563.563v3.937h.563a.563.563 0 010 1.125z"
                id="info__shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Info;
