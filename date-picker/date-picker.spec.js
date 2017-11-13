import React from 'react';
import { shallow } from 'enzyme';
import Flatpickr from 'flatpickr';
import isTouchDevice from 'is-touch-device';
import { de } from 'flatpickr/dist/l10n/de';
import { intlMock } from 'core/utils/test';
import { DatePicker, createFormatter } from './date-picker';

jest.mock('flatpickr', () => jest.fn());
jest.mock('is-touch-device', () => jest.fn());

const createTestProps = custom => ({
  onChange: jest.fn(),
  value: null,
  placeholder: 'test',
  locale: 'en',
  intl: intlMock,
  ...custom,
});

describe('<DatePicker />', () => {
  beforeEach(() => {
    isTouchDevice.mockClear();
    isTouchDevice.mockReturnValue(false);
  });
  describe('defaultProps', () => {
    it('should have "single" as `mode`-prop', () => {
      expect(DatePicker.defaultProps.mode).toBe('single');
    });

    it('should have "date" as `timeScale`-prop', () => {
      expect(DatePicker.defaultProps.timeScale).toBe('date');
    });

    it('should have "false" as `isDisabled`-prop', () => {
      expect(DatePicker.defaultProps.isDisabled).toBe(false);
    });

    it('should have "false" as `isInvalid`-prop', () => {
      expect(DatePicker.defaultProps.isInvalid).toBe(false);
    });

    it('should have "static" as `size`-prop', () => {
      expect(DatePicker.defaultProps.size).toBe('static');
    });
  });

  describe('lifecycle', () => {
    describe('componentWillMount', () => {
      let wrapper;
      let props;

      describe('without locale', () => {
        beforeEach(() => {
          props = createTestProps();
          wrapper = shallow(<DatePicker {...props} />);
          wrapper.instance().componentWillMount();
        });

        it('should create formatter', () => {
          expect(wrapper.instance().formatter).toEqual(expect.any(Function));
        });

        it('should create options object', () => {
          expect(wrapper.instance().options).toEqual({
            defaultDate: null,
            enableTime: false,
            formatDate: expect.any(Function),
            locale: null,
            mode: 'single',
            noCalendar: false,
            onChange: wrapper.instance().handleChange,
            time_24hr: false,
            wrap: true,
          });
        });
      });

      describe('with locale de', () => {
        beforeEach(() => {
          props = createTestProps({
            locale: 'de',
          });
          wrapper = shallow(<DatePicker {...props} />);
          wrapper.instance().componentWillMount();
        });

        it('should create options object with the appropriate localization', () => {
          expect(wrapper.instance().options).toEqual(
            expect.objectContaining({ locale: de, time_24hr: true })
          );
        });
      });

      describe('with touch device', () => {
        beforeEach(() => {
          isTouchDevice.mockClear();
          isTouchDevice.mockReturnValue(true);
          props = createTestProps();
          wrapper = shallow(<DatePicker {...props} />);
          wrapper.instance().componentWillMount();
        });

        it('should not set a "formatDate"-function', () => {
          expect(wrapper.instance().options.formatDate).toBe(undefined);
        });
      });

      describe('when is for selecting a "date"', () => {
        beforeEach(() => {
          props = createTestProps({
            timeScale: 'date',
          });
          wrapper = shallow(<DatePicker {...props} />);
          wrapper.instance().componentWillMount();
        });

        it('should not enable the time picker', () => {
          expect(wrapper.instance().options.enableTime).toBe(false);
        });

        it('should display a calendar', () => {
          expect(wrapper.instance().options.noCalendar).toBe(false);
        });
      });

      describe('when is for selecting "date" and "time"', () => {
        beforeEach(() => {
          props = createTestProps({
            timeScale: 'datetime',
          });
          wrapper = shallow(<DatePicker {...props} />);
          wrapper.instance().componentWillMount();
        });

        it('should enable the time picker', () => {
          expect(wrapper.instance().options.enableTime).toBe(true);
        });

        it('should display a calendar', () => {
          expect(wrapper.instance().options.noCalendar).toBe(false);
        });

        describe('when is for selecting "time"', () => {
          beforeEach(() => {
            props = createTestProps({
              timeScale: 'time',
            });
            wrapper = shallow(<DatePicker {...props} />);
            wrapper.instance().componentWillMount();
          });

          it('should enable the time picker', () => {
            expect(wrapper.instance().options.enableTime).toBe(true);
          });

          it('should display a calendar', () => {
            expect(wrapper.instance().options.noCalendar).toBe(true);
          });
        });
      });
    });

    describe('componentDidMount', () => {
      let props;
      let wrapper;
      beforeEach(() => {
        Flatpickr.mockClear();
        isTouchDevice.mockClear();
        isTouchDevice.mockReturnValue(true);
        props = createTestProps();
        wrapper = shallow(<DatePicker {...props} />);
        wrapper.instance().componentDidMount();
      });

      it('should initialize flatpickr', () => {
        expect(Flatpickr).toHaveBeenCalledWith(
          undefined,
          expect.objectContaining({
            onClose: expect.any(Function),
          })
        );
      });
    });

    describe('componentWillUpdate', () => {
      let props;
      let wrapper;

      describe('when "value"-prop changes on an initialized flatpickr', () => {
        beforeEach(() => {
          props = createTestProps();
          wrapper = shallow(<DatePicker {...props} />);
          wrapper.instance().flatpickr = { setDate: jest.fn() };
          wrapper.instance().componentWillUpdate({ value: '20.10.2018' });
        });

        it('should update the date in flatpickr', () => {
          expect(wrapper.instance().flatpickr.setDate).toHaveBeenCalledWith(
            '20.10.2018',
            false
          );
        });
      });

      describe('when state indicates to initialize', () => {
        describe('when not disabled', () => {
          beforeEach(() => {
            props = createTestProps();
            wrapper = shallow(<DatePicker {...props} />);
            wrapper.instance().componentWillUpdate({}, { initialize: true });
          });

          afterEach(() => {
            Flatpickr.mockClear();
          });

          it('should initialize flatpickr', () => {
            expect(Flatpickr).toHaveBeenCalledWith(undefined, {
              ...wrapper.instance().options,
              onClose: expect.any(Function),
            });
          });
        });

        describe('when disabled', () => {
          beforeEach(() => {
            props = createTestProps({
              isDisabled: true,
            });
            wrapper = shallow(<DatePicker {...props} />);
            wrapper
              .instance()
              .componentWillUpdate({ isDisabled: true }, { initialize: true });
          });

          afterEach(() => {
            Flatpickr.mockClear();
          });

          it('should not initialize flatpickr', () => {
            expect(Flatpickr).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe('componentWillUnmount', () => {
      let props;
      let wrapper;

      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<DatePicker {...props} />);
        wrapper.instance().flatpickr = { destroy: jest.fn() };
        wrapper.instance().componentWillUnmount();
      });

      it('should destroy the flatpickr-instance', () => {
        expect(wrapper.instance().flatpickr.destroy).toHaveBeenCalled();
      });
    });
  });

  describe('rendering', () => {
    let wrapper;
    let props;

    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<DatePicker {...props} />);
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should contain DatePickerBody', () => {
      expect(wrapper).toRender('DatePickerBody');
    });

    describe('when scaling', () => {
      beforeEach(() => {
        props = createTestProps({
          size: 'scale',
        });
        wrapper = shallow(<DatePicker {...props} />);
      });

      it('should set "scale"-class on wrapper-div', () => {
        expect(wrapper.find('div')).toHaveClassName('scale');
      });

      it('should pass size "scale" to DatePickerBody', () => {
        expect(wrapper.find('DatePickerBody')).toHaveProp('size', 'scale');
      });
    });

    describe('formattedValue', () => {
      let datePickerBody;
      describe('with ranged values', () => {
        beforeEach(() => {
          props = createTestProps({
            value: ['2017-11-13T17:36:02.655Z', '2018-11-13T17:36:02.655Z'],
            mode: 'range',
            timeScale: 'date',
          });
          wrapper = shallow(<DatePicker {...props} />);
          datePickerBody = wrapper.find('DatePickerBody');
        });
        it('propagate formattedValue to `DatePickerBody`', () => {
          expect(datePickerBody).toHaveProp(
            'formattedValue',
            '11/13/2017 DatePicker.labelRange 11/13/2018'
          );
        });
      });
      describe('with multiple values', () => {
        beforeEach(() => {
          props = createTestProps({
            value: ['2017-11-13T17:36:02.655Z', '2018-11-13T17:36:02.655Z'],
            mode: 'multiple',
            timeScale: 'date',
          });
          wrapper = shallow(<DatePicker {...props} />);
          datePickerBody = wrapper.find('DatePickerBody');
        });
        it('propagate formattedValue to `DatePickerBody`', () => {
          expect(datePickerBody).toHaveProp(
            'formattedValue',
            '11/13/2017, 11/13/2018'
          );
        });
      });
      describe('with single value', () => {
        beforeEach(() => {
          props = createTestProps({
            value: '2017-11-13T17:36:02.655Z',
            mode: 'single',
            timeScale: 'date',
          });
          wrapper = shallow(<DatePicker {...props} />);
          datePickerBody = wrapper.find('DatePickerBody');
        });
        it('propagate formattedValue to `DatePickerBody`', () => {
          expect(datePickerBody).toHaveProp('formattedValue', '11/13/2017');
        });
      });
    });
  });

  describe('callbacks', () => {
    let props;
    let wrapper;
    describe('onClearPicker', () => {
      let flatPickrMock;
      beforeEach(() => {
        flatPickrMock = {
          clear: jest.fn(),
          jumpToDate: jest.fn(),
        };
        props = createTestProps();
        wrapper = shallow(<DatePicker {...props} />);
        wrapper.instance().flatpickr = flatPickrMock;
        wrapper
          .find('DatePickerBody')
          .props()
          .onClearPicker();
      });
      it('should call picker.clear', () => {
        expect(flatPickrMock.clear).toHaveBeenCalledTimes(1);
      });
      it('should call picker.jumpToDate', () => {
        expect(flatPickrMock.jumpToDate).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('interacting', () => {
    describe('handling change', () => {
      let props;
      let wrapper;

      describe('when in `single` mode', () => {
        beforeEach(() => {
          props = createTestProps();
          wrapper = shallow(<DatePicker {...props} />);
        });

        describe('with `selectedDates`', () => {
          const selectedDates = ['foo-date', 'bar-date'];
          beforeEach(() => {
            wrapper.instance().handleChange(selectedDates);
          });

          it('should invoke `onChange`', () => {
            expect(props.onChange).toHaveBeenCalled();
          });

          it('should invoke `onChange` with the first date', () => {
            expect(props.onChange).toHaveBeenCalledWith(selectedDates[0]);
          });
        });

        describe('with empty `selectedDates`', () => {
          beforeEach(() => {
            wrapper.instance().handleChange([]);
          });

          it('should invoke `onChange`', () => {
            expect(props.onChange).toHaveBeenCalled();
          });

          it('should invoke `onChange` with `undefined`', () => {
            expect(props.onChange).toHaveBeenCalledWith(undefined);
          });
        });
      });

      describe('when in `multiple` mode', () => {
        beforeEach(() => {
          props = createTestProps({ mode: 'multiple' });
          wrapper = shallow(<DatePicker {...props} />);
        });

        describe('with filled `selectedDates`', () => {
          const selectedDates = ['foo-date', 'bar-date'];
          beforeEach(() => {
            wrapper.instance().handleChange(selectedDates);
          });

          it('should invoke `onChange`', () => {
            expect(props.onChange).toHaveBeenCalled();
          });

          it('should invoke `onChange` with all dates', () => {
            expect(props.onChange).toHaveBeenCalledWith(selectedDates);
          });
        });

        describe('with empty `selectedDates`', () => {
          beforeEach(() => {
            wrapper.instance().handleChange([]);
          });

          it('should invoke `onChange`', () => {
            expect(props.onChange).toHaveBeenCalled();
          });

          it('should invoke `onChange` with all dates', () => {
            expect(props.onChange).toHaveBeenCalledWith([]);
          });
        });

        describe('when in `range` mode', () => {
          beforeEach(() => {
            props = createTestProps({ mode: 'range' });
            wrapper = shallow(<DatePicker {...props} />);
          });

          describe('with filled `selectedDates`', () => {
            const selectedDates = ['foo-date', 'bar-date'];
            beforeEach(() => {
              wrapper.instance().handleChange(selectedDates);
            });

            it('should invoke `onChange`', () => {
              expect(props.onChange).toHaveBeenCalled();
            });

            it('should invoke `onChange` with all dates', () => {
              expect(props.onChange).toHaveBeenCalledWith(selectedDates);
            });
          });

          describe('with empty `selectedDates`', () => {
            beforeEach(() => {
              wrapper.instance().handleChange([]);
            });

            it('should invoke `onChange`', () => {
              expect(props.onChange).toHaveBeenCalled();
            });

            it('should invoke `onChange` with all dates', () => {
              expect(props.onChange).toHaveBeenCalledWith([]);
            });
          });
        });
      });
    });

    describe('handling hover', () => {
      let props;
      let wrapper;

      describe('when hovering over wrapper', () => {
        beforeEach(() => {
          props = createTestProps();
          wrapper = shallow(<DatePicker {...props} />);
          wrapper.instance().handleMouseOver();
        });

        it('should change state for initialize to true', () => {
          expect(wrapper.state('initialize')).toBe(true);
        });
      });
    });
  });
});

describe('createFormatter', () => {
  let formatter;

  describe('with locale de', () => {
    describe('with date', () => {
      beforeEach(() => {
        formatter = createFormatter('date', 'de');
      });

      it('should format the date', () => {
        expect(formatter('2017-08-31T23:22:12.811')).toEqual('31.08.2017');
      });
    });

    describe('with datetime', () => {
      beforeEach(() => {
        formatter = createFormatter('datetime', 'de');
      });

      it('should format the datetime', () => {
        expect(formatter('2017-08-31T23:22:12.811')).toEqual(
          '31.08.2017 23:22'
        );
      });
    });

    describe('with time', () => {
      beforeEach(() => {
        formatter = createFormatter('time', 'de');
      });

      it('should format the datetime', () => {
        expect(formatter('23:22:12.811')).toEqual('23:22');
      });
    });
  });

  describe('with locale en', () => {
    describe('with date', () => {
      beforeEach(() => {
        formatter = createFormatter('date', 'en');
      });

      it('should format the date', () => {
        expect(formatter('2017-08-31T23:22:12.811')).toEqual('08/31/2017');
      });
    });

    describe('with datetime', () => {
      beforeEach(() => {
        formatter = createFormatter('datetime', 'en');
      });

      it('should format the datetime', () => {
        expect(formatter('2017-08-31T23:22:12.811')).toEqual(
          '08/31/2017 11:22 PM'
        );
      });
    });

    describe('with time', () => {
      beforeEach(() => {
        formatter = createFormatter('time', 'en');
      });

      it('should format the datetime', () => {
        expect(formatter('23:22:12.811')).toEqual('11:22 PM');
      });
    });
  });
});
