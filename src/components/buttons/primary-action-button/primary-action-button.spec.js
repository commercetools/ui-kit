import React from 'react';
import { shallow } from 'enzyme';
import { AddBoldIcon } from '../../icons';
import BaseButtonWrapper, { BaseButtonContent } from '../base-button-wrapper';
import PrimaryActionButton from './primary-action-button';

const createProps = custom => ({
  children: '',
  ariaLabel: 'add product',
  onClick: () => {},
  ...custom,
});

describe('rendering', () => {
  describe('PrimaryActionButton', () => {
    describe('wrapper', () => {
      let props;
      let wrapper;
      let buttonWrapper;
      beforeEach(() => {
        props = createProps({
          isToggled: false,
        });
        wrapper = shallow(<PrimaryActionButton {...props} />);
        buttonWrapper = wrapper.find(BaseButtonWrapper);
      });
      it('should render a <BaseButtonWrapper/>', () => {
        expect(wrapper).toRender(BaseButtonWrapper);
      });
      it('should supply `id`', () => {
        expect(buttonWrapper).toHaveProp('id', props.id);
      });
      it('should supply `name`', () => {
        expect(buttonWrapper).toHaveProp('name', props.name);
      });
      it('should supply `ariaLabel`', () => {
        expect(buttonWrapper).toHaveProp('ariaLabel', props.ariaLabel);
      });
      it('should supply `onClick`', () => {
        expect(buttonWrapper).toHaveProp('onClick', props.onClick);
      });

      it('should supply `isToggled`', () => {
        expect(buttonWrapper).toHaveProp('isToggled', props.isToggled);
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
          buttonWrapper = wrapper.find(BaseButtonWrapper);
        });
        it('should supply `dataAttr`', () => {
          expect(buttonWrapper).toHaveProp(
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

      describe('setting the button as active', () => {
        beforeEach(() => {
          props = createProps({ isToggled: true });
          wrapper = shallow(<PrimaryActionButton {...props} />);
          buttonWrapper = wrapper.find(BaseButtonWrapper);
        });

        it('should pass the `isToggled` prop', () => {
          expect(buttonWrapper).toHaveProp('isToggled', true);
        });
      });

      describe('setting the button as disabled', () => {
        beforeEach(() => {
          props = createProps({ isDisabled: true });
          wrapper = shallow(<PrimaryActionButton {...props} />);
          buttonWrapper = wrapper.find(BaseButtonWrapper);
        });

        it('should pass the `isDisabled` prop', () => {
          expect(buttonWrapper).toHaveProp('isDisabled', true);
        });
      });
    });
    describe('content', () => {
      let props;
      let wrapper;
      let buttonContent;
      beforeEach(() => {
        props = createProps({
          isToggled: true,
          size: 'big',
          icon: <AddBoldIcon />,
        });
        wrapper = shallow(<PrimaryActionButton {...props} />);
        buttonContent = wrapper.find(BaseButtonContent);
      });
      describe('with icon', () => {
        it('should render provided icon', () => {
          expect(buttonContent).toHaveProp('icon', props.icon);
        });
      });
      it('should supply `size` className', () => {
        expect(buttonContent).toHaveProp(
          'styles',
          expect.stringContaining(props.size)
        );
      });
      describe('setting the button as active', () => {
        beforeEach(() => {
          props = createProps({ isToggled: true, size: 'big' });
          wrapper = shallow(<PrimaryActionButton {...props} />);
          buttonContent = wrapper.find(BaseButtonContent);
        });

        it('should supply `active` className', () => {
          expect(buttonContent).toHaveProp(
            'styles',
            expect.stringContaining('active')
          );
        });
      });
      describe('setting the button as not active', () => {
        beforeEach(() => {
          props = createProps({ isToggled: false, size: 'big' });
          wrapper = shallow(<PrimaryActionButton {...props} />);
          buttonContent = wrapper.find(BaseButtonContent);
        });
        it('should not supply `active` className', () => {
          expect(buttonContent).not.toHaveProp(
            'styles',
            expect.stringContaining('active')
          );
        });
      });
      describe('setting the button as disabled', () => {
        beforeEach(() => {
          props = createProps({ isDisabled: true, size: 'big' });
          wrapper = shallow(<PrimaryActionButton {...props} />);
          buttonContent = wrapper.find(BaseButtonContent);
        });

        it('should supply `disabled` className', () => {
          expect(buttonContent).toHaveProp(
            'styles',
            expect.stringContaining('disabled')
          );
        });
      });
    });
  });
});

describe('callbacks', () => {
  describe('of `<PrimaryActionButton />`', () => {
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
