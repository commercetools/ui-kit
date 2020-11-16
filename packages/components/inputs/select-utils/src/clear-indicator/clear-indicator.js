import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useIntl } from 'react-intl';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { CloseIcon } from '@commercetools-uikit/icons';
import messages from './messages';

const ClearIndicator = (props) => {
  const intl = useIntl();
  const {
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <button
      {...restInnerProps}
      ref={ref}
      css={css`
        border: none;
        cursor: pointer;
        background: none;
        box-sizing: border-box;
        text-decoration: none;
        :hover svg * {
          fill: ${vars.colorWarning};
        }
      `}
      style={getStyles('clearIndicator', props)}
      title={intl.formatMessage(messages.clearButtonLabel)}
      aria-label={intl.formatMessage(messages.clearButtonLabel)}
    >
      <CloseIcon color="solid" size="medium" />
    </button>
  );
};

ClearIndicator.displayName = 'ClearIndicator';
ClearIndicator.propTypes = {
  innerProps: PropTypes.object,
  getStyles: PropTypes.func.isRequired,
};

export default ClearIndicator;
