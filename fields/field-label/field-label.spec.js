import React from 'react';
import { shallow } from 'enzyme';
import { WarningIcon } from '@commercetools-frontend/ui-kit/icons';
import FlatButton from '@commercetools-frontend/ui-kit/buttons/flat-button';
import IconButton from '@commercetools-frontend/ui-kit/buttons/icon-button';
import RequiredIndicator from './required-indicator';
import FieldLabel from './field-label';

const createTestProps = customProps => ({
  title: 'Label Title',
  ...customProps,
});

describe('rendering', () => {
  let props;
  let wrapper;
  let titleWrapper;
  let subTitleWrapper;
  let titleIconWrapper;
  let subtitleIconWrapper;
  let hintWrapper;

  describe('with title', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<FieldLabel {...props} />);
      titleWrapper = wrapper.find({ 'data-test-role': 'title' });
    });

    it('should contain the label text', () => {
      expect(titleWrapper.dive()).toHaveText('Label Title');
    });

    it('should not have bold text', () => {
      expect(titleWrapper).toHaveProp('isBold', false);
    });

    it('should contain text with no tone', () => {
      expect(titleWrapper).toHaveProp('tone', undefined);
    });

    describe('without bold text', () => {
      beforeEach(() => {
        props = createTestProps({ isBold: false });
        wrapper = shallow(<FieldLabel {...props} />);
        titleWrapper = wrapper.find({ 'data-test-role': 'title' });
      });

      it('should contain bold text', () => {
        expect(titleWrapper).toHaveProp('isBold', false);
      });
    });

    describe('with tone', () => {
      beforeEach(() => {
        props = createTestProps({ tone: 'inverted' });
        wrapper = shallow(<FieldLabel {...props} />);
        titleWrapper = wrapper.find({ 'data-test-role': 'title' });
      });

      it('should set the text tone', () => {
        expect(titleWrapper).toHaveProp('tone', 'inverted');
      });
    });
  });

  describe('with subtitle', () => {
    describe('when subtitle is given', () => {
      beforeEach(() => {
        props = createTestProps({ subtitle: 'Label Subtitle' });
        wrapper = shallow(<FieldLabel {...props} />);
        subTitleWrapper = wrapper.find({ 'data-test-role': 'subtitle' });
      });

      it('should be present', () => {
        expect(subTitleWrapper).toBeTruthy();
      });

      it('should contain the subtitle text', () => {
        expect(subTitleWrapper.render().text()).toEqual('Label Subtitle');
      });
    });

    describe('when subtitle is not given', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<FieldLabel {...props} />);
      });

      it('should not be present', () => {
        expect(wrapper).not.toRender({ 'data-test-role': 'subtitle' });
      });
    });
  });

  describe('with hint', () => {
    describe('when hint is given', () => {
      beforeEach(() => {
        props = createTestProps({ hint: 'Label hint' });
        wrapper = shallow(<FieldLabel {...props} />);
        hintWrapper = wrapper.find({ 'data-test-role': 'hint' });
      });

      it('should be present', () => {
        expect(hintWrapper).toBeTruthy();
      });

      it('should contain the hint text', () => {
        expect(hintWrapper.render().text()).toEqual('Label hint');
      });
    });

    describe('when hint is not given', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<FieldLabel {...props} />);
      });

      it('should not be present', () => {
        expect(wrapper).not.toRender({ 'data-test-role': 'hint' });
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

    describe('when labelled input is not required', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<FieldLabel {...props} />);
      });

      it('should display an `*` in the label', () => {
        expect(wrapper).not.toRender(RequiredIndicator);
      });
    });
  });

  describe('with `titleIconButton`', () => {
    describe('when titleIconButton is given', () => {
      beforeEach(() => {
        props = createTestProps({ titleIconButton: <IconButton size="big" /> });
        wrapper = shallow(<FieldLabel {...props} />);
        titleIconWrapper = wrapper.find(IconButton);
      });

      it('should display the icon', () => {
        expect(wrapper).toRender(IconButton);
      });

      it('should set the icon size', () => {
        expect(titleIconWrapper.prop('size')).toEqual('small');
      });
    });

    describe('when titleIcon is not given', () => {
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

    describe('when subtitleIcon is not given', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<FieldLabel {...props} />);
      });

      it('should not display an icon', () => {
        expect(wrapper.prop('subtitleIcon')).toBeUndefined();
      });
    });
  });

  describe('with `badge`', () => {
    describe('when badge is given', () => {
      beforeEach(() => {
        props = createTestProps({ badge: <FlatButton /> });
        wrapper = shallow(<FieldLabel {...props} />);
      });

      it('should display the badge', () => {
        expect(wrapper).toRender(FlatButton);
      });
    });
  });
});
