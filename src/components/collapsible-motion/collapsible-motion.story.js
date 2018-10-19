import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import { withKnobs, number } from '@storybook/addon-knobs';
// import withReadme from 'storybook-readme/with-readme';
import CollapsibleMotion from './collapsible-motion';

export const CollapsibleMotionStoryBody = props => (
  <div>
    <div>
      <button label={props.isOpen ? 'Close' : 'Open'} onClick={props.onToggle}>
        {props.isOpen ? 'Close' : 'Open'}
      </button>
    </div>
    <div style={props.style}>
      <div ref={props.registerContentNode}>{props.children}</div>
    </div>
  </div>
);

CollapsibleMotionStoryBody.displayName = 'CollapsibleMotionStoryBody';
CollapsibleMotionStoryBody.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  registerContentNode: PropTypes.any,
};

export const CollapsibleMotionStory = () => (
  <div>
    <div>Some content before</div>
    <CollapsibleMotion>
      {({ isOpen, toggle, containerStyles, registerContentNode }) => (
        <CollapsibleMotionStoryBody
          registerContentNode={registerContentNode}
          style={containerStyles}
          isOpen={isOpen}
          onToggle={toggle}
        >
          <div
            style={{
              backgroundColor: 'red',
              width: '200px',
              height: `${number('height', 250, {
                range: true,
                min: 10,
                max: 5000,
                step: 50,
              })}px`,
            }}
          >
            hello
          </div>
        </CollapsibleMotionStoryBody>
      )}
    </CollapsibleMotion>
    <div>Some content afterwards</div>
  </div>
);
CollapsibleMotionStory.displayName = 'CollapsibleMotionStory';

storiesOf('Panels', module)
  .addDecorator(withKnobs)
  // .addDecorator(withReadme(Readme))
  .add('CollapsibleMotion', () => <CollapsibleMotionStory />);
