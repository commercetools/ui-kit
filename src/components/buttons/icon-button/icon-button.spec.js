import React from 'react';
import { shallow } from 'enzyme';
import { FilterIcon } from '../../icons';
import { IconButton } from './icon-button';

const createProps = custom => ({
  type: 'button',
  label: '',
  onClick: () => {},
  icon: '',

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
      wrapper = shallow(<IconButton {...props} />);
    });

    it('should output correct tree', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a <AccessibleButton/>', () => {
      expect(wrapper).toRender('AccessibleButton');
    });

    it('should apply `button-layout` class name to `AccessibleButton`', () => {
      expect(wrapper.find('AccessibleButton')).toHaveClassName('container-big');
    });

    it('should supply `type` to `<AccessibleButton />`', () => {
      expect(wrapper.find('AccessibleButton')).toHaveProp('type', props.type);
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
          'data-track-component': 'IconButton',
          'data-track-label': 'IconButton',
          'data-track-event': 'click',
          'data-test': 'icon-button',
        });
        wrapper = shallow(<IconButton {...props} />);
      });
      it('should apply given `data-track-component` to AccessibleButton', () => {
        expect(wrapper.find('AccessibleButton')).toHaveProp(
          'buttonAttributes',
          expect.objectContaining({
            'data-track-component': 'IconButton',
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
            'data-track-label': 'IconButton',
          })
        );
      });
      it('should apply given `data-test` to AccessibleButton', () => {
        expect(wrapper.find('AccessibleButton')).toHaveProp(
          'buttonAttributes',
          expect.objectContaining({
            'data-test': 'icon-button',
          })
        );
      });
    });
    describe('without data-* props', () => {
      beforeEach(() => {
        props = createProps();
        wrapper = shallow(<IconButton {...props} />);
      });
      it('should apply default `data-track-component` to AccessibleButton', () => {
        expect(wrapper.find('AccessibleButton')).toHaveProp(
          'buttonAttributes',
          expect.objectContaining({
            'data-track-component': 'IconButton',
          })
        );
      });
    });
  });

  describe('icon', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createProps({
        icon: <FilterIcon />,
      });
      wrapper = shallow(<IconButton {...props} />);
    });

    it('should output correct tree', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render an icon', () => {
      expect(wrapper).toRender(FilterIcon);
    });

    describe('when IconButton size is medium', () => {
      describe('when Icon size is big', () => {
        beforeEach(() => {
          props = createProps({
            size: 'medium',
            icon: <FilterIcon size="big" />,
          });
          wrapper = shallow(<IconButton {...props} />);
        });

        it('should overwrite the Icon size to be medium', () => {
          expect(wrapper.find(FilterIcon)).toHaveProp('size', 'medium');
        });
      });
    });

    describe('when theme is not default', () => {
      describe('when toggled', () => {
        beforeEach(() => {
          props = createProps({
            theme: 'blue',
            isToggled: true,
            isToggleButton: true,
            icon: <FilterIcon theme="red" />,
          });
          wrapper = shallow(<IconButton {...props} />);
        });

        it('should overwrite the Icon theme to be white', () => {
          expect(wrapper.find(FilterIcon)).toHaveProp('theme', 'white');
        });
      });

      describe('when mouse is down and mouse is over', () => {
        beforeEach(() => {
          props = createProps({
            theme: 'blue',
            isMouseDown: true,
            isMouseOver: true,
            isToggled: false,
            isToggleButton: true,
            icon: <FilterIcon theme="black" />,
          });
          wrapper = shallow(<IconButton {...props} />);
        });

        it('should overwrite the Icon theme to be white', () => {
          expect(wrapper.find(FilterIcon)).toHaveProp('theme', 'white');
        });
        it('should not overwrite the Icon theme to be black', () => {
          expect(wrapper.find(FilterIcon)).not.toHaveProp('theme', 'black');
        });
      });
      describe('when mouse is down and mouse is out', () => {
        beforeEach(() => {
          props = createProps({
            theme: 'blue',
            isMouseDown: true,
            isMouseOver: false,
            isToggled: false,
            isToggleButton: true,
            icon: <FilterIcon theme="black" />,
          });
          wrapper = shallow(<IconButton {...props} />);
        });

        it('should not overwrite the Icon theme to be white', () => {
          expect(wrapper.find(FilterIcon)).not.toHaveProp('theme', 'white');
        });
        it('should overwrite the Icon theme to be black', () => {
          expect(wrapper.find(FilterIcon)).toHaveProp('theme', 'black');
        });
      });
    });
  });

  describe('sizes', () => {
    describe('when small', () => {
      let wrapper;
      beforeEach(() => {
        const props = createProps({ size: 'small' });
        wrapper = shallow(<IconButton {...props} />);
      });

      it('should add the small class to container', () => {
        expect(wrapper).toHaveClassName('container-small');
      });
    });

    describe('when medium', () => {
      let wrapper;
      beforeEach(() => {
        const props = createProps({ size: 'medium' });
        wrapper = shallow(<IconButton {...props} />);
      });
      it('should add the medium class to container', () => {
        expect(wrapper).toHaveClassName('container-medium');
      });
    });

    describe('when big', () => {
      let wrapper;
      beforeEach(() => {
        const props = createProps({ size: 'big' });
        wrapper = shallow(<IconButton {...props} />);
      });
      it('should add the big class to container', () => {
        expect(wrapper).toHaveClassName('container-big');
      });
    });
  });

  describe('shapes', () => {
    describe('when no shape is provided', () => {
      let wrapper;
      beforeEach(() => {
        const props = createProps({ shape: undefined });
        wrapper = shallow(<IconButton {...props} />);
      });
      it('should add the round class', () => {
        expect(wrapper).toHaveClassName('default round container-big');
      });
    });
    describe('when providing shape', () => {
      let wrapper;
      beforeEach(() => {
        const props = createProps({ shape: 'square' });
        wrapper = shallow(<IconButton {...props} />);
      });
      it('should add the round class', () => {
        expect(wrapper).toHaveClassName('default square container-big');
      });
    });
  });

  describe('states', () => {
    describe('when is active', () => {
      let wrapper;
      beforeEach(() => {
        const props = createProps({
          isToggleButton: true,
          isToggled: true,
        });
        wrapper = shallow(<IconButton {...props} />);
      });
      it('should render the button with active state', () => {
        expect(wrapper).toHaveClassName('active round container-big');
      });
      it('should pass the isToggled prop to AccessibleButton', () => {
        expect(wrapper.find('AccessibleButton').prop('isToggled')).toBe(true);
      });
    });
    describe('when is not active', () => {
      let wrapper;
      beforeEach(() => {
        const props = createProps({
          isToggleButton: true,
          isToggled: false,
        });
        wrapper = shallow(<IconButton {...props} />);
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
      beforeEach(() => {
        const props = createProps({ isDisabled: true });
        wrapper = shallow(<IconButton {...props} />);
      });
      it('should render the button in the disabled state', () => {
        expect(wrapper).toHaveClassName('disabled round container-big');
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
        wrapper = shallow(<IconButton {...props} />);
      });
      it('should set the style according to the theme', () => {
        expect(wrapper).toHaveClassName(
          'default round container-big theme-blue'
        );
      });

      describe('when is active and disabled', () => {
        beforeEach(() => {
          const props = createProps({
            isToggleButton: true,
            isToggled: true,
            isDisabled: true,
            theme: 'green',
          });
          wrapper = shallow(<IconButton {...props} />);
        });

        it('should handle both classes', () => {
          expect(wrapper).toHaveClassName(
            'active disabled round container-big theme-green'
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
      wrapper = shallow(<IconButton {...props} />);
      wrapper.find('AccessibleButton').prop('onClick')();
    });
    it('should call the onClick callback', () => {
      expect(props.onClick).toHaveBeenCalledTimes(1);
    });
  });
});
