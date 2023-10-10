import { warning } from '@commercetools-uikit/utils';
import { screen, render } from '../../../../test/test-utils';
import Text from './text';

jest.mock('@commercetools-uikit/utils', () => ({
  ...jest.requireActual('@commercetools-uikit/utils'),
  warning: jest.fn(),
}));

const intlMessage = { id: 'Title', defaultMessage: 'Hello' };

describe('exports', () => {
  it('should export 5 components', () => {
    expect(Object.keys(Text)).toHaveLength(5);
  });
  it('should export <Headline> component', () => {
    expect(Text).toHaveProperty('Headline');
  });
  it('should export <Subheadline> component', () => {
    expect(Text).toHaveProperty('Subheadline');
  });
  it('should export <Wrap> component', () => {
    expect(Text).toHaveProperty('Wrap');
  });
  it('should export <Body> component', () => {
    expect(Text).toHaveProperty('Body');
  });
  it('should export <Detail> component', () => {
    expect(Text).toHaveProperty('Detail');
  });
});

describe('<Headline>', () => {
  it('should render element tag h1', () => {
    render(
      <Text.Headline as="h1" title="tooltip text">
        Title
      </Text.Headline>
    );

    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('should render given text', () => {
    render(
      <Text.Headline as="h1" title="tooltip text">
        Title
      </Text.Headline>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('should render given text with react-intl', () => {
    render(
      <Text.Headline as="h1" title="tooltip text" intlMessage={intlMessage} />
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should set `title` attribute', () => {
    render(
      <Text.Headline as="h1" title="tooltip text">
        Title
      </Text.Headline>
    );
    expect(screen.getByTitle('tooltip text')).toBeInTheDocument();
  });

  it('should forward data attributes', () => {
    render(
      <Text.Headline as="h1" data-foo="bar" title="headline">
        Title
      </Text.Headline>
    );
    expect(screen.getByTitle('headline')).toHaveAttribute('data-foo', 'bar');
  });
  describe('when no text is provided', () => {
    it('should warn but not crash', () => {
      render(<Text.Headline as="h1" />);
      expect(warning).toHaveBeenCalledTimes(2);
      expect(warning).toHaveBeenCalledWith(
        expect.any(Boolean),
        expect.stringMatching(/is marked as required in/i)
      );
      expect(warning).toHaveBeenCalledWith(
        expect.any(Boolean),
        expect.stringMatching(/TextHeadline/i)
      );
    });
  });
});

describe('<Subheadline>', () => {
  it('should render element tag h4', () => {
    render(
      <Text.Subheadline as="h4" title="tooltip text">
        Title
      </Text.Subheadline>
    );
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('should render given text', () => {
    render(
      <Text.Subheadline as="h4" title="tooltip text">
        Subtitle
      </Text.Subheadline>
    );
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
  });

  it('should render given text with react-intl', () => {
    render(
      <Text.Subheadline
        as="h4"
        title="tooltip text"
        intlMessage={intlMessage}
      />
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should set `title` attribute', () => {
    render(
      <Text.Subheadline as="h4" title="tooltip text">
        Title
      </Text.Subheadline>
    );
    expect(screen.getByTitle('tooltip text')).toBeInTheDocument();
  });

  it('should forward data attributes', () => {
    render(
      <Text.Subheadline as="h4" data-foo="bar" title="subheadline">
        Title
      </Text.Subheadline>
    );
    expect(screen.getByTitle('subheadline')).toHaveAttribute('data-foo', 'bar');
  });
  describe('when no text is provided', () => {
    it('should warn but not crash', () => {
      render(<Text.Subheadline as="h4" />);
      expect(warning).toHaveBeenCalledTimes(2);
      expect(warning).toHaveBeenCalledWith(
        expect.any(Boolean),
        expect.stringMatching(/is marked as required in/i)
      );
      expect(warning).toHaveBeenCalledWith(
        expect.any(Boolean),
        expect.stringMatching(/TextSubheadline/i)
      );
    });
  });
});

describe('<Wrap>', () => {
  it('should render given text', () => {
    render(<Text.Wrap title="tooltip text">Text</Text.Wrap>);
    expect(screen.getByText('Text')).toBeInTheDocument();
  });

  it('should render given text with react-intl', () => {
    render(<Text.Wrap title="tooltip text" intlMessage={intlMessage} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should set `title` attribute', () => {
    render(<Text.Wrap title="tooltip text">Title</Text.Wrap>);
    expect(screen.getByTitle('tooltip text')).toBeInTheDocument();
  });

  it('should forward data attributes', () => {
    render(
      <Text.Wrap data-foo="bar" title="wrap">
        Title
      </Text.Wrap>
    );
    expect(screen.getByTitle('wrap')).toHaveAttribute('data-foo', 'bar');
  });
  describe('when no text is provided', () => {
    it('should warn but not crash', () => {
      render(<Text.Wrap />);
      expect(warning).toHaveBeenCalledTimes(2);
      expect(warning).toHaveBeenCalledWith(
        expect.any(Boolean),
        expect.stringMatching(/is marked as required in/i)
      );
      expect(warning).toHaveBeenCalledWith(
        expect.any(Boolean),
        expect.stringMatching(/TextWrap/i)
      );
    });
  });
});

describe('<Body>', () => {
  it('should render element tag p', () => {
    const { container } = render(
      <Text.Body title="tooltip text">Body</Text.Body>
    );
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  it('should render given text', () => {
    render(<Text.Body title="tooltip text">Text</Text.Body>);
    expect(screen.getByText('Text')).toBeInTheDocument();
  });

  it('should render given text with react-intl', () => {
    render(<Text.Body title="tooltip text" intlMessage={intlMessage} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should forward data attributes', () => {
    render(
      <Text.Body data-foo="bar" title="body">
        Title
      </Text.Body>
    );
    expect(screen.getByTitle('body')).toHaveAttribute('data-foo', 'bar');
  });

  describe('when `as` prop is set to `span`', () => {
    it('should render as a span', () => {
      const { container } = render(
        <Text.Body title="tooltip text" as="span">
          Body
        </Text.Body>
      );
      expect(container.querySelector('span')).toBeInTheDocument();
    });

    it('should render given text with react-intl', () => {
      render(
        <Text.Body title="tooltip text" intlMessage={intlMessage} as="span" />
      );
      expect(screen.getByText('Hello')).toBeInTheDocument();
    });
  });
  describe('when no text is provided', () => {
    it('should warn but not crash', () => {
      render(<Text.Body />);
      expect(warning).toHaveBeenCalledTimes(2);
      expect(warning).toHaveBeenCalledWith(
        expect.any(Boolean),
        expect.stringMatching(/is marked as required in/i)
      );
      expect(warning).toHaveBeenCalledWith(
        expect.any(Boolean),
        expect.stringMatching(/TextBody/i)
      );
    });
  });
});

describe('<Detail>', () => {
  it('should render element tag div', () => {
    const { container } = render(
      <Text.Detail title="tooltip text">{'Detail'}</Text.Detail>
    );
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('should render given text', () => {
    render(<Text.Detail title="tooltip text">Text</Text.Detail>);
    expect(screen.getByText('Text')).toBeInTheDocument();
  });

  it('should render given text with react-intl', () => {
    render(<Text.Detail title="tooltip text" intlMessage={intlMessage} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should forward data attributes', () => {
    render(
      <Text.Detail data-foo="bar" title="detail">
        Title
      </Text.Detail>
    );
    expect(screen.getByTitle('detail')).toHaveAttribute('data-foo', 'bar');
  });
  describe('when `as` is defined', () => {
    describe('as `span`', () => {
      it('should render element tag `span`', () => {
        const { container } = render(
          <Text.Detail as="span" title="tooltip text">
            {'Detail'}
          </Text.Detail>
        );
        expect(container.querySelector('span')).toBeInTheDocument();
      });
    });
    describe('as `small`', () => {
      it('should render element tag `small`', () => {
        const { container } = render(
          <Text.Detail as="small" title="tooltip text">
            {'Detail'}
          </Text.Detail>
        );
        expect(container.querySelector('small')).toBeInTheDocument();
      });
    });
  });
  describe('when no text is provided', () => {
    it('should warn but not crash', () => {
      render(<Text.Detail />);
      expect(warning).toHaveBeenCalledTimes(2);
      expect(warning).toHaveBeenCalledWith(
        expect.any(Boolean),
        expect.stringMatching(/is marked as required in/i)
      );
      expect(warning).toHaveBeenCalledWith(
        expect.any(Boolean),
        expect.stringMatching(/TextDetail/i)
      );
    });
  });

  describe('when aria-labelledby attribute is provided', () => {
    it('should use the attribute and link the text to the label', () => {
      const labelId = 'text-detail-label';
      const labelText = 'Number of projects:';
      const textContent = '23';

      render(
        <div>
          <Text.Headline as="h2" id={labelId}>
            {labelText}
          </Text.Headline>
          <Text.Detail aria-labelledby={labelId}>{textContent}</Text.Detail>
        </div>
      );

      expect(screen.getByLabelText(labelText)).toHaveTextContent(textContent);
    });
  });
});

describe('<Caption>', () => {
  it('should render element tag div', () => {
    const { container } = render(
      <Text.Caption title="tooltip text">{'Caption'}</Text.Caption>
    );
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('should render given text', () => {
    render(<Text.Caption title="tooltip text">Text</Text.Caption>);
    expect(screen.getByText('Text')).toBeInTheDocument();
  });

  it('should render given text with react-intl', () => {
    render(<Text.Caption title="tooltip text" intlMessage={intlMessage} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should forward data attributes', () => {
    render(
      <Text.Caption data-foo="bar" title="caption">
        Title
      </Text.Caption>
    );
    expect(screen.getByTitle('caption')).toHaveAttribute('data-foo', 'bar');
  });
  describe('when no text is provided', () => {
    it('should warn but not crash', () => {
      render(<Text.Caption />);
      expect(warning).toHaveBeenCalledTimes(2);
      expect(warning).toHaveBeenCalledWith(
        expect.any(Boolean),
        expect.stringMatching(/is marked as required in/i)
      );
      expect(warning).toHaveBeenCalledWith(
        expect.any(Boolean),
        expect.stringMatching(/TextCaption/i)
      );
    });
  });
});
