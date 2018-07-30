import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../.storybook/decorators/section';
import FormikBox from '../../.storybook/decorators/formik-box';
import PrimaryButton from '../../buttons/primary-button';
import SecondaryButton from '../../buttons/secondary-button';
import Spacings from '../../materials/spacings';
import Readme from './README.md';
import SelectInput from './select-input';

// This intermediate component is nice-to-have.
// Its job is to encapsulate the select component.
// It contains the options, and it will make the parent form unaware of the
// { value, label } shape used to represent the options.
// This works best when all options are known upfront, but is a bit harder
// when the options are loaded dynamically.
class StateDropdown extends React.Component {
  static displayName = 'StateDropdown';
  static propTypes = {
    isMulti: PropTypes.bool.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
  };
  render() {
    const stateOptions = [
      { value: 'ready', label: 'Ready' },
      { value: 'shipped', label: 'Shipped' },
      { value: 'delivered', label: 'Delivered' },
      { value: 'returned', label: 'Returned' },
    ];
    return (
      <SelectInput
        name="state"
        isMulti={this.props.isMulti}
        value={
          // When used for a feature, the isMulti switch would not exist,
          // as you'd either use the singular or the multi version, so
          // you would not need this ternary.
          this.props.isMulti
            ? stateOptions.filter(option =>
                this.props.value.includes(option.value)
              )
            : stateOptions.find(option => option.value === this.props.value)
        }
        onChange={event =>
          this.props.onChange({
            ...event,
            target: {
              ...event.target,
              value:
                // When used for a feature, the isMulti switch would not exist,
                // as you'd either use the singular or the multi version, so
                // you would not need this ternary.
                this.props.isMulti
                  ? event.target.value.map(option => option.value)
                  : event.target.value.value,
            },
          })
        }
        onBlur={this.props.onBlur}
        options={stateOptions}
        isSearchable={false}
      />
    );
  }
}

storiesOf('Examples|Forms/Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('SelectInput', () => {
    const isMulti = boolean('Use multi-value select input', false);
    return (
      <Section>
        <Formik
          key={isMulti}
          initialValues={{ state: isMulti ? ['ready'] : 'ready' }}
          onSubmit={(values, formik, ...rest) => {
            action('onSubmit')(values, formik, ...rest);
            formik.resetForm(values);
          }}
          render={formik => (
            <Spacings.Stack scale="l">
              <StateDropdown
                name="state"
                isMulti={isMulti}
                value={formik.values.state}
                onChange={formik.handleChange}
              />
              <Spacings.Inline>
                <SecondaryButton
                  onClick={formik.handleReset}
                  isDisabled={formik.isSubmitting}
                  label="Reset"
                />
                <PrimaryButton
                  onClick={formik.handleSubmit}
                  isDisabled={formik.isSubmitting || !formik.dirty}
                  label="Submit"
                />
              </Spacings.Inline>
              <hr />
              <FormikBox formik={formik} />
            </Spacings.Stack>
          )}
        />
      </Section>
    );
  });
