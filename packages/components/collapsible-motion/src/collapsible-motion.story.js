import { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean } from '@storybook/addon-knobs/react';
import Inline from '../../spacings/spacings-inline';
import CollapsibleMotion from './collapsible-motion';
import Readme from '../README.md';

class CollapsibleMotionStory extends Component {
  static displayName = 'CollapsibleMotionStory';
  state = {
    isClosed: false,
  };
  handleToggle = () =>
    this.setState((prevState) => ({ isClosed: !prevState.isClosed }));
  render() {
    const isDefaultClosed = boolean('isDefaultClosed', false);
    return (
      <Inline>
        <div>
          <h2>Uncontrolled example</h2>
          <div key={isDefaultClosed}>
            <div>Some content before</div>
            <CollapsibleMotion
              isDefaultClosed={isDefaultClosed}
              minHeight={number('minHeight (unControlled)', 0, {
                range: true,
                min: 0,
                max: 500,
                step: 5,
              })}
            >
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
              minHeight={number('minHeight (controlled)', 0, {
                range: true,
                min: 0,
                max: 500,
                step: 5,
              })}
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
      </Inline>
    );
  }
}

storiesOf('Components|Panels', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('CollapsibleMotion', () => <CollapsibleMotionStory />);
