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
  it('should set the id as an attribute of the container', () => {
    const { container } = render(
      <FieldWarnings
        id="test-id"
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
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(container.querySelector('#test-id')).toBeInTheDocument();
  });
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
});
