import React from 'react';
import { shallow } from 'enzyme';
import AccessibleButton from '../../buttons/accessible-button';
import { DropdownChevron } from './dropdown-chevron';

const createTestProps = customProps => ({
  onClick: jest.fn(),
  isDisabled: false,
  isOpen: false,
  className: 'chevron-icon',
  buttonRef: jest.fn(),
  intl: {
    formatMessage: jest.fn(message => message.id),
  },
  ...customProps,
});

describe('rendering', () => {
  describe('`DropdownChevron` component', () => {
    let dropdownChevron;
    let iconWrapper;
    let dropdownProps;
    beforeEach(() => {
      dropdownProps = createTestProps();
      dropdownChevron = shallow(<DropdownChevron {...dropdownProps} />);
    });

    it('should render an `AccessibleButton`', () => {
      expect(dropdownChevron).toRender(AccessibleButton);
    });

    describe('when is closed', () => {
      beforeEach(() => {
        iconWrapper = shallow(
          dropdownChevron.find(AccessibleButton).prop('children')
        );
      });

      it('should render a `CaretDownIcon`', () => {
        expect(iconWrapper).toRender('CaretDownIcon');
      });
    });

    describe('when is open', () => {
      beforeEach(() => {
        dropdownProps = createTestProps({ isOpen: true });
        dropdownChevron = shallow(<DropdownChevron {...dropdownProps} />);
        iconWrapper = shallow(
          dropdownChevron.find(AccessibleButton).prop('children')
        );
      });

      it('should render a `CaretUpIcon`', () => {
        expect(iconWrapper).toRender('CaretUpIcon');
      });
    });
  });
});
