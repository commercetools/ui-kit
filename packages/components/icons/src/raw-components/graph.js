import * as React from 'react';

function Graph(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="graph__Icons" stroke="none" strokeWidth={1} fillRule="evenodd">
        <g id="graph__MC-icon-set" transform="translate(-168 -72)" fill="#000">
          <g id="graph__Application" transform="translate(24 24)">
            <g id="graph__Graph" transform="translate(144 48)">
              <path
                d="M3 12.51c0-.282.215-.51.498-.51h4.004a.5.5 0 01.498.51v7.98c0 .282-.215.51-.498.51H3.498A.5.5 0 013 20.49v-7.98zM9.51 3.5c0-.276.216-.5.498-.5h4.005c.275 0 .498.228.498.5v17c0 .276-.215.5-.498.5h-4.005a.501.501 0 01-.497-.5v-17zM16 8.494A.49.49 0 0116.498 8h4.004c.275 0 .498.226.498.494v12.012a.49.49 0 01-.498.494h-4.004a.499.499 0 01-.498-.494V8.494z"
                id="graph__shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Graph;
