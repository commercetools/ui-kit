import * as React from 'react';

function Switcher(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g id="switcher__Icons" stroke="none" strokeWidth={1} fillRule="evenodd">
        <g
          id="switcher__MC-icon-set"
          transform="translate(-96 -792)"
          fill="#000"
        >
          <g id="switcher__Actions" transform="translate(24 648)">
            <g id="switcher__Switcher" transform="translate(72 144)">
              <path
                d="M3.77 10.996v.797-.797c-.424 0-.77-.387-.77-.863 0-2.659 2.056-4.11 4.49-4.11h11.035l-1.25-1.587a.94.94 0 01.069-1.22.714.714 0 011.087.076l2.377 3.023a.945.945 0 010 1.143l-2.377 3.024a.733.733 0 01-.578.292.721.721 0 01-.508-.216.94.94 0 01-.068-1.22l1.248-1.588H7.491c-1.6 0-2.95.66-2.95 2.382 0 .477-.345.864-.77.864zm15.69.99c0-.524.345-.78.77-.78.426 0 .77.256.77.779 0 2.924-2.056 4.348-4.49 4.348H5.475l1.248 1.918c.282.394.251 1.164-.067 1.512-.32.347-.806.309-1.087-.086L3.192 16.35a1.132 1.132 0 010-1.262l2.377-3.336c.152-.212.365-.343.578-.343.18 0 .362.036.509.195.318.347.35.863.067 1.256l-1.248 1.575H16.51c1.6 0 2.95-.552 2.95-2.448z"
                id="switcher__shape"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Switcher;
