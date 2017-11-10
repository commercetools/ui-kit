import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import withMouseOverState, { stateHandlers } from './with-mouse-over-state';

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
    EnhancedComponent = withMouseOverState(BaseComponent);

    wrapper = shallow(<EnhancedComponent />);
  });

  it('should output correct tree', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('state handlers', () => {
  let setMouseOver;

  beforeEach(() => {
    setMouseOver = jest.fn();
  });

  describe('when handling mouse over', () => {
    beforeEach(() => {
      stateHandlers.handleMouseOver({ setMouseOver })();
    });

    it('should invoke `setMouseOver` with `true`', () => {
      expect(setMouseOver).toHaveBeenCalledWith(true);
    });
  });

  describe('when handling mouse out', () => {
    beforeEach(() => {
      stateHandlers.handleMouseOut({ setMouseOver })();
    });

    it('should invoke `setMouseOver` with `true`', () => {
      expect(setMouseOver).toHaveBeenCalledWith(false);
    });
  });
});
