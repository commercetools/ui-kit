import React from 'react';

function SpeechBubble(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g
        id="speech-bubble__Component-/-icon-/-24px-/-speech-bubble"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M3 15.094c.002 1.162 1.008 2.104 2.25 2.105h6.175l4.393 3.408c.07.039.15.06.232.06.248 0 .45-.189.45-.421v-3.047h2.25c1.242-.001 2.249-.943 2.25-2.105V5.772c-.001-1.162-1.008-2.104-2.25-2.105H5.25c-1.242 0-2.248.943-2.25 2.105v9.322z"
          id="speech-bubble__Fill-1"
          fill="#1A1A1A"
        />
      </g>
    </svg>
  );
}

export default SpeechBubble;
