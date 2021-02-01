import React from 'react';
import PropTypes from 'prop-types';
import { css, useTheme } from '@emotion/react';

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
