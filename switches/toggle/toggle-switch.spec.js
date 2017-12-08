import React from 'react';
import { shallow } from 'enzyme';
import ToggleSwitch from './toggle-switch';

const createTestProps = custom => ({
  isDisabled: false,
  isChecked: false,
  isMouseOver: false,
  ...custom,
});

describe('<ToggleSwitch>', () => {
  describe('rendering', () => {
    let props;
    let wrapper;

    it('outputs correct tree', () => {
      props = createTestProps();
      wrapper = shallow(<ToggleSwitch {...props} />);

      expect(wrapper).toMatchSnapshot();
    });
  });
});
