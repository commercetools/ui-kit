import { useEffect } from 'react';

// To avoid getting the following error, we type the entire function.
//   "Assertions require every name in the call target to be declared with an explicit type annotation."
// See https://github.com/microsoft/TypeScript/pull/33622#issuecomment-575301357
type TWarningFunction = (
  condition: unknown,
  message?: string,
  prefix?: string
) => asserts condition is boolean;

const isProduction: boolean = process.env.NODE_ENV === 'production';

// Throw an error if the condition fails
// Strip out error messages for production
// > Not providing an inline default argument for message as the result is smaller
export const warning: TWarningFunction = (
  condition,
  message,
  prefix = 'Warning'
) => {
  if (isProduction || condition) {
    return;
  }

  console.warn(`${prefix}: ${message}`);
};

export const useWarning = (condition: boolean, message: string) => {
  useEffect(() => {
    warning(condition, message);
  }, []);
};
