import React from 'react';
import { shallow } from 'enzyme';
import ToggleOn from './toggle-on';

const createTestProps = custom => ({
  isDisabled: false,
  isChecked: false,
  ...custom,
});

describe('<ToggleOn>', () => {
  describe('rendering', () => {
    let props;
    let wrapper;

    it('outputs correct tree', () => {
      props = createTestProps();
      wrapper = shallow(<ToggleOn {...props} />);

      expect(wrapper).toMatchSnapshot();
    });

    describe('when checked', () => {
      beforeEach(() => {
        props = createTestProps({ isChecked: true });
        wrapper = shallow(<ToggleOn {...props} />);
      });

      it('renders a <span>', () => {
        expect(wrapper).toRender('span');
      });
    });

    describe('when not checked', () => {
      beforeEach(() => {
        props = createTestProps({ isChecked: false });
        wrapper = shallow(<ToggleOn {...props} />);
      });

      it('should not render any children', () => {
        expect(wrapper.children()).toHaveLength(0);
      });
    });

    describe('when checked and disabled', () => {
      beforeEach(() => {
        props = createTestProps({ isDisabled: true, isChecked: true });
        wrapper = shallow(<ToggleOn {...props} />);
      });

      it('should render a <span> with disabled class', () => {
        expect(wrapper.find('span')).toHaveClassName('textWrapperDisabled');
      });
    });
  });
});
