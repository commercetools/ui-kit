import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';

const Section = (props) => {
  return (
    <div
      css={css`
        background-color: ${designTokens.colorSurface};
        padding: 16px;
      `}
    >
      {props.children}
    </div>
  );
};

Section.propTypes = { children: PropTypes.node.isRequired };

export default Section;
