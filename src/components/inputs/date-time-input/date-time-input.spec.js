import React from 'react';
import { shallow } from 'enzyme';
import isTouchDevice from 'is-touch-device';
import { DateTimeInput } from './date-time-input';

jest.mock('flatpickr');
jest.mock('is-touch-device');

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

describe('<DateTimeInput />', () => {
  beforeEach(() => {
    isTouchDevice.mockClear();
    isTouchDevice.mockReturnValue(false);
  });
  it('should render', () => {
    expect(shallow(<DateTimeInput {...createTestProps()} />)).toMatchSnapshot();
  });
});
