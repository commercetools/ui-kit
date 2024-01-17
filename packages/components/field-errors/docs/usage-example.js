import FieldErrors from '@commercetools-uikit/field-errors';

const Example = () => (
  // This example shows how to handle custom errors on top of the
  // predefined errors of FieldErrors which this component and other
  // Field components use under the hood.
  <FieldErrors
    errors={{
      [FieldErrors.errors.MISSING]: true,
      duplicate: true,
      minLength: true,
    }}
    isVisible={true}
    renderError={(key) => {
      switch (key) {
        case 'duplicate':
          return 'This is already in use. It must be unique.';
        default:
          // When null is returned then the default error handling from
          // renderDefaultError will kick in for that error.
          return null;
      }
    }}
    renderDefaultError={(key) => {
      switch (key) {
        case 'minLength':
          return 'This is too short.';
        default:
          // When null is returned then the error handling defined in
          // FieldError itself will kick in
          return null;
      }
    }}
  />
);

export default Example;
