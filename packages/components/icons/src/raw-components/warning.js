import * as React from 'react';

function Warning(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="warning__Icons" stroke="none" strokeWidth={1} fillRule="evenodd">
        <g
          id="warning__MC-icon-set"
          transform="translate(-24 -312)"
          fill="#000"
        >
          <g id="warning__Notices" transform="translate(24 312)">
            <g id="warning__Warning">
              <path
                d="M20.678 17.887L13.37 5.229c-.752-1.305-1.987-1.305-2.74 0L3.322 17.887c-.754 1.305-.137 2.373 1.37 2.373h14.616c1.508 0 2.124-1.068 1.37-2.373zm-7.96.049a.976.976 0 01-.712.297.98.98 0 01-.721-.297.994.994 0 01-.3-.72c0-.276.104-.513.3-.712.197-.2.439-.3.72-.3.278 0 .51.1.712.3a.98.98 0 01.295.711c0 .281-.099.522-.295.72zm-.36-2.286h-.717c-.962-3.774-1.441-5.814-1.441-6.112 0-.364.184-.657.557-.88a2.344 2.344 0 011.25-.335c.498 0 .92.116 1.272.356.345.237.52.52.52.845 0 .307-.477 2.352-1.44 6.126z"
                id="warning__shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Warning;
