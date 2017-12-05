import React from 'react';
import { shallow } from 'enzyme';
import { Option } from './radio-option';

jest.mock('invariant');

const createTestProps = custom => ({
  value: 'foo',
  isDisabled: false,
  isChecked: false,
  name: 'bar',
  onChange: jest.fn(),

  // HoC
  handleMouseOver: jest.fn(),
  handleMouseOut: jest.fn(),
  isMouseOver: false,
  ...custom,
});

describe('<Option>', () => {
  describe('rendering', () => {
    let props;
    let wrapper;
    describe('without children', () => {
      beforeEach(() => {
        props = createTestProps();

        wrapper = shallow(<Option {...props} />);
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should supply `onChange` to the `input`', () => {
        expect(wrapper.find('input')).toHaveProp('onChange', props.onChange);
      });

      describe('when disabled', () => {
        beforeEach(() => {
          props = createTestProps({ isDisabled: true });

          wrapper = shallow(<Option {...props} />);
        });

        it('should disable the `input`', () => {
          expect(wrapper.find('input')).toHaveProp(
            'disabled',
            props.isDisabled
          );
        });
      });

      describe('when checked', () => {
        beforeEach(() => {
          props = createTestProps({ isDisabled: true });

          wrapper = shallow(<Option {...props} />);
        });

        it('should check the `input`', () => {
          expect(wrapper.find('input')).toHaveProp('checked', props.isChecked);
        });
      });
    });

    describe('with children', () => {
      beforeEach(() => {
        props = createTestProps();

        wrapper = shallow(<Option {...props}>{'Some label'}</Option>);
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
