import React from 'react';
import { shallow } from 'enzyme';
import IconButton from '@commercetools-frontend/ui-kit/buttons/icon-button';
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
  let labelIconWrapper;

  describe('with title', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<FieldLabel {...props} />);
      titleComp = wrapper.find(Text.Body);
    });

    it('should contain the label text', () => {
      expect(titleComp.render().text()).toEqual('Label Title');
    });

    it('should contain bold text', () => {
      expect(titleComp).toHaveProp('isBold', true);
    });
  });

  describe('with subtitle', () => {
    describe('when subtitle is given', () => {
      beforeEach(() => {
        props = createTestProps({ subtitle: 'Label Subtitle' });
        wrapper = shallow(<FieldLabel {...props} />);
        subTitleComp = wrapper.find(Text.Detail);
      });

      it('should be present', () => {
        expect(subTitleComp).toBeTruthy();
      });

      it('should contain the subtitle text', () => {
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
      });

      it('should not be present', () => {
        expect(wrapper).not.toRender(Text.Detail);
      });
    });
  });

  describe('with `required` status', () => {
    describe('when connected input is required', () => {
      beforeEach(() => {
        props = createTestProps({ isRequired: true });
        wrapper = shallow(<FieldLabel {...props} />);
      });

      it('should display an `*` in the label', () => {
        expect(wrapper).toRender(RequiredIndicator);
      });
    });

    describe('when connected input is not required', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<FieldLabel {...props} />);
      });

      it('should display an `*` in the label', () => {
        expect(wrapper).not.toRender(RequiredIndicator);
      });
    });
  });

  describe('with `InformationIcon`', () => {
    describe('when label should show icon', () => {
      beforeEach(() => {
        props = createTestProps({ hasIcon: true });
        wrapper = shallow(<FieldLabel {...props} />);
      });

      it('should display an `InformationIcon`', () => {
        expect(wrapper).toRender(IconButton);
      });
    });

    describe('when label icon has action', () => {
      beforeEach(() => {
        props = createTestProps({
          hasIcon: true,
          onIconClick: jest.fn(() => 'Label icon clicked'),
        });
        wrapper = shallow(<FieldLabel {...props} />);
        labelIconWrapper = wrapper.find(IconButton);
      });

      it('label icon action should be executed', () => {
        expect(labelIconWrapper.prop('onClick')()).toEqual(
          'Label icon clicked'
        );
      });
    });
  });
});
