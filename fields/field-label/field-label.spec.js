import React from 'react';
import { shallow } from 'enzyme';
import { WarningIcon } from '@commercetools-frontend/ui-kit/icons';
import FlatButton from '../../buttons/flat-button';
import IconButton from '../../buttons/icon-button';
import FieldLabel from './field-label';

const createTestProps = customProps => ({
  title: 'Label Title',
  ...customProps,
});

describe('rendering', () => {
  let props;
  let wrapper;
  let titleWrapper;
  let hintWrapper;
  let titleIconWrapper;
  let hintIconWrapper;

  describe('with title', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<FieldLabel {...props} />);
      titleWrapper = wrapper.find('Label');
    });

    it('should pass label text', () => {
      expect(titleWrapper).toHaveProp('children', 'Label Title');
    });

    it('should pass no bold text', () => {
      expect(titleWrapper).toHaveProp('isBold', false);
    });

    it('should pass text with no tone', () => {
      expect(titleWrapper).toHaveProp('tone', undefined);
    });

    describe('without bold text', () => {
      beforeEach(() => {
        props = createTestProps({ isBold: false });
        wrapper = shallow(<FieldLabel {...props} />);
        titleWrapper = wrapper.find('Label');
      });

      it('should not pass bold text', () => {
        expect(titleWrapper).toHaveProp('isBold', false);
      });
    });

    describe('with tone', () => {
      beforeEach(() => {
        props = createTestProps({ tone: 'inverted' });
        wrapper = shallow(<FieldLabel {...props} />);
        titleWrapper = wrapper.find('Label');
      });

      it('should pass the correct text tone', () => {
        expect(titleWrapper).toHaveProp('tone', 'inverted');
      });
    });
  });

  describe('with hint', () => {
    describe('when hint is given', () => {
      beforeEach(() => {
        props = createTestProps({ hint: 'Label hint' });
        wrapper = shallow(<FieldLabel {...props} />);
        hintWrapper = wrapper.find({ className: 'hint' });
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
        expect(wrapper).not.toRender({ className: 'hint' });
      });
    });
  });

  describe('with `hasRequiredIndicator`', () => {
    describe('when connected input has required indicator', () => {
      beforeEach(() => {
        props = createTestProps({ hasRequiredIndicator: true });
        wrapper = shallow(<FieldLabel {...props} />);
        titleWrapper = wrapper.find('Label');
      });

      it('should pass hasRequiredIndicator', () => {
        expect(titleWrapper).toHaveProp('isRequiredIndicatorVisible', true);
      });
    });

    describe('when labeled input has not required indicator', () => {
      beforeEach(() => {
        props = createTestProps({ hasRequiredIndicator: false });
        wrapper = shallow(<FieldLabel {...props} />);
        titleWrapper = wrapper.find('Label');
      });

      it('should not pass hasRequiredIndicator', () => {
        expect(titleWrapper).toHaveProp('isRequiredIndicatorVisible', false);
      });
    });
  });

  describe('with `button`', () => {
    describe('when button is given', () => {
      beforeEach(() => {
        props = createTestProps({ button: <IconButton size="big" /> });
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

  describe('with `hintIcon`', () => {
    describe('when hintIcon is given', () => {
      beforeEach(() => {
        props = createTestProps({ hintIcon: <WarningIcon /> });
        wrapper = shallow(<FieldLabel {...props} />);
        hintIconWrapper = wrapper.find(WarningIcon);
      });

      it('should display the icon', () => {
        expect(wrapper).toRender(WarningIcon);
      });

      it('should set the icon size', () => {
        expect(hintIconWrapper.prop('size')).toEqual('medium');
      });
    });

    describe('when hintIcon is not given', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<FieldLabel {...props} />);
      });

      it('should not display an icon', () => {
        expect(wrapper.prop('hintIcon')).toBeUndefined();
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
