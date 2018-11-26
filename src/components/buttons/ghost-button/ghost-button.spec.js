import React from 'react';
import { shallow } from 'enzyme';
import Icons from '../../icons';
import GhostButton from './ghost-button';

const createProps = custom => ({
  label: '',
  onClick: () => {},
  ...custom,
});

describe('rendering', () => {
  describe('AccessibleButton', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createProps();
      wrapper = shallow(<GhostButton {...props} />);
    });
    it('should render a <AccessibleButton/>', () => {
      expect(wrapper).toRender('AccessibleButton');
    });

    it('should supply `onClick` to `AccessibleButton`', () => {
      expect(wrapper.find('AccessibleButton')).toHaveProp(
        'onClick',
        props.onClick
      );
    });

    it('should supply `isToggled` to `AccessibleButton`', () => {
      expect(wrapper.find('AccessibleButton')).toHaveProp(
        'isToggled',
        props.isToggled
      );
    });

    it('should supply `label` to `AccessibleButton`', () => {
      expect(wrapper.find('AccessibleButton')).toHaveProp('label', props.label);
    });

    it('should contain a div for flexbox styling', () => {
      expect(
        wrapper.find('AccessibleButton').contains(
          <div className="default">
            <span>{''}</span>
          </div>
        )
      ).toBe(true);
    });

    describe('with data-* props', () => {
      beforeEach(() => {
        props = createProps({
          'data-track-component': 'GhostButton',
          'data-track-label': 'GhostButton',
          'data-track-event': 'click',
          'data-test': 'data-test-ghost',
        });
        wrapper = shallow(<GhostButton {...props} />);
      });
      it('should apply given `data-track-component` to `AccessibleButton`', () => {
        expect(wrapper).toHaveProp(
          'buttonAttributes',
          expect.objectContaining({
            'data-track-component': 'GhostButton',
          })
        );
      });
      it('should apply given `data-track-event` to `AccessibleButton`', () => {
        expect(wrapper).toHaveProp(
          'buttonAttributes',
          expect.objectContaining({
            'data-track-event': 'click',
          })
        );
      });
      it('should apply given `data-track-label` to `AccessibleButton`', () => {
        expect(wrapper).toHaveProp(
          'buttonAttributes',
          expect.objectContaining({
            'data-track-label': 'GhostButton',
          })
        );
      });
      it('should apply given `data-track-test` to `AccessibleButton`', () => {
        expect(wrapper).toHaveProp(
          'buttonAttributes',
          expect.objectContaining({
            'data-test': 'data-test-ghost',
          })
        );
      });
    });
    describe('without data-* props', () => {
      beforeEach(() => {
        props = createProps();
        wrapper = shallow(<GhostButton {...props} />);
      });
      it('should apply default `data-track-component` to `AccessibleButton`', () => {
        expect(wrapper).toHaveProp(
          'buttonAttributes',
          expect.objectContaining({
            'data-track-component': 'GhostButton',
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
      wrapper = shallow(<GhostButton {...props} />);
    });

    it('should render a label', () => {
      expect(wrapper.find({ className: 'default' }).text()).toContain('Login');
    });

    it('pass the label to AccessibleButton', () => {
      expect(wrapper.find('AccessibleButton').prop('label')).toBe('Login');
    });
  });

  describe('without icon', () => {
    let props;
    let wrapper;

    beforeEach(() => {
      props = createProps();
      wrapper = shallow(<GhostButton {...props} />);
    });

    it('should not render an icon', () => {
      expect(
        wrapper
          .find('button')
          .find('div')
          .find('i')
      ).toHaveLength(0);
    });
  });

  describe('with icon', () => {
    let props;
    let wrapper;

    beforeEach(() => {
      props = createProps({
        iconLeft: <Icons.AddBold />,
      });
      wrapper = shallow(<GhostButton {...props} />);
    });

    it('should render an icon', () => {
      expect(wrapper).toRender(Icons.AddBold);
    });

    describe('with icon size big', () => {
      beforeEach(() => {
        props = createProps({
          iconLeft: <Icons.AddBold size="big" />,
        });
        wrapper = shallow(<GhostButton {...props} />);
      });

      it('should overwrite the Icon size to be medium', () => {
        expect(wrapper.find(Icons.AddBold)).toHaveProp('size', 'medium');
      });
    });

    describe('when disabled (`isDisabled`)', () => {
      beforeEach(() => {
        props = createProps({
          isDisabled: true,
          iconLeft: <Icons.AddBold />,
        });
        wrapper = shallow(<GhostButton {...props} />);
      });

      it('should apply the grey theme to the icon', () => {
        expect(wrapper.find(Icons.AddBold)).toHaveProp('theme', 'grey');
      });
    });
  });
  describe('setting the button as active', () => {
    let props;
    let wrapper;

    beforeEach(() => {
      props = createProps({ isToggleButton: true, isToggled: true });
      wrapper = shallow(<GhostButton {...props} />);
    });

    it('should render the button in the active state', () => {
      expect(wrapper).toRender({ className: 'active' });
    });

    it('should pass the isToggled prop to AccessibleButton', () => {
      expect(wrapper.find('AccessibleButton').prop('isToggled')).toBe(true);
    });
  });
  describe('setting the button as not active', () => {
    let props;
    let wrapper;

    beforeEach(() => {
      props = createProps({ isToggleButton: true, isToggled: false });
      wrapper = shallow(<GhostButton {...props} />);
    });

    it('should not render the button in the non active state', () => {
      expect(wrapper).not.toRender({ className: 'active' });
    });

    it('should pass the isToggled prop to AccessibleButton', () => {
      expect(wrapper.find('AccessibleButton').prop('isToggled')).toBe(false);
    });
  });
  describe('setting the button as disabled', () => {
    let props;
    let wrapper;

    beforeEach(() => {
      props = createProps({ isDisabled: true });
      wrapper = shallow(<GhostButton {...props} />);
    });

    it('should render the button in the disabled state', () => {
      expect(wrapper).toRender({ className: 'disabled' });
    });

    it('should pass the isToggled prop to AccessibleButton', () => {
      expect(wrapper.find('AccessibleButton').prop('isDisabled')).toBe(true);
    });
  });
});

describe('callbacks', () => {
  let props;
  let wrapper;

  describe('of `<AccessibleButton />`', () => {
    describe('onClick', () => {
      beforeEach(() => {
        props = createProps({ onClick: jest.fn() });
        wrapper = shallow(<GhostButton {...props} />);

        wrapper.find('AccessibleButton').prop('onClick')();
      });

      it('should call the onClick callback', () => {
        expect(props.onClick).toHaveBeenCalledTimes(1);
      });
    });
  });
});
