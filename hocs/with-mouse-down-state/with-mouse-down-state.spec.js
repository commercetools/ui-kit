import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import withMouseDownState, { stateHandlers } from './with-mouse-down-state';

const BaseComponent = props => (
  <button
    disabled={props.isMouseOver}
    onMouseOver={props.handleMouseOver}
    onMouseOut={props.handleMouseOut}
  />
);
BaseComponent.propTypes = {
  // HoC
  isMouseOver: PropTypes.bool.isRequired,
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseOut: PropTypes.func.isRequired,
};

describe('rendering', () => {
  let wrapper;
  let EnhancedComponent;

  beforeEach(() => {
    EnhancedComponent = withMouseDownState(BaseComponent);

    wrapper = shallow(<EnhancedComponent />);
  });

  it('should output correct tree', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('state handlers', () => {
  let setMouseDown;

  beforeEach(() => {
    setMouseDown = jest.fn();
  });

  describe('when handling mouse over', () => {
    beforeEach(() => {
      stateHandlers.handleMouseDown({ setMouseDown })();
    });

    it('should invoke `setMouseDown` with `true`', () => {
      expect(setMouseDown).toHaveBeenCalledWith(true);
    });
  });

  describe('when handling mouse out', () => {
    beforeEach(() => {
      stateHandlers.handleMouseUp({ setMouseDown })();
    });

    it('should invoke `setMouseDown` with `true`', () => {
      expect(setMouseDown).toHaveBeenCalledWith(false);
    });
  });
});
