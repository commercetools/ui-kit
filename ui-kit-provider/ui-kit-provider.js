import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import deMessages from './de.json';

export default class UiKitProvider extends React.Component {
  static displayName = 'UiKitProvider';
  static propTypes = {
    locale: PropTypes.string.isRequired,
    children: PropTypes.node,
  };
  render() {
    return (
      <IntlProvider locale={this.props.locale} messages={deMessages}>
        {this.props.children}
      </IntlProvider>
    );
  }
}
