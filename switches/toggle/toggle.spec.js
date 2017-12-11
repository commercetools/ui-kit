import React from 'react';
import { shallow } from 'enzyme';
import { Toggle } from './toggle';
import ToggleOn from './toggle-on';
import ToggleOff from './toggle-off';

const onChangeCallback = jest.fn();

const createTestProps = custom => ({
  name: 'toggle',
  isDisabled: false,
  isChecked: false,
  onChange: onChangeCallback,

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
        expect(wrapper.find('input')).toHaveProp('onChange', onChangeCallback);
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
        props = createTestProps();

        wrapper = shallow(
          <Toggle>
            <ToggleOn>{'On'}</ToggleOn>
            <ToggleOff>{'Off'}</ToggleOff>
          </Toggle>
        );
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe('interacting', () => {
    describe('onChange', () => {
      let props;
      beforeEach(() => {
        props = createTestProps({ isChecked: true });

        props.onChange();
      });

      it('should invoke the `onChange` callback', () => {
        expect(onChangeCallback).toHaveBeenCalled();
      });
    });
  });
});
