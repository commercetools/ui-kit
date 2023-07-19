import { Component } from 'react';
import PropTypes from 'prop-types';
import Text from '../../../../packages/components/text';
import SpacingsStack from '../../../../packages/components/spacings/spacings-stack';

export default class FormikBox extends Component {
  static displayName = 'FormikBox';
  static propTypes = {
    formik: PropTypes.shape({
      values: PropTypes.object,
      touched: PropTypes.object,
      errors: PropTypes.object,
    }).isRequired,
  };
  render() {
    return (
      <SpacingsStack scale="l">
        <div>
          <Text.Subheadline as="h4">formik.values</Text.Subheadline>
          <pre>{JSON.stringify(this.props.formik.values, null, 2)}</pre>
        </div>
        <div>
          <Text.Subheadline as="h4">formik.touched</Text.Subheadline>
          <pre>{JSON.stringify(this.props.formik.touched, null, 2)}</pre>
        </div>
        <div>
          <Text.Subheadline as="h4">formik.errors</Text.Subheadline>
          <pre>{JSON.stringify(this.props.formik.errors, null, 2)}</pre>
        </div>
      </SpacingsStack>
    );
  }
}
