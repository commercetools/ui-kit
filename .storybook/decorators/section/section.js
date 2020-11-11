import React from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import PropTypes from 'prop-types';

const Section = (props) => {
  const theme = useTheme();
  return (
    <div
      css={css`
        background-color: ${theme.colorSurface};
        padding: 16px;
      `}
    >
      {props.children}
    </div>
  );
};

Section.propTypes = { children: PropTypes.node.isRequired };

export default Section;
