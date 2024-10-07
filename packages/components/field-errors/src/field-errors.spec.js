import FieldErrors from './field-errors';
import { screen, render } from '../../../../test/test-utils';

describe('errorTypes', () => {
  it('should export errorTypes', () => {
    expect(FieldErrors.errorTypes.MISSING).toBe('missing');
    expect(FieldErrors.errorTypes.NEGATIVE).toBe('negative');
    expect(FieldErrors.errorTypes.FRACTIONS).toBe('fractions');
  });

  it('should render the "missing" error', () => {
    render(
      <FieldErrors
        errors={{ [FieldErrors.errorTypes.MISSING]: true }}
        isVisible={true}
      />
    );
    expect(screen.getByText(/field is required/i)).toBeInTheDocument();
  });

  it('should render the "negative" error', () => {
    render(
      <FieldErrors
        errors={{ [FieldErrors.errorTypes.NEGATIVE]: true }}
        isVisible={true}
      />
    );
    expect(screen.getByText(/negative/i)).toBeInTheDocument();
  });

  it('should render the "fractions" error', () => {
    render(
      <FieldErrors
        errors={{ [FieldErrors.errorTypes.FRACTIONS]: true }}
        isVisible={true}
      />
    );
    expect(screen.getByText(/whole number/i)).toBeInTheDocument();
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
    render(
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
    expect(screen.getByText('RENDER_ERROR')).toBeInTheDocument();
  });

  it('should give second highest importance to renderDefaultError', () => {
    render(
      <FieldErrors
        errors={{ [FieldErrors.errorTypes.MISSING]: true }}
        isVisible={true}
        renderError={() => null}
        renderDefaultError={(key) =>
          key === FieldErrors.errorTypes.MISSING ? 'RENDER_DEFAULT_ERROR' : null
        }
      />
    );
    expect(screen.getByText('RENDER_DEFAULT_ERROR')).toBeInTheDocument();
  });

  it('should fall back to internal error handling', () => {
    render(
      <FieldErrors
        errors={{ [FieldErrors.errorTypes.MISSING]: true }}
        isVisible={true}
        renderError={() => null}
        renderDefaultError={() => null}
      />
    );
    expect(screen.getByText(/required/i)).toBeInTheDocument();
  });
  // note: these generated id's should stay the same as long as more tests are not added before it,
  // if tests are added, please also update the id values in this describe block
  describe('when props.id is not passed', () => {
    it('should generate a sequential id internally for use in the fieldId', () => {
      const { container } = render(
        <FieldErrors
          errors={{ [FieldErrors.errorTypes.MISSING]: true }}
          isVisible={true}
        />
      );
      expect(
        container.querySelector('#ui-kit-field-error-8-0')
      ).toBeInTheDocument();
    });
    it('should generate unique ids for each error', () => {
      const { container } = render(
        <FieldErrors
          errors={{
            [FieldErrors.errorTypes.MISSING]: true,
            [FieldErrors.errorTypes.FRACTIONS]: true,
          }}
          isVisible={true}
        />
      );

      expect(
        container.querySelector('#ui-kit-field-error-9-0')
      ).toBeInTheDocument();
      expect(
        container.querySelector('#ui-kit-field-error-9-1')
      ).toBeInTheDocument();
    });
  });
  describe('when props.id is passed', () => {
    it('should use the provided id in the fieldId', () => {
      const { container } = render(
        <FieldErrors
          id={'super-cool-id'}
          errors={{ [FieldErrors.errorTypes.MISSING]: true }}
          isVisible={true}
        />
      );
      expect(container.querySelector('#super-cool-id-0')).toBeInTheDocument();
    });
    it('should generate unique ids for each error', () => {
      const { container } = render(
        <FieldErrors
          id={'super-cool-id'}
          errors={{
            [FieldErrors.errorTypes.MISSING]: true,
            [FieldErrors.errorTypes.FRACTIONS]: true,
          }}
          isVisible={true}
        />
      );
      expect(container.querySelector('#super-cool-id-0')).toBeInTheDocument();
      expect(container.querySelector('#super-cool-id-1')).toBeInTheDocument();
    });
  });
});
