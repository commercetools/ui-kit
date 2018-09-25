import React from 'react';
import { shallow } from 'enzyme';
import WarningMessage from './warning-message';

describe('rendering', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <WarningMessage>
        <div>hi</div>
      </WarningMessage>
    );
  });
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
