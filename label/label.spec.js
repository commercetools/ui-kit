import React from 'react';
import { shallow } from 'enzyme';
import RequiredIndicator from './required-indicator';
import Label from './label';

const createTestProps = customProps => ({
  value: 'Label value',
  ...customProps,
});

describe('rendering', () => {
  let props;
  let wrapper;
  let valueWrapper;

  describe('with value', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<Label {...props} />);
      valueWrapper = wrapper.find('TextBody');
    });

    it('should contain the label text', () => {
      expect(valueWrapper.dive()).toHaveText('Label value');
    });

    it('should not have bold text', () => {
      expect(valueWrapper).toHaveProp('isBold', false);
    });

    it('should contain text with no tone', () => {
      expect(valueWrapper).toHaveProp('tone', undefined);
    });

    describe('without bold text', () => {
      beforeEach(() => {
        props = createTestProps({ isBold: false });
        wrapper = shallow(<Label {...props} />);
        valueWrapper = wrapper.find('TextBody');
      });

      it('should contain bold text', () => {
        expect(valueWrapper).toHaveProp('isBold', false);
      });
    });

    describe('with tone', () => {
      beforeEach(() => {
        props = createTestProps({ tone: 'inverted' });
        wrapper = shallow(<Label {...props} />);
        valueWrapper = wrapper.find('TextBody');
      });

      it('should set the text tone', () => {
        expect(valueWrapper).toHaveProp('tone', 'inverted');
      });
    });
  });

  describe('with `required` state', () => {
    describe('when connected input is required', () => {
      beforeEach(() => {
        props = createTestProps({ isRequired: true });
        wrapper = shallow(<Label {...props} />);
      });

      it('should display an `*` in the label', () => {
        expect(wrapper).toRender(RequiredIndicator);
      });
    });

    describe('when labelled input is not required', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<Label {...props} />);
      });

      it('should display an `*` in the label', () => {
        expect(wrapper).not.toRender(RequiredIndicator);
      });
    });
  });
});
