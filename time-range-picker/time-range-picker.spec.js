import React from 'react';
import { shallow } from 'enzyme';
import DatePicker from '../date-picker';
import TimeRangePicker from './time-range-picker';

const createTestProps = custom => ({
  value: { from: '10:00:00.000', to: '15:30:00.000' },
  onChange: jest.fn(),
  timeZone: 'Europe/Madrid',
  ...custom,
});

describe('TimeRangePicker', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<TimeRangePicker {...props} />);
  });
  describe('rendering', () => {
    it('should render two DatePickers', () => {
      expect(wrapper).toRenderElementTimes(DatePicker, 2);
    });
    it('should configer the DatePickers as single pickers', () => {
      expect(wrapper.find(DatePicker).at(0)).toHaveProp('mode', 'single');
      expect(wrapper.find(DatePicker).at(1)).toHaveProp('mode', 'single');
    });
    it('should configer the DatePickers as time pickers', () => {
      expect(wrapper.find(DatePicker).at(0)).toHaveProp('timeScale', 'time');
      expect(wrapper.find(DatePicker).at(1)).toHaveProp('timeScale', 'time');
    });
  });

  describe('interaction', () => {
    describe('when changing the from time', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<TimeRangePicker {...props} />);
        wrapper
          .find(DatePicker)
          .at(0)
          .prop('onChange')('10:13:00.000');
      });
      it('should call onChange with the changed from time', () => {
        expect(props.onChange).toHaveBeenLastCalledWith({
          from: '10:13:00.000',
          to: '15:30:00.000',
        });
      });
    });
    describe('when unsetting the from time', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<TimeRangePicker {...props} />);
        wrapper
          .find(DatePicker)
          .at(0)
          .prop('onChange')();
      });
      it('should call onChange with undefined as from time', () => {
        expect(props.onChange).toHaveBeenLastCalledWith({
          from: undefined,
          to: '15:30:00.000',
        });
      });
    });
  });
});
