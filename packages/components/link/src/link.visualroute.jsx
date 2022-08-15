import { Link } from '@commercetools-frontend/ui-kit';
import { ThemeProvider } from '@commercetools-uikit/design-system';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/link';

const intlMessage = { id: 'link', defaultMessage: 'Link' };

export const component = () => (
  <Suite>
    <Spec label="regular">
      <Link to="/">A label text</Link>
    </Spec>
    <Spec label="external">
      <Link to="/" isExternal>
        A label text
      </Link>
    </Spec>
    <Spec label="with custom theme" listPropsOfNestedChild>
      <ThemeProvider scope="local" theme="vrtLink">
        <Link to="/">A label text</Link>
      </ThemeProvider>
    </Spec>
    <Spec label="intlMessage">
      <Link to="/" intlMessage={intlMessage} />
    </Spec>
    <Spec label="tone - inverted" theme="vrtDark">
      <Link to="/" tone="inverted">
        An inverted label text
      </Link>
    </Spec>
  </Suite>
);
