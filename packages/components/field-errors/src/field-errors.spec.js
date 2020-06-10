import React from 'react';
import FieldErrors from './field-errors';
import { render } from '../../../../test/test-utils';

describe('errorTypes', () => {
  it('should export errorTypes', () => {
    expect(FieldErrors.errorTypes.MISSING).toBe('missing');
    expect(FieldErrors.errorTypes.NEGATIVE).toBe('negative');
    expect(FieldErrors.errorTypes.FRACTIONS).toBe('fractions');
  });

  it('should render the "missing" error', () => {
    const { container } = render(
      <FieldErrors
        errors={{ [FieldErrors.errorTypes.MISSING]: true }}
        isVisible={true}
      />
    );
    expect(container).toHaveTextContent(/field is required/i);
  });

  it('should render the "negative" error', () => {
    const { container } = render(
      <FieldErrors
        errors={{ [FieldErrors.errorTypes.NEGATIVE]: true }}
        isVisible={true}
      />
    );
    expect(container).toHaveTextContent(/negative/i);
  });

  it('should render the "fractions" error', () => {
    const { container } = render(
      <FieldErrors
        errors={{ [FieldErrors.errorTypes.FRACTIONS]: true }}
        isVisible={true}
      />
    );
    expect(container).toHaveTextContent(/whole number/i);
  });
});

describe('when not visible', () => {
  it('should render no errors', () => {
    const { container } = render(
      <FieldErrors
        errors={{ [FieldErrors.errorTypes.MISSING]: true }}
        isVisible={false}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });
});

describe('error renderers', () => {
  it('should give highest importance to renderError', () => {
    const { container } = render(
      <FieldErrors
        errors={{ [FieldErrors.errorTypes.MISSING]: true }}
        isVisible={true}
        renderError={(key) =>
          key === FieldErrors.errorTypes.MISSING ? 'RENDER_ERROR' : null
        }
        renderDefaultError={(key) =>
          key === FieldErrors.errorTypes.MISSING ? 'RENDER_DEFAULT_ERROR' : null
        }
      />
    );
    expect(container).toHaveTextContent('RENDER_ERROR');
  });

  it('should give second highest importance to renderDefaultError', () => {
    const { container } = render(
      <FieldErrors
        errors={{ [FieldErrors.errorTypes.MISSING]: true }}
        isVisible={true}
        renderError={() => null}
        renderDefaultError={(key) =>
          key === FieldErrors.errorTypes.MISSING ? 'RENDER_DEFAULT_ERROR' : null
        }
      />
    );
    expect(container).toHaveTextContent('RENDER_DEFAULT_ERROR');
  });

  it('should fall back to internal error handling', () => {
    const { container } = render(
      <FieldErrors
        errors={{ [FieldErrors.errorTypes.MISSING]: true }}
        isVisible={true}
        renderError={() => null}
        renderDefaultError={() => null}
      />
    );
    expect(container).toHaveTextContent(/required/i);
  });
});
