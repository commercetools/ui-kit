import * as React from 'react';

function ExternalLink(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        id="external-link__Component-/-icon-/-24px-/-external-window"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M17.822 4.788l-6.534 6.533a.984.984 0 001.391 1.391l6.532-6.53v2.184a.895.895 0 001.789 0V3.893A.89.89 0 0020.106 3h-4.473a.895.895 0 000 1.788h2.19zM21 9.522v9.235C21 19.996 20.107 21 19.005 21H4.995C3.893 21 3 19.994 3 18.757V7.243C3 6.004 3.893 5 4.995 5H10.2a.9.9 0 110 1.8H5.313c-.287 0-.513.269-.513.6v11.2c0 .325.23.6.513.6h13.374c.287 0 .513-.269.513-.6v-4.8a.9.9 0 111.8 0V9.522z"
          id="external-link__Shape"
          fill="#1A1A1A"
        />
      </g>
    </svg>
  );
}

export default ExternalLink;
