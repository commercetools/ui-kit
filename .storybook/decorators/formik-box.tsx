import React from 'react';
import Text from '../../packages/components/text';
import SpacingsStack from '../../packages/components/spacings/spacings-stack';

type TFormikBoxProps = {
  formik: {
    values: Record<string, unknown>;
    touched: Record<string, boolean>;
    errors: Record<string, string>;
  };
};

export default class FormikBox extends React.Component<TFormikBoxProps> {
  static displayName = 'FormikBox';

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
