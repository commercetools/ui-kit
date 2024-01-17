import FieldWarnings from '../src/field-warnings';

const Example = () => (
  // This example shows how to handle custom warnings on top of the
  // predefined warnings of FieldWarnings which this component and other
  // Field components use under the hood.
  <FieldWarnings
    warnings={{
      customWarning: true,
      defaultWarning: true,
    }}
    isVisible={true}
    renderWarning={(key) => {
      switch (key) {
        case 'customWarning':
          return 'The current password is weak, You may want to use a stronger password';
        default:
          // When null is returned then the default warning handling from
          // renderDefaultWarning will kick in for that warning.
          return null;
      }
    }}
    renderDefaultWarning={(key) => {
      switch (key) {
        case 'defaultWarning':
          return 'Always use a strong password';
        default:
          // When null is returned then the warning handling defined in
          // FieldWarning itself will kick in
          return null;
      }
    }}
  />
);

export default Example;
