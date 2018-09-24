import React from 'react';
import { shallow } from 'enzyme';
import { AddBoldIcon } from '../../icons';
import PrimaryButton from './primary-action-button';

const createProps = custom => ({
  label: '',
  'aria-label': '',
  onClick: () => {},
  ...custom,
});

describe('rendering', () => {
  describe('button', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createProps();
      wrapper = shallow(<PrimaryButton {...props} />);
    });
    it('should render a <button/>', () => {
      expect(wrapper).toRender('button');
    });

    it('should supply `onClick` to `button`', () => {
      expect(wrapper.find('button')).toHaveProp('onClick', props.onClick);
    });

    it('should contain a div for flexbox styling', () => {
      expect(wrapper.find('div')).toContainClass('big');
    });

    describe('with aria-* props', () => {
      beforeEach(() => {
        props = createProps({
          label: 'close the modal',
          'aria-hidden': false,
          isDisabled: true,
        });
        wrapper = shallow(<PrimaryButton {...props} />);
      });
      it('should supply `aria-label` to `button`', () => {
        expect(wrapper.find('button')).toHaveProp('aria-label', props.label);
      });
      it('should supply `aria-hidden` to `button`', () => {
        expect(wrapper.find('button')).toHaveProp(
          'aria-hidden',
          props['aria-hidden']
        );
      });
      it('should supply `aria-disabled` to `button`', () => {
        expect(wrapper.find('button')).toHaveProp('aria-disabled', true);
      });
    });

    describe('with data-* props', () => {
      beforeEach(() => {
        props = createProps({
          'data-track-component': 'PrimaryButton',
          'data-track-label': 'PrimaryButton',
          'data-track-event': 'click',
          'data-test': 'data-test-primary',
        });
        wrapper = shallow(<PrimaryButton {...props} />);
      });
      it('should apply given `data-track-component` to button', () => {
        expect(wrapper).toHaveProp('data-track-component', 'PrimaryButton');
      });
      it('should apply given `data-track-event` to button', () => {
        expect(wrapper).toHaveProp('data-track-event', 'click');
      });
      it('should apply given `data-track-label` to button', () => {
        expect(wrapper).toHaveProp('data-track-label', 'PrimaryButton');
      });
      it('should apply given `data-test` to button', () => {
        expect(wrapper).toHaveProp('data-test', 'data-test-primary');
      });
    });

    describe('with icon', () => {
      beforeEach(() => {
        props = createProps({
          iconLeft: <AddBoldIcon />,
        });
        wrapper = shallow(<PrimaryButton {...props} />);
      });

      it('should render an icon', () => {
        expect(wrapper).toRender(AddBoldIcon);
      });

      describe('with icon size big', () => {
        beforeEach(() => {
          props = createProps({
            iconLeft: <AddBoldIcon size="big" />,
          });
          wrapper = shallow(<PrimaryButton {...props} />);
        });

        it('should not overwrite the Icon size', () => {
          expect(wrapper.find(AddBoldIcon)).toHaveProp('size', 'big');
        });
      });

      describe('when disabled', () => {
        beforeEach(() => {
          props = createProps({
            isDisabled: true,
            iconLeft: <AddBoldIcon />,
          });
          wrapper = shallow(<PrimaryButton {...props} />);
        });
        it('should apply the grey theme to the icon', () => {
          expect(wrapper.find(AddBoldIcon)).toHaveProp('theme', 'grey');
        });
      });

      describe('when enabled', () => {
        beforeEach(() => {
          props = createProps({
            iconLeft: <AddBoldIcon theme="red" />,
          });
          wrapper = shallow(<PrimaryButton {...props} />);
        });

        it('should overwrite the Icon theme to be white', () => {
          expect(wrapper.find(AddBoldIcon)).toHaveProp('theme', 'white');
        });
      });
    });
    describe('setting the button as active', () => {
      beforeEach(() => {
        props = createProps({ isToggled: true });
        wrapper = shallow(<PrimaryButton {...props} />);
      });

      it('should render the button in the active state', () => {
        expect(wrapper.find('div')).toContainClass('active');
      });
    });
    describe('setting the button as not active', () => {
      beforeEach(() => {
        props = createProps({ isToggled: false });
        wrapper = shallow(<PrimaryButton {...props} />);
      });

      it('should not render the button in the non active state', () => {
        expect(wrapper.find('div')).not.toContainClass('active');
      });
    });
    describe('setting the button as disabled', () => {
      let button;
      beforeEach(() => {
        props = createProps({ isDisabled: true });
        wrapper = shallow(<PrimaryButton {...props} />);
        button = wrapper.find('button');
      });

      it('should render the button in the disabled state', () => {
        expect(button.find('div')).toHaveClassName('disabled');
      });
    });
  });

  describe('callbacks', () => {
    describe('of `<button />`', () => {
      describe('onClick', () => {
        let props;
        let wrapper;
        beforeEach(() => {
          props = createProps({ onClick: jest.fn() });
          wrapper = shallow(<PrimaryButton {...props} />);
          wrapper.find('button').prop('onClick')();
        });

        it('should call the onClick callback', () => {
          expect(props.onClick).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
