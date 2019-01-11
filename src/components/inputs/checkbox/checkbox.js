import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import createSequentialId from '../../../utils/create-sequential-id';
import Text from '../../typography/text';
import Spacings from '../../spacings';
import Icons from './icons';
import styles from './checkbox.mod.css';

const sequentialId = createSequentialId('checkbox-');

export class Checkbox extends React.PureComponent {
  static displayName = 'Checkbox';
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    isChecked: PropTypes.bool,
    isIndeterminate: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    // This prop forces Checkbox to be rendered in a hovered state (thought isDisabled takes
    // precedence over that). We need that to address a use-case when hovering is comming
    // from somewhere up the hierarchy. There is no need to touch this prop in case
    // all you need is a general highlighting on hover of Checkbox body, which is solved
    // by a corresponding :hover selector in the syles of this component.
    isHovered: PropTypes.bool,
    isDisabled: PropTypes.bool,
    hasError: PropTypes.bool,
    children: PropTypes.node,
  };

  static defaultProps = {
    isChecked: false,
    isDisabled: false,
    hasError: false,
  };

  state = {
    // We generate an id in case no id is provided by the parent to attach the
    // label to the input component.
    id: this.props.id,
  };

  static getDerivedStateFromProps = (props, state) => ({
    id: do {
      if (props.id) props.id;
      else if (state.id) state.id;
      else sequentialId();
    },
  });

  render() {
    return (
      <div>
        <label
          htmlFor={this.state.id}
          className={classnames(styles.labelWrapper, {
            [styles.labelWrapperDisabled]: this.props.isDisabled,
            [styles.labelWrapperError]: this.props.hasError,
          })}
        >
          <Spacings.Inline alignItems="center">
            <div
              className={classnames(styles.checkboxWrapper, {
                [styles.isDisabled]: this.props.isDisabled,
                [styles.isHovered]:
                  this.props.isHovered &&
                  !this.props.isDisabled &&
                  !this.props.hasError,
                [styles.hasError]: this.props.hasError,
              })}
            >
              {(() => {
                if (this.props.isIndeterminate) return <Icons.Indeterminate />;
                if (this.props.isChecked) return <Icons.Checked />;
                return <Icons.Unchecked />;
              })()}
            </div>
            {this.props.children && (
              <Text.Body
                // FIXME: add proper tones when we have disabled/primary in tones
                tone={this.props.isDisabled ? 'secondary' : undefined}
              >
                {this.props.children}
              </Text.Body>
            )}
            <input
              className={styles.inputWrapper}
              id={this.state.id}
              name={this.props.name}
              value={this.props.value}
              onChange={this.props.onChange}
              disabled={this.props.isDisabled}
              checked={this.props.isChecked && !this.props.isIndeterminate}
              type="checkbox"
              {...filterDataAttributes(this.props)}
            />
          </Spacings.Inline>
        </label>
      </div>
    );
  }
}

export default Checkbox;
