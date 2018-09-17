import React from 'react';
import { shallow } from 'enzyme';
import { AddBoldIcon } from '../../icons';
import PrimaryButton from './primary-action-button';

const createProps = custom => ({
  label: '',
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

    it('should supply `isToggled` to `button`', () => {
      expect(wrapper.find('button')).toHaveProp('isToggled', props.isToggled);
    });

    it('should supply `label` to `button`', () => {
      expect(wrapper.find('button')).toHaveProp('label', props.label);
    });

    it('should contain a div for flexbox styling', () => {
      expect(wrapper).toContainClass('button-layout-big');
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
        expect(wrapper.find('button')).toHaveProp(
          'buttonAttributes',
          expect.objectContaining({
            'data-track-component': 'PrimaryButton',
          })
        );
      });
      it('should apply given `data-track-event` to button', () => {
        expect(wrapper.find('button')).toHaveProp(
          'buttonAttributes',
          expect.objectContaining({
            'data-track-event': 'click',
          })
        );
      });
      it('should apply given `data-track-label` to button', () => {
        expect(wrapper.find('button')).toHaveProp(
          'buttonAttributes',
          expect.objectContaining({
            'data-track-label': 'PrimaryButton',
          })
        );
      });
      it('should apply given `data-test` to button', () => {
        expect(wrapper.find('button')).toHaveProp(
          'buttonAttributes',
          expect.objectContaining({
            'data-test': 'data-test-primary',
          })
        );
      });
    });
    describe('without data-* props', () => {
      beforeEach(() => {
        props = createProps();
        wrapper = shallow(<PrimaryButton {...props} />);
      });
      it('should apply default `data-track-component` to button', () => {
        expect(wrapper.find('button')).toHaveProp(
          'buttonAttributes',
          expect.objectContaining({
            'data-track-component': 'PrimaryButton',
          })
        );
      });
    });
  });
  describe('label', () => {
    let props;
    let wrapper;

    beforeEach(() => {
      props = createProps({ label: 'Login' });
      wrapper = shallow(<PrimaryButton {...props} />);
    });

    it('pass the label to button', () => {
      expect(wrapper.find('button').prop('label')).toBe('Login');
    });
  });
  describe('without icon', () => {
    let props;
    let wrapper;

    beforeEach(() => {
      props = createProps();
      wrapper = shallow(<PrimaryButton {...props} />);
    });

    it('should not render an icon', () => {
      expect(wrapper).not.toRender(AddBoldIcon);
    });
  });

  describe('with icon', () => {
    let props;
    let wrapper;

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
    describe('with `primary` tone', () => {
      describe('when disabled', () => {
        beforeEach(() => {
          props = createProps({
            tone: 'primary',
            isDisabled: true,
          });
          wrapper = shallow(<PrimaryButton {...props} />);
        });
        it('should not use `primary` tone', () => {
          expect(wrapper).not.toHaveClassName('button-tone-primary');
        });
      });
    });
    describe('with `urgent` tone', () => {
      describe('when disabled', () => {
        beforeEach(() => {
          props = createProps({
            tone: 'urgent',
            isDisabled: true,
          });
          wrapper = shallow(<PrimaryButton {...props} />);
        });
        it('should not use `urgent` tone', () => {
          expect(wrapper).not.toHaveClassName('button-tone-urgent');
        });
      });
    });
  });
  describe('setting the button as active', () => {
    let props;
    let wrapper;

    beforeEach(() => {
      props = createProps({ isToggleButton: true, isToggled: true });
      wrapper = shallow(<PrimaryButton {...props} />);
    });

    it('should render the button in the active state', () => {
      expect(wrapper).toRender({ className: 'active' });
    });

    it('should pass the isToggled prop to button', () => {
      expect(wrapper.find('button').prop('isToggled')).toBe(true);
    });
  });
  describe('setting the button as not active', () => {
    let props;
    let wrapper;

    beforeEach(() => {
      props = createProps({ isToggleButton: true, isToggled: false });
      wrapper = shallow(<PrimaryButton {...props} />);
    });

    it('should not render the button in the non active state', () => {
      expect(wrapper).not.toRender({ className: 'active' });
    });

    it('should pass the isToggled prop to button', () => {
      expect(wrapper.find('button').prop('isToggled')).toBe(false);
    });
  });
  describe('setting the button as disabled', () => {
    let props;
    let wrapper;
    let button;
    beforeEach(() => {
      props = createProps({ isDisabled: true });
      wrapper = shallow(<PrimaryButton {...props} />);
      button = wrapper.find('button');
    });

    it('should render the button in the disabled state', () => {
      expect(button).toHaveClassName('disabled');
    });

    it('should pass the isToggled prop to button', () => {
      expect(wrapper.find('button').prop('isDisabled')).toBe(true);
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
