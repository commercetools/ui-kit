import React from 'react';
import { css } from '@emotion/react';
import { useTheme } from '@emotion/react';
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
