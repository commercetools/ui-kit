// To avoid getting the following error, we type the entire function.
//   "Assertions require every name in the call target to be declared with an explicit type annotation."
// See https://github.com/microsoft/TypeScript/pull/33622#issuecomment-575301357
type TWarningFunction = (
  condition: unknown,
  message?: string
) => asserts condition is boolean;

const isProduction: boolean = process.env.NODE_ENV === 'production';
// @TODO: allow consumer to set the prefix e.g `[ Text.Body ]`
const prefix: string = 'Warning';

// Throw an error if the condition fails
// Strip out error messages for production
// > Not providing an inline default argument for message as the result is smaller
const warning: TWarningFunction = (condition, message) => {
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
