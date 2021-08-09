import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import messages from '@commercetools-uikit/i18n/compiled-data/en.json';

const Suite = (props) => (
  <IntlProvider locale="en" messages={messages}>
    <div>{props.children}</div>
  </IntlProvider>
);
Suite.propTypes = {
  children: PropTypes.node,
};
Suite.displayName = 'Suite';

export default Suite;
