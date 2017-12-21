import React from 'react';
import { shallow } from 'enzyme';
import { Toggle } from './toggle';

const createTestProps = custom => ({
  name: 'toggle',
  size: 'big',
  isDisabled: false,
  isChecked: false,
  onChange: jest.fn(),

  // HoC
  handleMouseOver: jest.fn(),
  handleMouseOut: jest.fn(),
  isMouseOver: false,
  ...custom,
});

describe('<Toggle>', () => {
  describe('rendering', () => {
    let props;
    let wrapper;
    describe('without children', () => {
      beforeEach(() => {
        props = createTestProps();

        wrapper = shallow(<Toggle {...props} />);
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should supply `onChange` to the input', () => {
        expect(wrapper.find('input')).toHaveProp(
          'onChange',
          expect.any(Function)
        );
      });

      describe('when disabled', () => {
        beforeEach(() => {
          props = createTestProps({ isDisabled: true });

          wrapper = shallow(<Toggle {...props} />);
        });

        it('should disable the `input`', () => {
          expect(wrapper.find('input')).toHaveProp('disabled', true);
        });
      });

      describe('when checked', () => {
        beforeEach(() => {
          props = createTestProps({ isChecked: true });

          wrapper = shallow(<Toggle {...props} />);
        });

        it('should check the `input`', () => {
          expect(wrapper.find('input')).toHaveProp('checked', true);
        });
      });
    });

    describe('with children', () => {
      beforeEach(() => {
        props = createTestProps({ isChecked: false });

        wrapper = shallow(<Toggle {...props} />);
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe('callback', () => {
    describe('onChange', () => {
      let props;
      let wrapper;
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<Toggle {...props} />);

        wrapper.find({ name: props.name }).prop('onChange')();
      });

      it('should invoke the `onChange` callback', () => {
        expect(props.onChange).toHaveBeenCalled();
      });

      it('should invoke the `onChange` callback with not `isChecked`', () => {
        expect(props.onChange).toHaveBeenCalledWith(!props.isChecked);
      });
    });
  });
});
