import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import enMessages from '../../dist/ui-kit.esm/en';

addLocaleData(en);

const Suite = props => (
  <IntlProvider locale="en" messages={enMessages}>
    <div>{props.children}</div>
  </IntlProvider>
);
Suite.propTypes = {
  children: PropTypes.node,
};
Suite.displayName = 'Suite';

export default Suite;
