const isProduction: boolean = process.env.NODE_ENV === 'production';
// @TODO: allow consumer to set the prefix e.g `[ Text.Body ]`
const prefix: string = 'Invariant failed';

// Throw an error if the condition fails
// Strip out error messages for production
// > Not providing an inline default argument for message as the result is smaller
const invariant = (condition: unknown, message?: string): asserts condition => {
  if (condition) {
    return;
  }
  // GIVEN product, suppress the message.
  if (isProduction) {
    return;
  }

  // Condition not passed
  // When not in production we allow the message to pass through
  // *This block will be removed in production builds*
  throw new Error(`${prefix}: ${message || ''}`);
};
export default invariant;
