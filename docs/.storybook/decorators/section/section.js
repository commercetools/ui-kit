import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';

const Section = (props) => {
  return (
    <div
      css={css`
        background-color: ${props.backgroundColor || designTokens.colorSurface};
        padding: 16px;
        text-align: ${props.align || 'left'};
      `}
    >
      {props.children}
    </div>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center', 'right']),
};

export default Section;
