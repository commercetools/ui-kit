import React from 'react';
import { shallow } from 'enzyme';
import { FilterIcon } from '../../icons';
import AccessibleButton from '../accessible-button';
import { SecondaryButton, getIconThemeColor } from './secondary-button';

const createProps = custom => ({
  label: '',
  onClick: () => {},
  iconLeft: '',
  isDisabled: false,

  // HoC
  isMouseDown: false,
  isMouseOver: false,
  handleMouseUp: jest.fn(),
  handleMouseDown: jest.fn(),
  handleMouseOver: jest.fn(),
  handleMouseOut: jest.fn(),

  ...custom,
});

describe('rendering', () => {
  describe('structure', () => {
    let props;
    let wrapper;

    beforeEach(() => {
      props = createProps();
      wrapper = shallow(<SecondaryButton {...props} />);
    });

    it('should output correct tree', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a <AccessibleButton/>', () => {
      expect(wrapper).toRender('AccessibleButton');
    });

    it('should apply `button` class name to `AccessibleButton`', () => {
      expect(wrapper.find('AccessibleButton')).toHaveClassName('button');
    });

    it('should supply `onClick` to `<AccessibleButton />`', () => {
      expect(wrapper.find('AccessibleButton')).toHaveProp(
        'onClick',
        props.onClick
      );
    });

    it('should supply `isToggled` to `<AccessibleButton />`', () => {
      expect(wrapper.find('AccessibleButton')).toHaveProp(
        'isToggled',
        props.isToggled
      );
    });

    it('should supply `label` to `<AccessibleButton />`', () => {
      expect(wrapper.find('AccessibleButton')).toHaveProp('label', props.label);
    });

    describe('with data-* props', () => {
      beforeEach(() => {
        props = createProps({
          'data-track-component': 'SecondaryButton',
          'data-track-label': 'SecondaryButton',
          'data-track-event': 'click',
        });
        wrapper = shallow(<SecondaryButton {...props} />);
      });
      it('should apply given `data-track-component` to AccessibleButton', () => {
        expect(wrapper.find('AccessibleButton')).toHaveProp(
          'buttonAttributes',
          expect.objectContaining({
            'data-track-component': 'SecondaryButton',
          })
        );
      });
      it('should apply given `data-track-event` to AccessibleButton', () => {
        expect(wrapper.find('AccessibleButton')).toHaveProp(
          'buttonAttributes',
          expect.objectContaining({
            'data-track-event': 'click',
          })
        );
      });
      it('should apply given `data-track-label` to AccessibleButton', () => {
        expect(wrapper.find('AccessibleButton')).toHaveProp(
          'buttonAttributes',
          expect.objectContaining({
            'data-track-label': 'SecondaryButton',
          })
        );
      });
    });
    describe('without data-* props', () => {
      beforeEach(() => {
        props = createProps();
        wrapper = shallow(<SecondaryButton {...props} />);
      });
      it('should apply default `data-track-component` to AccessibleButton', () => {
        expect(wrapper.find('AccessibleButton')).toHaveProp(
          'buttonAttributes',
          expect.objectContaining({
            'data-track-component': 'SecondaryButton',
          })
        );
      });
    });
  });

  describe('with icon', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createProps({
        iconLeft: <FilterIcon />,
      });
      wrapper = shallow(<SecondaryButton {...props} />);
    });

    it('should output correct tree', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render an icon', () => {
      expect(wrapper).toRender(FilterIcon);
    });

    describe('when theme is not default', () => {
      describe('when toggled', () => {
        beforeEach(() => {
          props = createProps({
            theme: 'blue',
            isToggled: true,
            isToggleButton: true,
            iconLeft: <FilterIcon theme="red" />,
          });
          wrapper = shallow(<SecondaryButton {...props} />);
        });

        it('should overwrite the Icon theme to be the same color as button', () => {
          expect(wrapper.find(FilterIcon)).toHaveProp('theme', 'blue');
        });
      });
      describe('when mouse down', () => {
        beforeEach(() => {
          props = createProps({
            theme: 'blue',
            isMouseDown: true,
            isToggled: true,
            isToggleButton: true,
            iconLeft: <FilterIcon theme="red" />,
          });
          wrapper = shallow(<SecondaryButton {...props} />);
        });

        it('should overwrite the Icon theme to be the same color as button', () => {
          expect(wrapper.find(FilterIcon)).toHaveProp('theme', 'blue');
        });
      });
      describe('when mouse over', () => {
        beforeEach(() => {
          props = createProps({
            theme: 'blue',
            isMouseOver: true,
            isToggled: false,
            isToggleButton: true,
            iconLeft: <FilterIcon theme="red" />,
          });
          wrapper = shallow(<SecondaryButton {...props} />);
        });

        it('should overwrite the Icon theme to be the same color as button', () => {
          expect(wrapper.find(FilterIcon)).toHaveProp('theme', 'blue');
        });
      });
    });
    describe('when theme is default', () => {
      describe('when toggled', () => {
        beforeEach(() => {
          props = createProps({
            theme: 'default',
            isToggled: true,
            isToggleButton: true,
            iconLeft: <FilterIcon theme="red" />,
          });
          wrapper = shallow(<SecondaryButton {...props} />);
        });

        it('should overwrite the Icon theme to be icon`s color prop', () => {
          expect(wrapper.find(FilterIcon)).toHaveProp('theme', 'red');
        });
      });
      describe('when mouse down', () => {
        beforeEach(() => {
          props = createProps({
            theme: 'default',
            isMouseDown: true,
            isToggled: true,
            isToggleButton: true,
            iconLeft: <FilterIcon theme="red" />,
          });
          wrapper = shallow(<SecondaryButton {...props} />);
        });

        it('should overwrite the Icon theme to be icon`s color prop', () => {
          expect(wrapper.find(FilterIcon)).toHaveProp('theme', 'red');
        });
      });
      describe('when mouse over', () => {
        beforeEach(() => {
          props = createProps({
            theme: 'blue',
            isMouseOver: true,
            isToggled: false,
            isToggleButton: true,
            iconLeft: <FilterIcon theme="red" />,
          });
          wrapper = shallow(<SecondaryButton {...props} />);
        });

        it('should overwrite the Icon theme to be the same color as button', () => {
          expect(wrapper.find(FilterIcon)).toHaveProp('theme', 'blue');
        });
      });
    });
  });

  describe('states', () => {
    describe('when is toggled', () => {
      let wrapper;
      beforeEach(() => {
        const props = createProps({
          isToggleButton: true,
          isToggled: true,
        });
        wrapper = shallow(<SecondaryButton {...props} />);
      });
      it('should render the button with active state', () => {
        expect(wrapper).toHaveClassName('active container');
      });
      it('should pass the isToggled prop to AccessibleButton', () => {
        expect(wrapper.find('AccessibleButton')).toHaveProp('isToggled', true);
      });
    });
    describe('when is not active', () => {
      let wrapper;
      beforeEach(() => {
        const props = createProps({
          isToggleButton: true,
          isToggled: false,
        });
        wrapper = shallow(<SecondaryButton {...props} />);
      });
      it('should not render the button in the non active state', () => {
        expect(wrapper).not.toHaveClassName('active container-big');
      });
      it('should pass the isToggled prop to AccessibleButton', () => {
        expect(wrapper.find('AccessibleButton').prop('isToggled')).toBe(false);
      });
    });
    describe('when is disabled', () => {
      let wrapper;
      let props;
      beforeEach(() => {
        props = createProps({ isDisabled: true });
        wrapper = shallow(<SecondaryButton {...props} />);
      });
      it('should render the button in the disabled state', () => {
        expect(wrapper).toHaveClassName('disabled container');
      });
      it('should pass the isToggled prop to AccessibleButton', () => {
        expect(wrapper.find('AccessibleButton').prop('isDisabled')).toBe(true);
      });
    });
    describe('when is toggle', () => {
      let wrapper;
      beforeEach(() => {
        const props = createProps({
          isToggleButton: true,
          isToggled: false,
          theme: 'blue',
        });
        wrapper = shallow(<SecondaryButton {...props} />);
      });
      it('should set the style according to the theme', () => {
        expect(wrapper).toHaveClassName('default container theme-blue');
      });

      describe('when is active and disabled', () => {
        beforeEach(() => {
          const props = createProps({
            isToggleButton: true,
            isToggled: true,
            isDisabled: true,
            theme: 'apple-green',
          });
          wrapper = shallow(<SecondaryButton {...props} />);
        });

        it('should handle both classes', () => {
          expect(wrapper).toHaveClassName(
            'active disabled container theme-apple-green'
          );
        });
      });
    });
  });
});

describe('interaction', () => {
  describe('clicking the button', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createProps({ onClick: jest.fn() });
      wrapper = shallow(<SecondaryButton {...props} />);
      wrapper.find('AccessibleButton').prop('onClick')();
    });
    it('should call the onClick callback', () => {
      expect(props.onClick).toHaveBeenCalledTimes(1);
    });
  });
  describe('with `linkTo` prop', () => {
    let props;
    let wrapper;
    describe('when not disabled', () => {
      beforeEach(() => {
        props = createProps({ linkTo: '/foo/bar' });
        wrapper = shallow(<SecondaryButton {...props} />);
      });
      it('should render a `Link` component', () => {
        expect(wrapper).toRender('Link');
      });
      it('should propagate `linkTo` to the `Link`', () => {
        expect(wrapper.find('Link')).toHaveProp('to', '/foo/bar');
      });
    });
    describe('when disabled', () => {
      beforeEach(() => {
        props = createProps({
          linkTo: '/foo/bar',
          isDisabled: true,
          onClick: jest.fn(),
        });
        wrapper = shallow(<SecondaryButton {...props} />);
      });
      it('should not render a `Link` component', () => {
        expect(wrapper).not.toRender('Link');
      });
      it('should render <Div>', () => {
        expect(wrapper).toRender('Div');
      });
      it('should not propagate `linkTo`', () => {
        expect(wrapper.find('Div')).toHaveProp('to', undefined);
      });

      describe('when clicking <AccessibleButton>', () => {
        beforeEach(() => {
          wrapper.find(AccessibleButton).prop('onClick')();
        });
        it('should call `onClick`', () => {
          expect(props.onClick).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});

describe('utils', () => {
  let props;
  describe('getIconThemeColor', () => {
    describe('when is toggled', () => {
      beforeEach(() => {
        props = createProps({
          theme: 'blue',
          isToggled: true,
          isToggleButton: true,
          iconLeft: <FilterIcon theme="red" />,
        });
      });
      it('should return `blue` color as a theme class', () => {
        expect(getIconThemeColor(props)).toBe('blue');
      });
    });
    describe('when is disabled', () => {
      beforeEach(() => {
        props = createProps({ isDisabled: true });
      });
      it('should return `grey` color as a theme class', () => {
        expect(getIconThemeColor(props)).toBe('grey');
      });
    });
  });
});
