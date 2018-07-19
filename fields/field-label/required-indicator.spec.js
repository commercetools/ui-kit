import React from 'react';
import { shallow } from 'enzyme';
import RequiredIndicator from './required-indicator';

describe('with default props', () => {
  it('should match snapshot', () => {
    expect(shallow(<RequiredIndicator />)).toMatchSnapshot();
  });
});

describe('when muted', () => {
  it('should match snapshot', () => {
    expect(shallow(<RequiredIndicator isMuted={true} />)).toMatchSnapshot();
  });
});
