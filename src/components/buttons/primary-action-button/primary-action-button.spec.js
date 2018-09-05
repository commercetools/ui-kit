import React from 'react';
import { shallow } from 'enzyme';
import { AddBoldIcon } from '../../icons';
import BaseButtonWrapper from '../base-button-wrapper';
import PrimaryActionButton, { ButtonContent } from './primary-action-button';

const createProps = custom => ({
  children: '',
  ariaLabel: 'add product',
  onClick: () => {},
  ...custom,
});

describe('rendering', () => {
  describe('BaseButtonWrapper', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createProps({
        isToggled: false,
      });
      wrapper = shallow(<PrimaryActionButton {...props} />);
    });
    it('should render a <BaseButtonWrapper/>', () => {
      expect(wrapper).toRender('BaseButtonWrapper');
    });

    it('should supply `onClick` to `BaseButtonWrapper`', () => {
      expect(wrapper.find(BaseButtonWrapper)).toHaveProp(
        'onClick',
        props.onClick
      );
    });

    it('should supply `isToggled` to `BaseButtonWrapper`', () => {
      expect(wrapper.find(BaseButtonWrapper)).toHaveProp(
        'isToggled',
        props.isToggled
      );
    });

    it('should supply `ariaLabel` to `BaseButtonWrapper`', () => {
      expect(wrapper.find(BaseButtonWrapper)).toHaveProp(
        'ariaLabel',
        props.ariaLabel
      );
    });

    it('should supply `size` to `BaseButtonWrapper', () => {
      // console.log('xxx', wrapper.find(BaseButtonWrapper));
      expect(wrapper.find(BaseButtonWrapper)).toHaveProp('size', 'big');
    });

    describe('with data-* props', () => {
      beforeEach(() => {
        props = createProps({
          dataAttr: {
            'data-track-component': 'PrimaryActionButton',
            'data-track-label': 'PrimaryActionButton',
            'data-track-event': 'click',
            'data-test': 'data-test-primary',
          },
        });
        wrapper = shallow(<PrimaryActionButton {...props} />);
      });
      it('should supply `dataAttr` to BaseButtonWrapper', () => {
        expect(wrapper.find(BaseButtonWrapper)).toHaveProp(
          'dataAttr',
          expect.objectContaining({
            'data-track-component': 'PrimaryActionButton',
            'data-track-label': 'PrimaryActionButton',
            'data-track-event': 'click',
            'data-test': 'data-test-primary',
          })
        );
      });
    });

    describe('with icon', () => {
      beforeEach(() => {
        props = createProps({
          icon: <AddBoldIcon />,
        });
        wrapper = shallow(<PrimaryActionButton {...props} />);
      });
      it('should supply `icon` to BaseButtonWrapper', () => {
        expect(wrapper.find(BaseButtonWrapper)).toHaveProp(
          'icon',
          <AddBoldIcon />
        );
      });
    });

    describe('setting the button as active', () => {
      let button;
      beforeEach(() => {
        props = createProps({ isToggled: true });
        wrapper = shallow(<PrimaryActionButton {...props} />);
        button = wrapper.find(BaseButtonWrapper);
      });

      it('should pass the `isToggled` prop to `BaseButtonWrapper`', () => {
        expect(button).toHaveProp('isToggled', true);
      });
    });

    describe('setting the button as disabled', () => {
      let button;

      beforeEach(() => {
        props = createProps({ isDisabled: true });
        wrapper = shallow(<PrimaryActionButton {...props} />);
        button = wrapper.find(BaseButtonWrapper);
      });

      it('should pass the `isToggled` prop to `BaseButtonWrapper`', () => {
        expect(button).toHaveProp('isDisabled', true);
      });
    });
  });
  describe('ButtonContent', () => {
    describe('setting the button as active', () => {
      let props;
      let wrapper;
      beforeEach(() => {
        props = createProps({ isToggled: true, size: 'big' });
        wrapper = shallow(<ButtonContent {...props} />);
      });

      it('should button have the active className', () => {
        expect(wrapper).toContainClass('active');
      });
    });
    describe('setting the button as not active', () => {
      let props;
      let wrapper;
      beforeEach(() => {
        props = createProps({ isToggled: false, size: 'big' });
        wrapper = shallow(<ButtonContent {...props} />);
      });

      it('should the button not contain the active className', () => {
        expect(wrapper).not.toContainClass('active');
      });
    });
    describe('setting the button as disabled', () => {
      let props;
      let wrapper;
      beforeEach(() => {
        props = createProps({ isDisabled: true });
        wrapper = shallow(<ButtonContent {...props} />);
      });

      it('should button have the disabled className', () => {
        expect(wrapper).toHaveClassName('disabled');
      });
    });
  });
});

describe('callbacks', () => {
  describe('of `<BaseButtonWrapper />`', () => {
    describe('onClick', () => {
      let props;
      let wrapper;

      beforeEach(() => {
        props = createProps({ onClick: jest.fn() });
        wrapper = shallow(<PrimaryActionButton {...props} />);

        wrapper.find(BaseButtonWrapper).prop('onClick')();
      });

      it('should call the onClick callback', () => {
        expect(props.onClick).toHaveBeenCalledTimes(1);
      });
    });
  });
});
