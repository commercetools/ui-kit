import { Link } from '@commercetools-frontend/ui-kit';
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
    <Spec label="intlMessage">
      <Link to="/" intlMessage={intlMessage} />
    </Spec>
    <Spec label="tone - inverted" backgroundColor="black">
      <Link to="/" tone="inverted">
        An inverted label text
      </Link>
    </Spec>
    <Spec label="tone - seconday">
      <Link to="/" tone="secondary">
        An seconday label text
      </Link>
    </Spec>
    <Spec label="Link respecting parent font-size">
      <div style={{ fontSize: 24 }}>
        <Link to="/">A label text</Link>
      </div>
    </Spec>
  </Suite>
);
