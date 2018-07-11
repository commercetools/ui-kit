import React from 'react';
import { shallow } from 'enzyme';
import { WarningIcon } from '@commercetools-frontend/ui-kit/icons';
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
  let subtitleIconWrapper;

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

  describe('with `titleIcon`', () => {
    describe('when titleIcon is given', () => {
      beforeEach(() => {
        props = createTestProps({ titleIcon: <IconButton size="big" /> });
        wrapper = shallow(<FieldLabel {...props} />);
        labelIconWrapper = wrapper.find(IconButton);
      });

      it('should display the icon', () => {
        expect(wrapper).toRender(IconButton);
      });

      it('should set the icon size', () => {
        expect(labelIconWrapper.prop('size')).toEqual('small');
      });
    });

    describe('without titleIcon', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<FieldLabel {...props} />);
      });

      it('should not display an icon', () => {
        expect(wrapper.prop('titleIcon')).toBeUndefined();
      });
    });
  });

  describe('with `subtitleIcon`', () => {
    describe('when subtitleIcon is given', () => {
      beforeEach(() => {
        props = createTestProps({ subtitleIcon: <WarningIcon /> });
        wrapper = shallow(<FieldLabel {...props} />);
        subtitleIconWrapper = wrapper.find(WarningIcon);
      });

      it('should display the icon', () => {
        expect(wrapper).toRender(WarningIcon);
      });

      it('should set the icon size', () => {
        expect(subtitleIconWrapper.prop('size')).toEqual('medium');
      });
    });

    describe('without subtitleIcon', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<FieldLabel {...props} />);
      });

      it('should not display an icon', () => {
        expect(wrapper.prop('subtitleIcon')).toBeUndefined();
      });
    });
  });
});
