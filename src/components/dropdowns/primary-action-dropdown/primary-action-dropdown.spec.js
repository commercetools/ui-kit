import React from 'react';
import { shallow } from 'enzyme';
import AccessibleButton from '../../buttons/accessible-button';
import { CaretDownIcon, CaretUpIcon, CloseBoldIcon } from '../../icons';
import PrimaryActionDropdown, { Option } from './primary-action-dropdown';

describe('<Option />', () => {
  const createTestProps = custom => ({
    onClick: jest.fn(),
    isDisabled: false,
    children: 'Icecream we scream!',
    ...custom,
  });

  describe('rendering', () => {
    let props;
    let wrapper;

    beforeEach(() => {
      props = createTestProps({
        iconLeft: <CloseBoldIcon />,
      });

      wrapper = shallow(<Option {...props} />);
    });

    it('should output correct tree', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should supply `label` to `AccessibleButton`', () => {
      expect(wrapper.find(AccessibleButton)).toHaveProp(
        'label',
        props.children
      );
    });

    it('should supply `onClick` to `AccessibleButton`', () => {
      expect(wrapper.find(AccessibleButton)).toHaveProp(
        'onClick',
        props.onClick
      );
    });

    it('should supply `isDisabled` to `AccessibleButton`', () => {
      expect(wrapper.find(AccessibleButton)).toHaveProp(
        'isDisabled',
        props.isDisabled
      );
    });

    it('should apply `optionsWrapper` class name to `AccessibleButton`', () => {
      expect(wrapper.find(AccessibleButton)).toHaveClassName('optionWrapper');
    });

    describe('when disabled (`isDisabled`)', () => {
      beforeEach(() => {
        props = createTestProps({
          isDisabled: true,
          iconLeft: <CloseBoldIcon />,
        });

        wrapper = shallow(<Option {...props} />);
      });

      it('should apply `disabledOption` class name to `AccessibleButton`', () => {
        expect(wrapper.find(AccessibleButton)).toHaveClassName(
          'disabledOption'
        );
      });
    });
  });

  describe('callbacks', () => {
    let props;
    let wrapper;

    describe('of <AccessibleButton />', () => {
      describe('when enabled (`isDisabled`)', () => {
        describe('onClick', () => {
          beforeEach(() => {
            props = createTestProps({
              iconLeft: <CloseBoldIcon />,
            });

            wrapper = shallow(<Option {...props} />);

            wrapper.find(AccessibleButton).prop('onClick')();
          });

          it('should invoke `onClick`', () => {
            expect(props.onClick).toHaveBeenCalled();
          });
        });
      });
    });
  });
});

describe('<PrimaryActionDropdown />', () => {
  const createOptionProps = custom => ({
    onClick: jest.fn(),
    isDisabled: false,
    ...custom,
  });

  describe('rendering', () => {
    let primaryOptionProps;
    let secondOptionProps;
    let wrapper;

    beforeEach(() => {
      primaryOptionProps = createOptionProps({
        iconLeft: <CloseBoldIcon />,
      });
      secondOptionProps = createOptionProps({
        iconLeft: <CloseBoldIcon />,
      });

      wrapper = shallow(
        <PrimaryActionDropdown>
          <Option {...primaryOptionProps}>{'Option 1'}</Option>
          <Option {...secondOptionProps}>{'Option 2'}</Option>
        </PrimaryActionDropdown>
      );
    });

    it('should output correct tree', () => {
      expect(wrapper).toMatchSnapshot();
    });

    describe('when open (`isOpen`)', () => {
      beforeEach(() => {
        wrapper.instance().handleOpen();
        wrapper.update();
      });

      describe('`Options`', () => {
        it('should render `Options`', () => {
          expect(wrapper).toRender('Options');
        });

        it('should render `Option`', () => {
          expect(wrapper.find('Options')).toRender('Option');
        });
      });
    });

    describe('`DropdownHead`', () => {
      it('should render a `DropdownHead`', () => {
        expect(wrapper).toRender('DropdownHead');
      });

      it('should receive `iconLeft` of first non-disabled `Option`', () => {
        expect(wrapper.find('DropdownHead')).toHaveProp(
          'iconLeft',
          primaryOptionProps.iconLeft
        );
      });

      it('should receive `isDisabled`', () => {
        expect(wrapper.find('DropdownHead')).toHaveProp('isDisabled', false);
      });

      it('should receive a `chevron`', () => {
        expect(wrapper.find('DropdownHead')).toHaveProp('chevron');
      });

      describe('`DropdownChevron`', () => {
        let chevronWrapper;

        beforeEach(() => {
          chevronWrapper = shallow(
            wrapper.find('DropdownHead').prop('chevron')
          );
        });

        it('should render `CaretDownIcon`', () => {
          expect(chevronWrapper).toRender(CaretDownIcon);
        });

        it('should receive `onClick` as `handleOpen`', () => {
          expect(chevronWrapper).toHaveProp(
            'onClick',
            wrapper.instance().handleOpen
          );
        });

        describe('when open (`isOpen`)', () => {
          beforeEach(() => {
            wrapper.setState({ isOpen: true });

            chevronWrapper = shallow(
              wrapper.find('DropdownHead').prop('chevron')
            );
          });

          it('should render `CaretUpIcon`', () => {
            expect(chevronWrapper).toRender(CaretUpIcon);
          });

          it('should receive `onClick`', () => {
            expect(chevronWrapper).toHaveProp(
              'onClick',
              wrapper.instance().handleClose
            );
          });
        });
      });

      describe('when first option is disabled (`isDisabled`)', () => {
        beforeEach(() => {
          primaryOptionProps = createOptionProps({
            iconLeft: <CloseBoldIcon />,
            isDisabled: true,
          });
          secondOptionProps = createOptionProps({
            iconLeft: <CloseBoldIcon />,
          });

          wrapper = shallow(
            <PrimaryActionDropdown>
              <Option {...primaryOptionProps}>{'Option 1'}</Option>
              <Option {...secondOptionProps}>{'Option 2'}</Option>
            </PrimaryActionDropdown>
          );
        });

        it('should receive `isDisabled` as `false` (from second option)', () => {
          expect(wrapper.find('DropdownHead')).toHaveProp('isDisabled', false);
        });

        it('should render the `children` of the second `Option`', () => {
          expect(wrapper.find('DropdownHead').children()).toHaveText(
            'Option 2'
          );
        });

        describe('`DropdownChevron`', () => {
          it('should receive `isDisabled` as `false`', () => {
            expect(
              wrapper.find('DropdownHead').prop('chevron').props.isDisabled
            ).toBe(false);
          });
        });
      });

      describe('when all options are disabled (`isDisabled`)', () => {
        beforeEach(() => {
          primaryOptionProps = createOptionProps({
            iconLeft: <CloseBoldIcon />,
            isDisabled: true,
          });
          secondOptionProps = createOptionProps({
            iconLeft: <CloseBoldIcon />,
            isDisabled: true,
          });

          wrapper = shallow(
            <PrimaryActionDropdown>
              <Option {...primaryOptionProps}>{'Option 1'}</Option>
              <Option {...secondOptionProps}>{'Option 2'}</Option>
            </PrimaryActionDropdown>
          );
        });

        it('should receive `isDisabled` as `true` (from second option)', () => {
          expect(wrapper.find('DropdownHead')).toHaveProp('isDisabled', true);
        });

        describe('`DropdownChevron`', () => {
          it('should receive `isDisabled` as `true`', () => {
            expect(
              wrapper.find('DropdownHead').prop('chevron').props.isDisabled
            ).toBe(true);
          });

          it('should apply the `disabledDropdownHeadChevron` class name', () => {
            expect(
              wrapper.find('DropdownHead').prop('chevron').props.className
            ).toMatch('disabledDropdownHeadChevron');
          });
        });
      });

      describe('when closed', () => {
        it('should receive `onClick` if first `Option` as `onClick`', () => {
          expect(wrapper.find('DropdownHead')).toHaveProp(
            'onClick',
            primaryOptionProps.onClick
          );
        });
      });

      describe('when open', () => {
        beforeEach(() => {
          wrapper.setState({ isOpen: true });
        });

        it('should receive `handleClose` as `onClick`', () => {
          expect(wrapper.find('DropdownHead')).toHaveProp(
            'onClick',
            wrapper.instance().handleClose
          );
        });
      });
    });
  });

  describe('interacting', () => {
    let primaryOptionProps;
    let secondOptionProps;
    let wrapper;

    beforeEach(() => {
      primaryOptionProps = createOptionProps({
        iconLeft: <CloseBoldIcon />,
      });
      secondOptionProps = createOptionProps({
        iconLeft: <CloseBoldIcon />,
      });

      wrapper = shallow(
        <PrimaryActionDropdown>
          <Option {...primaryOptionProps}>{'Option 1'}</Option>
          <Option {...secondOptionProps}>{'Option 2'}</Option>
        </PrimaryActionDropdown>
      );
    });

    describe('when opening', () => {
      beforeEach(() => {
        wrapper.instance().handleOpen();
      });

      it('should update `isOpen` state to `true`', () => {
        expect(wrapper).toHaveState('isOpen', true);
      });
    });

    describe('when closing', () => {
      beforeEach(() => {
        // Open first to trigger close after
        wrapper.instance().handleOpen();
        wrapper.instance().handleClose();
      });

      it('should update `isOpen` state to `false`', () => {
        expect(wrapper).toHaveState('isOpen', false);
      });
    });

    describe('handling global click', () => {
      const createEvent = () => ({ target: 'event-target' });
      let event;

      beforeEach(() => {
        event = createEvent();

        wrapper.instance().dropdownButton = {};
      });

      describe('when clicking outside of the dropdown', () => {
        beforeEach(() => {
          // Setting the dropdown to be open for closing by outside click
          wrapper.setState({ isOpen: true });

          wrapper.instance().dropdownButton.contains = jest.fn(() => false);

          wrapper.instance().handleGlobalClick(event);
        });

        it('should set the `isOpen` state to `false`', () => {
          expect(wrapper).toHaveState('isOpen', false);
        });

        describe('when clicking inside of the dropdown', () => {
          beforeEach(() => {
            // Setting the dropdown to be open for closing by outside click
            wrapper.setState({ isOpen: true });

            wrapper.instance().dropdownButton.contains = jest.fn(() => true);

            wrapper.instance().handleGlobalClick(event);
          });

          it('should keep the `isOpen` state to `true`', () => {
            expect(wrapper).toHaveState('isOpen', true);
          });
        });
      });
    });
  });

  describe('state', () => {
    let primaryOptionProps;
    let secondOptionProps;
    let wrapper;

    beforeEach(() => {
      primaryOptionProps = createOptionProps({
        iconLeft: <CloseBoldIcon />,
      });
      secondOptionProps = createOptionProps({
        iconLeft: <CloseBoldIcon />,
      });

      wrapper = shallow(
        <PrimaryActionDropdown>
          <Option {...primaryOptionProps}>{'Option 1'}</Option>
          <Option {...secondOptionProps}>{'Option 2'}</Option>
        </PrimaryActionDropdown>
      );
    });

    it('should default `isOpen` to `false`', () => {
      expect(wrapper).toHaveState('isOpen', false);
    });
  });

  describe('lifecycle', () => {
    let originalListeners;
    let primaryOptionProps;
    let secondOptionProps;
    let wrapper;

    beforeEach(() => {
      originalListeners = {
        addEventListener: global.window.addEventListener,
        removeEventListener: global.window.removeEventListener,
      };

      global.window.addEventListener = jest.fn();
      global.window.removeEventListener = jest.fn();

      primaryOptionProps = createOptionProps({
        iconLeft: <CloseBoldIcon />,
      });
      secondOptionProps = createOptionProps({
        iconLeft: <CloseBoldIcon />,
      });

      wrapper = shallow(
        <PrimaryActionDropdown>
          <Option {...primaryOptionProps}>{'Option 1'}</Option>
          <Option {...secondOptionProps}>{'Option 2'}</Option>
        </PrimaryActionDropdown>
      );

      wrapper.instance().componentDidMount();
    });

    afterEach(() => {
      global.window.addEventListener = originalListeners.addEventListener;
      global.window.removeEventListener = originalListeners.removeEventListener;
    });

    describe('componentDidMount', () => {
      it('should add an event listener for handling a global click', () => {
        expect(global.window.addEventListener).toHaveBeenCalled();
        expect(global.window.addEventListener).toHaveBeenCalledWith(
          'click',
          wrapper.instance().handleGlobalClick
        );
      });
    });

    describe('componentWillUnmount', () => {
      beforeEach(() => {
        wrapper.instance().componentWillUnmount();
      });

      it('should remove the event listener for handling a global click', () => {
        expect(global.window.removeEventListener).toHaveBeenCalled();
        expect(global.window.removeEventListener).toHaveBeenCalledWith(
          'click',
          wrapper.instance().handleGlobalClick
        );
      });
    });
  });
});
