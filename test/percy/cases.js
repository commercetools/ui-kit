import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import { i18n as messages } from '../../dist/ui-kit.esm';

addLocaleData(en);

const Cases = props => (
  <Router>
    <IntlProvider locale="en" messages={messages.en}>
      <div>{props.children}</div>
    </IntlProvider>
  </Router>
);
Cases.propTypes = {
  children: PropTypes.node,
};
Cases.displayName = 'Cases';

const Case = props => (
  <div>
    <div>{props.label}</div>
    {props.children}
  </div>
);

Case.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
};

Case.displayName = 'Case';

export { Cases, Case };
