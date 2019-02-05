import React from 'react';
import PropTypes from 'prop-types';
import { render } from '../../../test-utils';
import RootRef from './root-ref';

class TestComponent extends React.Component {
  state = {
    show: this.props.show,
  };

  static propTypes = {
    show: PropTypes.bool,
    rootRef: PropTypes.func,
  };

  toggle = () => {
    this.setState(prevState => ({
      show: !prevState.show,
    }));
  };

  render() {
    return (
      <div>
        <label htmlFor="toggleButton">Toggle</label>
        <button id="toggleButton" onClick={this.toggle} />
        {this.state.show && (
          <RootRef rootRef={this.props.rootRef}>
            <div>Foo</div>
          </RootRef>
        )}
      </div>
    );
  }
}

describe('RootRef', () => {
  it('should call setRoot function on mount and unmount', () => {
    const rootRef = jest.fn();
    const { getByLabelText } = render(<TestComponent rootRef={rootRef} show />);
    expect(rootRef).toHaveBeenCalled();
    getByLabelText('Toggle').click();
    // should call again on unMount
    expect(rootRef).toHaveBeenCalledTimes(2);
  });
});
