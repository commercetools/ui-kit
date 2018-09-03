import React from 'react';
import PropTypes from 'prop-types';
import Spacings from '../../../src/materials/spacings';
import Text from '../../../src/components/typography/text';

export default class FormikBox extends React.Component {
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
      <Spacings.Stack scale="l">
        <div>
          <Text.Subheadline elementType="h4">formik.values</Text.Subheadline>
          <pre>{JSON.stringify(this.props.formik.values, null, 2)}</pre>
        </div>
        <div>
          <Text.Subheadline elementType="h4">formik.touched</Text.Subheadline>
          <pre>{JSON.stringify(this.props.formik.touched, null, 2)}</pre>
        </div>
        <div>
          <Text.Subheadline elementType="h4">formik.errors</Text.Subheadline>
          <pre>{JSON.stringify(this.props.formik.errors, null, 2)}</pre>
        </div>
      </Spacings.Stack>
    );
  }
}
