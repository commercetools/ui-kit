import React from 'react';
import { shallow } from 'enzyme';
import Text from '@commercetools-frontend/ui-kit/typography/text';
import RequiredIndicator from '@commercetools-frontend/ui-kit/fields/required-indicator';
import FieldLabel from './field-label';

const createTestProps = customProps => ({
  title: 'Label Title',
  ...customProps,
});

describe('rendering', () => {
  let props;
  let wrapper;
  let titleComp;
  let subTitleComp;

  describe('when label is not required', () => {
    describe('title', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<FieldLabel {...props} />);
        titleComp = wrapper.find(Text.Body).at(0);
      });

      it('should contain the correct text', () => {
        expect(titleComp.render().text()).toEqual('Label Title');
      });

      it('should contain bold text', () => {
        expect(titleComp).toHaveProp('isBold', true);
      });
    });

    describe('with subtitle', () => {
      beforeEach(() => {
        props = createTestProps({ subtitle: 'Label Subtitle' });
        wrapper = shallow(<FieldLabel {...props} />);
        subTitleComp = wrapper.find(Text.Body).at(1);
      });

      it('should be present', () => {
        expect(subTitleComp).toBeTruthy();
      });

      it('should contain the correct text', () => {
        expect(subTitleComp.render().text()).toEqual('Label Subtitle');
      });

      it('should be in `secondary` tone', () => {
        expect(subTitleComp).toHaveProp('tone', 'secondary');
      });
    });

    describe('without subtitle', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<FieldLabel {...props} />);
        subTitleComp = wrapper.find(Text.Body).get(1);
      });

      it('should not be present', () => {
        expect(subTitleComp).toBeFalsy();
      });
    });
  });

  describe('when label is required', () => {
    beforeEach(() => {
      props = createTestProps({ isRequired: true });
      wrapper = shallow(<FieldLabel {...props} />);
    });

    it('should display an `*` in the label', () => {
      expect(wrapper).toRender(RequiredIndicator);
    });
  });
});
