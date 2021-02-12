const isProduction: boolean = process.env.NODE_ENV === 'production';
// @TODO: allow consumer to set the prefix e.g `[ Text.Body ]`
const prefix: string = 'Warning';

// Throw an error if the condition fails
// Strip out error messages for production
// > Not providing an inline default argument for message as the result is smaller
const warning = (condition: unknown, message?: string): asserts condition => {
  if (isProduction) {
    return;
  }

  if (condition) {
    return;
  }

  // Condition not passed
  // When not in production we allow the message to pass through
  // *This block will be removed in production builds*
  throw new Error(`${prefix}: ${message || ''}`);
};
export default warning;
