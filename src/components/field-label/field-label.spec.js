import React from 'react';
import { shallow } from 'enzyme';
import { WarningIcon } from '../icons';
import Label from '../label';
import Text from '../typography/text';
import FlatButton from '../buttons/flat-button';
import IconButton from '../buttons/icon-button';
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
  let hintIconWrapper;

  describe('with title', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<FieldLabel {...props} />);
      titleWrapper = wrapper.find(Label);
    });

    it('should pass label text', () => {
      expect(titleWrapper).toHaveProp('children', 'Label Title');
    });
  });

  describe('with hint', () => {
    describe('when hint is given', () => {
      beforeEach(() => {
        props = createTestProps({ hint: 'Label hint' });
        wrapper = shallow(<FieldLabel {...props} />);
        hintWrapper = wrapper.find(Text.Detail);
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should contain the hint text', () => {
        expect(hintWrapper.dive()).toHaveText('Label hint');
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
        titleWrapper = wrapper.find(Label);
      });

      it('should pass hasRequiredIndicator', () => {
        expect(titleWrapper).toHaveProp('isRequiredIndicatorVisible', true);
      });
    });

    describe('when input has not required indicator', () => {
      beforeEach(() => {
        props = createTestProps({ hasRequiredIndicator: false });
        wrapper = shallow(<FieldLabel {...props} />);
        titleWrapper = wrapper.find(Label);
      });

      it('should not pass hasRequiredIndicator', () => {
        expect(titleWrapper).toHaveProp('isRequiredIndicatorVisible', false);
      });
    });
  });

  describe('with `onInfoButtonClick`', () => {
    describe('when onInfoButtonClick is given', () => {
      beforeEach(() => {
        props = createTestProps({ onInfoButtonClick: jest.fn() });
        wrapper = shallow(<FieldLabel {...props} />);
      });

      it('should render a button', () => {
        expect(wrapper).toRender(IconButton);
      });
    });
  });

  describe('with `hintIcon`', () => {
    describe('when hintIcon is given', () => {
      beforeEach(() => {
        props = createTestProps({ hint: 'foo', hintIcon: <WarningIcon /> });
        wrapper = shallow(<FieldLabel {...props} />);
        hintIconWrapper = wrapper.find(WarningIcon);
      });

      it('should display the icon', () => {
        expect(wrapper).toRender(WarningIcon);
      });

      it('should set the icon size', () => {
        expect(hintIconWrapper).toHaveProp('size', 'medium');
      });

      describe('with custom theme', () => {
        beforeEach(() => {
          props = createTestProps({
            hint: 'foo',
            hintIcon: <WarningIcon theme="green" />,
          });
          wrapper = shallow(<FieldLabel {...props} />);
          hintIconWrapper = wrapper.find(WarningIcon);
        });

        it('should set the icon theme', () => {
          expect(hintIconWrapper).toHaveProp('theme', 'green');
        });
      });
    });

    describe('when hintIcon is not given', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<FieldLabel {...props} />);
      });

      it('should not display an icon', () => {
        expect(wrapper).not.toRender('hintIcon');
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

describe('callbacks', () => {
  describe(`onInfoButtonClick`, () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createTestProps({ onInfoButtonClick: jest.fn() });
      wrapper = shallow(<FieldLabel {...props} />);
      wrapper.find(IconButton).simulate('click');
    });

    it('should call the function', () => {
      expect(props.onInfoButtonClick).toHaveBeenCalled();
    });
  });
});
