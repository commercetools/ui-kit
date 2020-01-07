import React from 'react';

function DragDrop(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g id="drag-drop__Icons" stroke="none" strokeWidth={1} fillRule="evenodd">
        <g
          id="drag-drop__MC-icon-set"
          transform="translate(-240 -792)"
          fill="#000"
        >
          <g id="drag-drop__Actions" transform="translate(24 648)">
            <g id="drag-drop__Drag-Drop" transform="translate(216 144)">
              <path
                d="M12.982 9.877V7.293H16.076L12.037 3 8.076 7.293h3.016v6.753c0 .018 0 .035.002.052v2.585H8l4.039 4.292L16 16.683H12.983V9.929l-.001-.052z"
                id="drag-drop__shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default DragDrop;
