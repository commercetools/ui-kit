import Link from '@commercetools-uikit/link';

const Example = () => <Link to={'/foo/bar'}>Go to foo bar</Link>;
const ExampleWithExternal = () => (
  <Link isExternal={true} to={'https://kanyetothe.com'}>
    Go to external link
  </Link>
);

export default Example;
