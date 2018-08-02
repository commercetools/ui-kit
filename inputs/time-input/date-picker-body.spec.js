import React from 'react';
import { shallow } from 'enzyme';
import { CalendarIcon, ClockIcon } from '../../icons';
import {
  DatePickerBody,
  ClearSection,
  ClearSectionWithMouseOverState,
} from './date-picker-body';

const createDatePickerBodyProps = (props = {}) => ({
  mode: 'single',
  timeScale: 'date',
  placeholder: 'Please select a date',
  isInvalid: false,
  isDisabled: false,
  formattedValue: '20.08.2017',
  onClearPicker: jest.fn(),

  ...props,
});

describe('<DatePickerBody>', () => {
  let props;
  let wrapper;

  describe('rendering', () => {
    describe('when is invalid', () => {
      beforeEach(() => {
        props = createDatePickerBodyProps({
          isInvalid: true,
        });
        wrapper = shallow(<DatePickerBody {...props} />);
      });

      it('should set invalid class on input field', () => {
        expect(wrapper.find('input')).toHaveClassName('invalid');
      });

      it('should pass on invalid-prop to `ClearSectionWithMouseOverState`', () => {
        expect(wrapper.find(ClearSectionWithMouseOverState)).toHaveProp(
          'isInvalid',
          true
        );
      });

      it('should set invalid-class on container of the toggle-element', () => {
        expect(wrapper.find('[data-toggle]')).toHaveClassName('invalid');
      });
    });

    describe('when is for picking "date"', () => {
      beforeEach(() => {
        props = createDatePickerBodyProps({
          timeScale: 'date',
        });
        wrapper = shallow(<DatePickerBody {...props} />);
      });

      it('should render a Calendar icon', () => {
        expect(wrapper).toRender(CalendarIcon);
      });

      it('should not render a Clock icon', () => {
        expect(wrapper).not.toRender(ClockIcon);
      });
    });

    describe('when is for picking "date" and "time"', () => {
      beforeEach(() => {
        props = createDatePickerBodyProps({
          timeScale: 'datetime',
        });
        wrapper = shallow(<DatePickerBody {...props} />);
      });

      it('should render a Calendar icon', () => {
        expect(wrapper).toRender(CalendarIcon);
      });

      it('should not render a Clock icon', () => {
        expect(wrapper).not.toRender(ClockIcon);
      });
    });
    describe('when is for picking "time"', () => {
      beforeEach(() => {
        props = createDatePickerBodyProps({
          timeScale: 'time',
        });
        wrapper = shallow(<DatePickerBody {...props} />);
      });

      it('should not render a Calendar icon', () => {
        expect(wrapper).not.toRender(CalendarIcon);
      });

      it('should render a Clock icon', () => {
        expect(wrapper).toRender(ClockIcon);
      });
    });

    describe('with `horizontalConstraint`', () => {
      beforeEach(() => {
        props = createDatePickerBodyProps({
          horizontalConstraint: 'xl',
        });
        wrapper = shallow(<DatePickerBody {...props} />);
      });

      it('should add a scale class to the `input`', () => {
        expect(wrapper.find('.date-input-container')).toHaveClassName(
          'constraintXl'
        );
      });
    });

    describe('when it has a placeholder', () => {
      beforeEach(() => {
        props = createDatePickerBodyProps({
          placeholder: 'foo goes into a bar',
        });
        wrapper = shallow(<DatePickerBody {...props} />);
      });

      it('should set the placeholder on the input', () => {
        expect(wrapper.find('input')).toHaveProp(
          'placeholder',
          'foo goes into a bar'
        );
      });
    });

    describe('formattedValue', () => {
      describe('when it is set', () => {
        beforeEach(() => {
          props = createDatePickerBodyProps({
            formattedValue: '30.08.2017',
          });
          wrapper = shallow(<DatePickerBody {...props} />);
        });

        it('should apply it to input as default value', () => {
          expect(wrapper.find('input')).toHaveProp(
            'defaultValue',
            '30.08.2017'
          );
        });
      });

      describe('when it is undefined', () => {
        beforeEach(() => {
          props = createDatePickerBodyProps({
            formattedValue: undefined,
          });
          wrapper = shallow(<DatePickerBody {...props} />);
        });

        it('should apply it to input as default value', () => {
          expect(wrapper.find('input')).toHaveProp('defaultValue', undefined);
        });
      });
    });

    describe('when is disabled', () => {
      beforeEach(() => {
        props = createDatePickerBodyProps({
          isDisabled: true,
        });
        wrapper = shallow(<DatePickerBody {...props} />);
      });

      it('should set the "input" to disabled', () => {
        expect(wrapper.find('input')).toHaveProp('disabled', true);
      });

      it('should set the `ClearSectionWithMouseOverState` to invalid', () => {
        expect(wrapper.find(ClearSectionWithMouseOverState)).toHaveProp(
          'isDisabled',
          true
        );
      });

      it('should set disabled class on icon-container', () => {
        expect(wrapper.find('.calendar-icon-container')).toHaveClassName(
          'icon-container-disabled'
        );
      });

      it('should set the grey-theme on `CalendarIcon`', () => {
        expect(wrapper.find(CalendarIcon)).toHaveProp('theme', 'grey');
      });
    });
  });
});

const createClearButtonProps = props => ({
  onClear: jest.fn(),
  handleMouseOver: jest.fn(),
  handleMouseOut: jest.fn(),
  isMouseOver: false,
  ...props,
});

describe('<ClearSection>', () => {
  let props;
  let wrapper;

  describe('rendering', () => {
    beforeEach(() => {
      props = createClearButtonProps();
      wrapper = shallow(<ClearSection {...props} />);
      wrapper.find('div').simulate('click');
    });

    describe('when not disabled', () => {
      it('should apply the clear icon container className', () => {
        expect(wrapper.find('div')).toHaveClassName('clear-icon-container');
      });
      it('should apply regular theme (black) for the icon', () => {
        expect(wrapper.find('CloseBoldIcon')).toHaveProp('theme', 'black');
      });
    });

    describe('when hovering', () => {
      let buttonProps;
      let buttonWrapper;
      beforeEach(() => {
        buttonProps = createClearButtonProps({ isMouseOver: true });
        buttonWrapper = shallow(<ClearSection {...buttonProps} />);
      });
      it('should apply the clear icon container className', () => {
        expect(buttonWrapper.find('div')).toHaveClassName(
          'clear-icon-container'
        );
      });
      it('should apply hover theme (orange) for the icon', () => {
        expect(buttonWrapper.find('CloseBoldIcon')).toHaveProp(
          'theme',
          'orange'
        );
      });
    });
  });

  describe('when clicking on `ClearSection`', () => {
    describe('when not disabled', () => {
      beforeEach(() => {
        props = createClearButtonProps();
        wrapper = shallow(<ClearSection {...props} />);
        wrapper.find('div').simulate('click');
      });

      it('should call the `onClear` function', () => {
        expect(props.onClear).toHaveBeenCalledTimes(1);
      });
    });
  });
});
