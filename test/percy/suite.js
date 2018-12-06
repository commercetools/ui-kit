import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import { i18n as messages } from '../../dist/ui-kit.esm';

addLocaleData(en);

const Suite = props => (
  <Router>
    <IntlProvider locale="en" messages={messages.en}>
      <div>{props.children}</div>
    </IntlProvider>
  </Router>
);
Suite.propTypes = {
  children: PropTypes.node,
};
Suite.displayName = 'Suite';

export default Suite;
