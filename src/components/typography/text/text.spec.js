import React from 'react';
import { render } from '../../../../test/test-utils';
import Text from './text';

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
    const { container } = render(
      <Text.Headline as="h1" title="tooltip text">
        {'Title'}
      </Text.Headline>
    );

    expect(container.querySelector('h1')).toBeInTheDocument();
  });

  it('should render given text', () => {
    const { container } = render(
      <Text.Headline as="h1" title="tooltip text">
        {'Title'}
      </Text.Headline>
    );
    expect(container).toHaveTextContent('Title');
  });

  it('should render given text with react-intl', () => {
    const { container } = render(
      <Text.Headline as="h1" title="tooltip text" intlMessage={intlMessage} />
    );
    expect(container).toHaveTextContent('Hello');
  });

  it('should set `title` attribute', () => {
    const { queryByTitle } = render(
      <Text.Headline as="h1" title="tooltip text">
        {'Title'}
      </Text.Headline>
    );
    expect(queryByTitle('tooltip text')).toBeInTheDocument();
  });

  it('should forward data attriutes', () => {
    const { getByTitle } = render(
      <Text.Headline as="h1" data-foo="bar" title="headline">
        {'Title'}
      </Text.Headline>
    );
    expect(getByTitle('headline')).toHaveAttribute('data-foo', 'bar');
  });
  describe('when no text is provided', () => {
    let log;
    /* eslint-disable no-console */
    beforeEach(() => {
      log = console.error;
      console.error = jest.fn();
    });
    afterEach(() => {
      console.error = log;
    });
    it('should warn but not crash', () => {
      render(<Text.Headline as="h1" />);
      expect(console.error).toHaveBeenCalledWith(
        expect.stringMatching(
          /Warning: Failed prop type: The prop `intlMessage` is marked as required in `TextHeadline`, but its value is `undefined`/
        )
      );
      expect(console.error).toHaveBeenCalledWith(
        expect.stringMatching(
          /Warning: Failed prop type: The prop `children` is marked as required in `TextHeadline`, but its value is `undefined`/
        )
      );
    });
  });
});

describe('<Subheadline>', () => {
  it('should render element tag h4', () => {
    const { container } = render(
      <Text.Subheadline as="h4" title="tooltip text">
        {'Title'}
      </Text.Subheadline>
    );
    expect(container.querySelector('h4')).toBeInTheDocument();
  });

  it('should render given text', () => {
    const { container } = render(
      <Text.Subheadline as="h4" title="tooltip text">
        {'Subtitle'}
      </Text.Subheadline>
    );
    expect(container).toHaveTextContent('Subtitle');
  });

  it('should render given text with react-intl', () => {
    const { container } = render(
      <Text.Subheadline
        as="h4"
        title="tooltip text"
        intlMessage={intlMessage}
      />
    );
    expect(container).toHaveTextContent('Hello');
  });

  it('should set `title` attribute', () => {
    const { queryByTitle } = render(
      <Text.Subheadline as="h4" title="tooltip text">
        {'Title'}
      </Text.Subheadline>
    );
    expect(queryByTitle('tooltip text')).toBeInTheDocument();
  });

  it('should forward data attriutes', () => {
    const { getByTitle } = render(
      <Text.Subheadline as="h4" data-foo="bar" title="subheadline">
        {'Title'}
      </Text.Subheadline>
    );
    expect(getByTitle('subheadline')).toHaveAttribute('data-foo', 'bar');
  });
  describe('when no text is provided', () => {
    let log;
    /* eslint-disable no-console */
    beforeEach(() => {
      log = console.error;
      console.error = jest.fn();
    });
    afterEach(() => {
      console.error = log;
    });
    it('should warn but not crash', () => {
      render(<Text.Subheadline as="h4" />);
      expect(console.error).toHaveBeenCalledWith(
        expect.stringMatching(
          /Warning: Failed prop type: The prop `intlMessage` is marked as required in `TextSubheadline`, but its value is `undefined`/
        )
      );
      expect(console.error).toHaveBeenCalledWith(
        expect.stringMatching(
          /Warning: Failed prop type: The prop `children` is marked as required in `TextSubheadline`, but its value is `undefined`/
        )
      );
    });
  });
});

describe('<Wrap>', () => {
  it('should render given text', () => {
    const { container } = render(
      <Text.Wrap title="tooltip text">{'Text'}</Text.Wrap>
    );
    expect(container).toHaveTextContent('Text');
  });

  it('should render given text with react-intl', () => {
    const { container } = render(
      <Text.Wrap title="tooltip text" intlMessage={intlMessage} />
    );
    expect(container).toHaveTextContent('Hello');
  });

  it('should set `title` attribute', () => {
    const { queryByTitle } = render(
      <Text.Wrap title="tooltip text">{'Title'}</Text.Wrap>
    );
    expect(queryByTitle('tooltip text')).toBeInTheDocument();
  });

  it('should forward data attriutes', () => {
    const { getByTitle } = render(
      <Text.Wrap data-foo="bar" title="wrap">
        {'Title'}
      </Text.Wrap>
    );
    expect(getByTitle('wrap')).toHaveAttribute('data-foo', 'bar');
  });
  describe('when no text is provided', () => {
    let log;
    /* eslint-disable no-console */
    beforeEach(() => {
      log = console.error;
      console.error = jest.fn();
    });
    afterEach(() => {
      console.error = log;
    });
    it('should warn but not crash', () => {
      render(<Text.Wrap />);
      expect(console.error).toHaveBeenCalledWith(
        expect.stringMatching(
          /Warning: Failed prop type: The prop `intlMessage` is marked as required in `TextWrap`, but its value is `undefined`/
        )
      );
      expect(console.error).toHaveBeenCalledWith(
        expect.stringMatching(
          /Warning: Failed prop type: The prop `children` is marked as required in `TextWrap`, but its value is `undefined`/
        )
      );
    });
  });
});

describe('<Body>', () => {
  it('should render element tag p', () => {
    const { container } = render(
      <Text.Body title="tooltip text">{'Body'}</Text.Body>
    );
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  it('should render given text', () => {
    const { container } = render(
      <Text.Body title="tooltip text">{'Text'}</Text.Body>
    );
    expect(container).toHaveTextContent('Text');
  });

  it('should render given text with react-intl', () => {
    const { container } = render(
      <Text.Body title="tooltip text" intlMessage={intlMessage} />
    );
    expect(container).toHaveTextContent('Hello');
  });

  it('should forward data attriutes', () => {
    const { getByTitle } = render(
      <Text.Body data-foo="bar" title="body">
        {'Title'}
      </Text.Body>
    );
    expect(getByTitle('body')).toHaveAttribute('data-foo', 'bar');
  });

  describe('when `as` prop is set to `span`', () => {
    it('should render as a span', () => {
      const { container } = render(
        <Text.Body title="tooltip text" as="span">
          {'Body'}
        </Text.Body>
      );
      expect(container.querySelector('span')).toBeInTheDocument();
    });

    it('should render given text with react-intl', () => {
      const { container } = render(
        <Text.Body title="tooltip text" intlMessage={intlMessage} as="span" />
      );
      expect(container).toHaveTextContent('Hello');
    });
  });
  describe('when no text is provided', () => {
    let log;
    /* eslint-disable no-console */
    beforeEach(() => {
      log = console.error;
      console.error = jest.fn();
    });
    afterEach(() => {
      console.error = log;
    });
    it('should warn but not crash', () => {
      render(<Text.Body />);
      expect(console.error).toHaveBeenCalledWith(
        expect.stringMatching(
          /Warning: Failed prop type: The prop `intlMessage` is marked as required in `TextBody`, but its value is `undefined`/
        )
      );
      expect(console.error).toHaveBeenCalledWith(
        expect.stringMatching(
          /Warning: Failed prop type: The prop `children` is marked as required in `TextBody`, but its value is `undefined`/
        )
      );
    });
  });
});

describe('<Detail>', () => {
  it('should render element tag small', () => {
    const { container } = render(
      <Text.Detail title="tooltip text">{'Detail'}</Text.Detail>
    );
    expect(container.querySelector('small')).toBeInTheDocument();
  });

  it('should render given text', () => {
    const { container } = render(
      <Text.Detail title="tooltip text">{'Text'}</Text.Detail>
    );
    expect(container).toHaveTextContent('Text');
  });

  it('should render given text with react-intl', () => {
    const { container } = render(
      <Text.Detail title="tooltip text" intlMessage={intlMessage} />
    );
    expect(container).toHaveTextContent('Hello');
  });

  it('should forward data attriutes', () => {
    const { getByTitle } = render(
      <Text.Detail data-foo="bar" title="detail">
        {'Title'}
      </Text.Detail>
    );
    expect(getByTitle('detail')).toHaveAttribute('data-foo', 'bar');
  });
  describe('when no text is provided', () => {
    let log;
    /* eslint-disable no-console */
    beforeEach(() => {
      log = console.error;
      console.error = jest.fn();
    });
    afterEach(() => {
      console.error = log;
    });
    it('should warn but not crash', () => {
      render(<Text.Detail />);
      expect(console.error).toHaveBeenCalledWith(
        expect.stringMatching(
          /Warning: Failed prop type: The prop `intlMessage` is marked as required in `TextDetail`, but its value is `undefined`/
        )
      );
      expect(console.error).toHaveBeenCalledWith(
        expect.stringMatching(
          /Warning: Failed prop type: The prop `children` is marked as required in `TextDetail`, but its value is `undefined`/
        )
      );
    });
  });
});
