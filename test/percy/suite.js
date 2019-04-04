import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import messages from '../../i18n/data/en.json';

addLocaleData(en);

const Suite = props => (
  <IntlProvider locale="en" messages={messages}>
    <div>{props.children}</div>
  </IntlProvider>
);
Suite.propTypes = {
  children: PropTypes.node,
};
Suite.displayName = 'Suite';

export default Suite;
