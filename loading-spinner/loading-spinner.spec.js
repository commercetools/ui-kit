import React from 'react';
import { shallow } from 'enzyme';
import LoadingSpinner from './loading-spinner';

describe('rendering', () => {
  let wrapper;
  let containerWrapper;
  beforeEach(() => {
    wrapper = shallow(<LoadingSpinner>{'Foo'}</LoadingSpinner>);
    containerWrapper = wrapper
      .find('Inline')
      .children()
      .at(0);
  });

  it('should render `Inline` component', () => {
    expect(wrapper).toRender('Inline');
  });

  it('should render LoadingSpinner container with "large" class by default', () => {
    expect(containerWrapper).toHaveClassName('container-large');
  });

  it('should render SVG with "large" class', () => {
    expect(containerWrapper.find('svg')).toHaveClassName('svg-large');
  });

  it('should render LoadingSpinner container with scale "l" by default', () => {
    expect(containerWrapper).toHaveClassName('container-large');
  });

  describe('when small', () => {
    beforeEach(() => {
      wrapper = shallow(<LoadingSpinner scale="s">{'Foo'}</LoadingSpinner>);
      containerWrapper = wrapper
        .find('Inline')
        .children()
        .at(0);
    });
    it('should render LoadingSpinner container with "small" class', () => {
      expect(containerWrapper).toHaveClassName('container-small');
    });

    it('should render SVG with "small" class', () => {
      expect(containerWrapper.find('svg')).toHaveClassName('svg-small');
    });
  });
});
