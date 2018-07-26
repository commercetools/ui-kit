import React from 'react';
import { shallow } from 'enzyme';
import Stamp from './stamp';

describe('rendering', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Stamp tone="positive">
        <div>{'Hello'}</div>
      </Stamp>
    );
  });

  it('should have class for a positive tone', () => {
    expect(wrapper).toHaveClassName('tone-positive');
  });

  it('should render InsetSquish', () => {
    expect(wrapper).toRender('InsetSquish');
  });

  it('should render InsetSquish with scale "s"', () => {
    expect(wrapper.find('InsetSquish')).toHaveProp('scale', 's');
  });

  it('should render given children', () => {
    expect(wrapper).toContainReact(<div>{'Hello'}</div>);
  });
});
