import React from 'react';
import { shallow } from 'enzyme';
import Flatpickr from 'flatpickr';
import isTouchDevice from 'is-touch-device';
import { German } from 'flatpickr/dist/l10n/de';
import {
  DatePicker,
  createFormatter,
  presentInput,
  presentOutput,
} from './date-picker';

jest.mock('flatpickr', () => jest.fn());
jest.mock('is-touch-device', () => jest.fn());

// user is in London
// eslint-disable-next-line no-extend-native
Date.prototype.getTimezoneOffset = () => 0;

// but she wants to see time in Mardid time zone
const timeZone = 'Europe/Madrid';

const createTestProps = custom => ({
  onChange: jest.fn(),
  value: null,
  placeholder: 'test',
  intl: { formatMessage: jest.fn(message => message.id), locale: 'en' },
  timeZone,
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

    it('should have "scale" as `horizontalConstraint`-prop', () => {
      expect(DatePicker.defaultProps.horizontalConstraint).toBe('scale');
    });
  });

  describe('lifecycle', () => {
    let wrapper;
    let props;

    describe('when shouldInitializeOnMount is true', () => {
      beforeEach(() => {
        props = createTestProps({ shouldInitializeOnMount: true });
        wrapper = shallow(<DatePicker {...props} />);
      });
      it('should have initial state with "initialize" set to true', () => {
        expect(wrapper).toHaveState('initialize', true);
      });
    });

    describe('when shouldInitializeOnMount is false', () => {
      beforeEach(() => {
        props = createTestProps({ shouldInitializeOnMount: false });
        wrapper = shallow(<DatePicker {...props} />);
      });
      it('should have initial state with "initialize" set to false', () => {
        expect(wrapper).toHaveState('initialize', false);
      });
    });

    describe('componentWillMount', () => {
      describe('without locale', () => {
        beforeEach(() => {
          props = createTestProps();
          wrapper = shallow(<DatePicker {...props} />);
          wrapper.instance().UNSAFE_componentWillMount();
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
            intl: {
              formatMessage: jest.fn(message => message.id),
              locale: 'de',
            },
          });
          wrapper = shallow(<DatePicker {...props} />);
          wrapper.instance().UNSAFE_componentWillMount();
        });

        it('should create options object with the appropriate localization', () => {
          expect(wrapper.instance().options).toEqual(
            expect.objectContaining({ locale: German, time_24hr: true })
          );
        });
      });

      describe('with touch device', () => {
        beforeEach(() => {
          isTouchDevice.mockClear();
          isTouchDevice.mockReturnValue(true);
          props = createTestProps();
          wrapper = shallow(<DatePicker {...props} />);
          wrapper.instance().UNSAFE_componentWillMount();
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
          wrapper.instance().UNSAFE_componentWillMount();
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
          wrapper.instance().UNSAFE_componentWillMount();
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
            wrapper.instance().UNSAFE_componentWillMount();
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

    describe('UNSAFE_componentWillUpdate(', () => {
      describe('when "value"-prop changes on an initialized flatpickr', () => {
        beforeEach(() => {
          props = createTestProps();
          wrapper = shallow(<DatePicker {...props} />);
          wrapper.instance().flatpickr = { setDate: jest.fn() };
          wrapper
            .instance()
            .UNSAFE_componentWillUpdate({ value: '20.10.2018' });
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
            wrapper
              .instance()
              .UNSAFE_componentWillUpdate({}, { initialize: true });
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
              .UNSAFE_componentWillUpdate(
                { isDisabled: true },
                { initialize: true }
              );
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
            '11/13/2017 UIKit.DatePicker.labelRange 11/13/2018'
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
      it('should call onChange without a value', () => {
        expect(props.onChange).toHaveBeenCalledTimes(1);
        expect(props.onChange).toHaveBeenLastCalledWith();
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
          const selectedDates = [
            new Date('2017-01-01'),
            new Date('2017-02-01'),
          ];
          beforeEach(() => {
            wrapper.instance().handleChange(selectedDates);
          });

          it('should invoke `onChange`', () => {
            expect(props.onChange).toHaveBeenCalled();
          });

          it('should invoke `onChange` with the first date', () => {
            expect(props.onChange).toHaveBeenCalledWith('2017-01-01');
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
          const selectedDates = ['2017-01-01', '2017-02-01'];
          beforeEach(() => {
            wrapper.instance().handleChange(selectedDates);
          });

          it('should invoke `onChange`', () => {
            expect(props.onChange).toHaveBeenCalled();
          });

          it('should invoke `onChange` with all dates', () => {
            expect(props.onChange).toHaveBeenCalledWith([
              '2017-01-01',
              '2017-02-01',
            ]);
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
            const selectedDates = ['2017-01-01', '2017-02-01'];
            beforeEach(() => {
              wrapper.instance().handleChange(selectedDates);
            });

            it('should invoke `onChange`', () => {
              expect(props.onChange).toHaveBeenCalled();
            });

            it('should invoke `onChange` with all dates', () => {
              expect(props.onChange).toHaveBeenCalledWith([
                '2017-01-01',
                '2017-02-01',
              ]);
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
        formatter = createFormatter('date', 'de', timeZone);
      });

      it('should format the date', () => {
        expect(formatter('2017-08-31T23:22:12.811')).toEqual('31.08.2017');
      });
    });

    describe('with datetime', () => {
      beforeEach(() => {
        formatter = createFormatter('datetime', 'de', timeZone);
      });

      it('should format the datetime', () => {
        expect(formatter('2017-08-31T23:22:12.811')).toEqual(
          '31.08.2017 23:22'
        );
      });
    });

    describe('with time', () => {
      beforeEach(() => {
        formatter = createFormatter('time', 'de', timeZone);
      });

      it('should format the datetime', () => {
        expect(formatter('23:22:12.811')).toEqual('23:22');
      });
    });
  });

  describe('with locale en', () => {
    describe('with date', () => {
      beforeEach(() => {
        formatter = createFormatter('date', 'en', timeZone);
      });

      it('should format the date', () => {
        expect(formatter('2017-08-31T23:22:12.811')).toEqual('08/31/2017');
      });
    });

    describe('with datetime', () => {
      beforeEach(() => {
        formatter = createFormatter('datetime', 'en', timeZone);
      });

      it('should format the datetime', () => {
        expect(formatter('2017-08-31T23:22:12.811')).toEqual(
          '08/31/2017 11:22 PM'
        );
      });
    });

    describe('with time', () => {
      beforeEach(() => {
        formatter = createFormatter('time', 'en', timeZone);
      });

      it('should format the datetime', () => {
        expect(formatter('23:22:12.811')).toEqual('11:22 PM');
      });
    });
  });
});

describe('presentInput', () => {
  ['time', 'date'].forEach(timeScale => {
    describe(`with timeScale="${timeScale}"`, () => {
      const value = '2017-08-31T23:22:12.811Z';

      it('should leave input value as it is', () => {
        expect(
          presentInput({ value, timeScale, timeZone, mode: 'single' })
        ).toEqual(value);
      });
    });
  });

  describe('with timeScale="datetime"', () => {
    const timeScale = 'datetime';

    describe('with mode="single"', () => {
      const mode = 'single';
      const value = '2017-08-31T23:22:12.811Z';

      it('should shift value by timeZone UTC offset', () => {
        expect(presentInput({ value, timeScale, timeZone, mode })).toEqual(
          '2017-09-01T01:22:12.811Z'
        );
      });
    });

    ['multiple', 'range'].forEach(mode => {
      describe(`with mode="${mode}"`, () => {
        const value = ['2017-08-31T23:22:12.811Z', '2017-09-20T10:00:00.000Z'];

        it('should shift all values by timeZone UTC offset', () => {
          expect(presentInput({ value, timeScale, timeZone, mode })).toEqual([
            '2017-09-01T01:22:12.811Z',
            '2017-09-20T12:00:00.000Z',
          ]);
        });
      });
    });
  });
});

describe('presentOutput', () => {
  describe('with timeScale="time"', () => {
    const value = new Date('Thu Aug 31 2017 12:34:56:789');

    it('should present time part only, without shifting timezone', () => {
      expect(presentOutput({ value, timeScale: 'time', timeZone })).toEqual(
        '12:34:56.789'
      );
    });
  });

  describe('with timeScale="date"', () => {
    const value = new Date('Thu Aug 31 2017 00:00:00:000');

    it('should present date part only, without shifting timezone', () => {
      expect(presentOutput({ value, timeScale: 'date', timeZone })).toEqual(
        '2017-08-31'
      );
    });
  });

  describe('with timeScale="datetime"', () => {
    const value = new Date('2017-08-31T00:00:00.000Z');

    it('should present datetime as ISO8910 and shift timezone', () => {
      expect(presentOutput({ value, timeScale: 'datetime', timeZone })).toEqual(
        '2017-08-30T22:00:00.000Z'
      );
    });
  });
});
