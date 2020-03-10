import * as React from 'react';

function Calendar(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        d="M21 6.5V19a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h1V3h3v1h6V3h3v1h1a2 2 0 012 2v.5zM4 7v12a1 1 0 001 1h14a1 1 0 001-1V7H4zm1 2h4v4H5V9zm5 0h4v4h-4V9zm5 0h4v4h-4V9zM5 14h4v4H5v-4zm5 0h4v4h-4v-4zm5 0h4v4h-4v-4z"
      />
    </svg>
  );
}

export default Calendar;
