import FieldWarnings from './field-warnings';
import { screen, render } from '../../../../test/test-utils';

describe('when not visible', () => {
  it('should render no warnings', () => {
    const { container } = render(
      <FieldWarnings warninings={{}} isVisible={false} />
    );
    expect(container).toBeEmptyDOMElement();
  });
});

describe('warning renderers', () => {
  it('should give highest importance to renderWarning', () => {
    render(
      <FieldWarnings
        warnings={{ customWarning: true }}
        isVisible={true}
        renderWarning={(key) =>
          key === 'customWarning' ? 'RENDER_WARNING' : null
        }
        renderDefaultWarning={(key) =>
          key === 'defaultWarning' ? 'RENDER_DEFAULT_WARNING' : null
        }
      />
    );
    expect(screen.getByText('RENDER_WARNING')).toBeInTheDocument();
  });

  it('should give second highest importance to renderDefaultWarning', () => {
    render(
      <FieldWarnings
        warnings={{ defaultWarning: true }}
        isVisible={true}
        renderWarning={() => null}
        renderDefaultWarning={(key) =>
          key === 'defaultWarning' ? 'RENDER_DEFAULT_WARNING' : null
        }
      />
    );
    expect(screen.getByText('RENDER_DEFAULT_WARNING')).toBeInTheDocument();
  });
  // note: these generated id's should stay the same as long as more tests are not added before it,
  // if tests are added, please also update the id values in this describe block
  describe('when props.id is not passed', () => {
    it('should generate a sequential id internally for use in the fieldId', () => {
      const { container } = render(
        <FieldWarnings
          renderWarning={(key) =>
            key === 'customWarning' ? 'RENDER_WARNING' : null
          }
          renderDefaultWarning={(key) =>
            key === 'defaultWarning' ? 'RENDER_DEFAULT_WARNING' : null
          }
          warnings={{ defaultWarning: true, customWarning: true }}
          isVisible={true}
        />
      );

      expect(
        container.querySelector('#ui-kit-field-warning-4-0')
      ).toBeInTheDocument();
    });
    it('should generate unique ids for each error', () => {
      const { container } = render(
        <FieldWarnings
          renderWarning={(key) =>
            key === 'customWarning' ? 'RENDER_WARNING' : null
          }
          renderDefaultWarning={(key) =>
            key === 'defaultWarning' ? 'RENDER_DEFAULT_WARNING' : null
          }
          warnings={{ defaultWarning: true, customWarning: true }}
          isVisible={true}
        />
      );

      expect(
        container.querySelector('#ui-kit-field-warning-5-0')
      ).toBeInTheDocument();
      expect(
        container.querySelector('#ui-kit-field-warning-5-1')
      ).toBeInTheDocument();
    });
  });
  describe('when props.id is passed', () => {
    it('should use the provided id in the fieldId', () => {
      const { container } = render(
        <FieldWarnings
          id={'super-cool-id'}
          renderWarning={(key) =>
            key === 'customWarning' ? 'RENDER_WARNING' : null
          }
          renderDefaultWarning={(key) =>
            key === 'defaultWarning' ? 'RENDER_DEFAULT_WARNING' : null
          }
          warnings={{ defaultWarning: true, customWarning: true }}
          isVisible={true}
        />
      );
      expect(container.querySelector('#super-cool-id-0')).toBeInTheDocument();
    });
    it('should generate unique ids for each error', () => {
      const { container } = render(
        <FieldWarnings
          id={'super-cool-id'}
          renderWarning={(key) =>
            key === 'customWarning' ? 'RENDER_WARNING' : null
          }
          renderDefaultWarning={(key) =>
            key === 'defaultWarning' ? 'RENDER_DEFAULT_WARNING' : null
          }
          warnings={{ defaultWarning: true, customWarning: true }}
          isVisible={true}
        />
      );
      expect(container.querySelector('#super-cool-id-0')).toBeInTheDocument();
      expect(container.querySelector('#super-cool-id-1')).toBeInTheDocument();
    });
  });
});
