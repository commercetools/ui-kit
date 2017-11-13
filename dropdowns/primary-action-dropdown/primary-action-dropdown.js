import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import classnames from 'classnames';
import Text from '../../typography/text';
import { CaretDownIcon, CaretUpIcon } from '../../icons';
import AccessibleButton from '../../buttons/accessible-button';
import styles from './primary-actions-dropdown.mod.css';

class DropdownHead extends React.PureComponent {
  static displayName = 'DropdownHead';
  static propTypes = {
    iconLeft: PropTypes.element.isRequired,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    chevron: PropTypes.element.isRequired,
  };

  render() {
    return (
      <div className={styles.primaryOptionWrapper}>
        <AccessibleButton
          label={this.props.children}
          onClick={this.props.onClick}
          isDisabled={this.props.isDisabled}
          className={classnames(styles.primaryActionWrapper, {
            [styles.defaultPrimaryAction]: !this.props.isDisabled,
            [styles.disabledPrimaryAction]: this.props.isDisabled,
          })}
        >
          <span className={styles.primaryActionIconWrapper}>
            {React.cloneElement(this.props.iconLeft, {
              size: 'big',
              theme: this.props.isDisabled ? 'grey' : 'black',
            })}
          </span>
          <span className={styles.primaryActionTextWrapper}>
            <Text.Detail>{this.props.children}</Text.Detail>
          </span>
        </AccessibleButton>
        {this.props.chevron}
      </div>
    );
  }
}

const DropdownChevron = props => (
  <AccessibleButton
    buttonRef={props.buttonRef}
    label="Open Dropdown"
    onClick={props.onClick}
    isDisabled={props.isDisabled}
    isOpen={props.isOpen}
    className={props.className}
  >
    {/*
    We need to apply pointer-events: none on the icons, so that
    event.target is always set to the button and never to the icons.

    That way we can use the ref to compare event.target to the
    AccessibleButton's button in the global click handler.
  */}
    <div className={styles.iconWrapper}>
      {React.cloneElement(
        props.isOpen && !props.isDisabled ? <CaretUpIcon /> : <CaretDownIcon />,
        {
          theme: props.isDisabled ? 'grey' : 'black',
          size: 'small',
        }
      )}
    </div>
  </AccessibleButton>
);
DropdownChevron.displayName = 'DropdownChevron';
DropdownChevron.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  buttonRef: PropTypes.func.isRequired,
};

const Options = props => (
  <div className={styles.optionsWrapper}>{props.children}</div>
);
Options.displayName = 'Options';
Options.propTypes = {
  children: PropTypes.node.isRequired,
};

export const Option = props => (
  <AccessibleButton
    label={props.children}
    onClick={props.onClick}
    isDisabled={props.isDisabled}
    className={classnames(styles.optionWrapper, {
      [styles.disabledOption]: props.isDisabled,
    })}
  >
    {props.children}
  </AccessibleButton>
);
Option.displayName = 'Option';
Option.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  children: PropTypes.string.isRequired,
  iconLeft: PropTypes.node.isRequired,
};
Option.defaultProps = {
  isDisabled: false,
};

/*
  This component registers a global click event listener to close the dropdown.
  It uses this global listener to close when:
    - an element outside of the dropdown is clicked
    - an element in the dropdown options is clicked

  In order to be still able to open the dropdown we have to avoid auto-closing
  when the dropdown trigger itself is clicked. Otherwise it would open and close
  immediately.
 */
export class PrimaryActionDropdown extends React.PureComponent {
  static displayName = 'PrimaryActionDropdown';

  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    isOpen: false,
  };

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  // close the dropdown when anything but the dropdown trigger is clicked,
  // including when the dropdown content itself is clicked.
  handleGlobalClick = event => {
    const dropdownButton = this.dropdownButton;
    if (
      event.target !== dropdownButton &&
      !dropdownButton.contains(event.target)
    ) {
      this.setState({ isOpen: false });
    }
  };

  componentDidMount() {
    window.addEventListener('click', this.handleGlobalClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleGlobalClick);
  }

  render() {
    const childrenAsArray = React.Children.toArray(this.props.children);
    const primaryOption =
      childrenAsArray.find(option => !option.props.isDisabled) ||
      childrenAsArray[0];

    invariant(
      childrenAsArray.length > 1,
      '@commercetools-local/ui-kit/dropdowns/primary-action-dropdown: must contain at least two options'
    );

    return (
      <div className={styles.wrapper}>
        <DropdownHead
          iconLeft={primaryOption.props.iconLeft}
          isDisabled={primaryOption.props.isDisabled}
          onClick={
            this.state.isOpen ? this.handleClose : primaryOption.props.onClick
          }
          chevron={
            <DropdownChevron
              buttonRef={dropdownButton => {
                this.dropdownButton = dropdownButton;
              }}
              onClick={this.state.isOpen ? this.handleClose : this.handleOpen}
              isDisabled={primaryOption.props.isDisabled}
              isOpen={this.state.isOpen}
              className={classnames(styles.primaryOptionChevron, {
                [styles.defaultPrimaryAction]: !primaryOption.props.isDisabled,
                [styles.disabledDropdownHeadChevron]:
                  primaryOption.props.isDisabled,
              })}
            />
          }
        >
          {primaryOption.props.children}
        </DropdownHead>
        {this.state.isOpen &&
          !primaryOption.props.isDisabled && (
            <Options>{childrenAsArray}</Options>
          )}
      </div>
    );
  }
}

export default PrimaryActionDropdown;
