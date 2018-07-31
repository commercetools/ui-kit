import React from 'react';
import { IntlProvider } from 'react-intl';

export default storyFn => <IntlProvider locale="en">{storyFn()}</IntlProvider>;
