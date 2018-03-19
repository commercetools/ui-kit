import React from 'react';
import { shallow } from 'enzyme';
import ErrorMessage from './error-message';

describe('rendering', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <ErrorMessage>
        <div>hi</div>
      </ErrorMessage>
    );
  });
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
