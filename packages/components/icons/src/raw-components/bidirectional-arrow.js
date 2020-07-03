import * as React from 'react';

function BidirectionalArrow(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        d="M12 10.05h-1V8.41h1v1.64zm-2 0H9V8.41h1v1.64zm-2 0H7V8.41h1v1.64zm-2 1.983l-1-.935V7.325l1-.952v5.66zm-2-1.869L3 9.23l1-.952v1.886zm13.318.517L21 14.121l-3.682 3.506v-2.686h-5.5a.82.82 0 010-1.64h5.5v-2.62z"
      />
    </svg>
  );
}

export default BidirectionalArrow;
