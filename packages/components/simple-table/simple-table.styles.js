import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';

const Cell = styled.div`
  display: flex;
  align-items: center;

  ${props => {
    if (props.alignment === 'center') {
      return `
      justify-content: center;
      text-align: center
      `;
    }
    if (props.alignment === 'right') {
      return `
      justify-content: flex-end;
      text-align: right;
      `;
    }
    return `
      justify-content: flex-start;
      text-align: left;
      `;
  }};

  padding: ${props => (props.isCondensed ? '2px 4px' : '8px 16px')};
`;

const Grid = styled.div`
  display: grid;
  /* stylelint-disable function-whitespace-after */
  grid-template-columns: ${props =>
    props.columns.map(column => column.width || 'auto').join(' ')};
  /* stylelint-enable function-whitespace-after */
  border-top: 1px solid ${vars.colorNeutral90};
  border-left: 1px solid ${vars.colorNeutral90};

  ${Cell} {
    border-right: 1px solid ${vars.colorNeutral90};
    border-bottom: 1px solid ${vars.colorNeutral90};
  }

  ${props => (props.maxHeight ? `max-height: ${props.maxHeight}px;` : '')}
  ${props =>
    props.maxWidth ? `max-width: ${props.maxWidth}px;` : ''}

  overflow: auto;
`;

const Header = styled.div`
  color: ${vars.colorSurface};
  background-color: ${vars.colorAccent};

  position: ${props => (props.isSticky ? 'sticky' : 'static')};
  top: 0;
`;

export { Grid, Cell, Header };
