import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
// import withReadme from 'storybook-readme/with-readme';
import CollapsibleMotion from './collapsible-motion';
import Spacings from '../spacings';

class CollapsibleMotionStory extends React.Component {
  static displayName = 'CollapsibleMotionStory';
  state = {
    isClosed: false,
  };
  handleToggle = () =>
    this.setState(prevState => ({ isClosed: !prevState.isClosed }));
  render() {
    const isDefaultClosed = boolean('isDefaultClosed', false);
    return (
      <Spacings.Inline>
        <div>
          <h2>Uncontrolled example</h2>
          <div key={isDefaultClosed}>
            <div>Some content before</div>
            <CollapsibleMotion isDefaultClosed={isDefaultClosed}>
              {({ isOpen, toggle, containerStyles, registerContentNode }) => (
                <div>
                  <div>
                    <button onClick={toggle}>
                      {isOpen ? 'Close' : 'Open'}
                    </button>
                  </div>
                  <div style={containerStyles}>
                    <div ref={registerContentNode}>
                      <div
                        style={{
                          backgroundColor: 'red',
                          width: '200px',
                          height: `${number('height (uncontrolled)', 250, {
                            range: true,
                            min: 20,
                            max: 5000,
                            step: 50,
                          })}px`,
                        }}
                      >
                        hello
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CollapsibleMotion>
            <div>Some content afterwards</div>
          </div>
        </div>
        <div>
          <h2>Controlled example</h2>
          <button onClick={() => this.setState({ isClosed: false })}>
            Open
          </button>
          <button onClick={() => this.setState({ isClosed: true })}>
            Close
          </button>
          <div>
            <div>Some content before</div>
            <CollapsibleMotion
              isClosed={this.state.isClosed}
              onToggle={this.handleToggle}
            >
              {({ toggle, containerStyles, registerContentNode }) => (
                <div>
                  <div>
                    <button onClick={toggle}>Toggle</button>
                  </div>
                  <div style={containerStyles}>
                    <div ref={registerContentNode}>
                      <div
                        style={{
                          backgroundColor: 'red',
                          width: '200px',
                          height: `${number('height (controlled)', 250, {
                            range: true,
                            min: 20,
                            max: 5000,
                            step: 50,
                          })}px`,
                        }}
                      >
                        hello
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CollapsibleMotion>
            <div>Some content afterwards</div>
          </div>
        </div>
      </Spacings.Inline>
    );
  }
}

storiesOf('Panels', module)
  .addDecorator(withKnobs)
  // .addDecorator(withReadme(Readme))
  .add('CollapsibleMotion', () => {
    // this prop is passed to rerender the whole story, which simulates a
    // parent rerendering
    const num = number('rerender', 0, {
      range: true,
      min: 0,
      max: 5000,
      step: 1,
    });
    return <CollapsibleMotionStory num={num} />;
  });
