import React from 'react';
import { shallow } from 'enzyme';
import Text from '../typography/text';
import RequiredIndicator from './required-indicator';
import Label from './label';

const createTestProps = customProps => ({
  children: 'Label children',
  ...customProps,
});

describe('rendering', () => {
  let props;
  let wrapper;
  let childrenWrapper;

  describe('with children', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<Label {...props} />);
      childrenWrapper = wrapper.find(Text.Body);
    });

    it('should contain the label text', () => {
      expect(childrenWrapper.dive()).toHaveText('Label children');
    });

    it('should not have bold text', () => {
      expect(childrenWrapper).toHaveProp('isBold', false);
    });

    it('should contain text with no tone', () => {
      expect(childrenWrapper).toHaveProp('tone', undefined);
    });

    describe('without bold text', () => {
      beforeEach(() => {
        props = createTestProps({ isBold: false });
        wrapper = shallow(<Label {...props} />);
        childrenWrapper = wrapper.find(Text.Body);
      });

      it('should contain bold text', () => {
        expect(childrenWrapper).toHaveProp('isBold', false);
      });
    });

    describe('with tone', () => {
      beforeEach(() => {
        props = createTestProps({ tone: 'inverted' });
        wrapper = shallow(<Label {...props} />);
        childrenWrapper = wrapper.find(Text.Body);
      });

      it('should set the text tone', () => {
        expect(childrenWrapper).toHaveProp('tone', 'inverted');
      });
    });
  });

  describe('with `required` state', () => {
    describe('when connected input is required', () => {
      beforeEach(() => {
        props = createTestProps({ isRequiredIndicatorVisible: true });
        wrapper = shallow(<Label {...props} />);
      });

      it('should display a `*` in the label', () => {
        expect(wrapper).toRender(RequiredIndicator);
      });
    });

    describe('when labelled input is not required', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<Label {...props} />);
      });

      it('should display a `*` in the label', () => {
        expect(wrapper).not.toRender(RequiredIndicator);
      });
    });
  });
});
