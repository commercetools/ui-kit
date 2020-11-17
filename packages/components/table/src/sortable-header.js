import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { AngleDownIcon, AngleUpIcon } from '@commercetools-uikit/icons';
import Text from '@commercetools-uikit/text';

/*
Logic of arrow indicating sort order is slightly complex:

+----------+-------------+---------------+------------+----------------+
| isActive | isMouseOver | sortDirection | arrowColor | arrowDirection |
+----------+-------------+---------------+------------+----------------+
|     0    |      0      |      n/a      |         *INVISIBLE*         |
+----------+-------------+---------------+-----------------------------+
|     0    |      1      |      n/a      |    grey    |      down      |
+----------+-------------+---------------+------------+----------------+
|     1    |      0      |      ASC      |    black   |      down      |
+----------+-------------+---------------+------------+----------------+
|     1    |      0      |      DESC     |    black   |       up       |
+----------+-------------+---------------+------------+----------------+
|     1    |      1      |      ASC      |    grey    |       up       |
+----------+-------------+---------------+------------+----------------+
|     1    |      1      |      DESC     |    grey    |      down      |
+----------+-------------+---------------+------------+----------------+

*/

const Span = styled.span`
  visibility: hidden; /* use visibility so react-virtualized can account for arrow-width on calcs */
  pointer-events: none; /* Do not unhover when on the icon */
  padding: 0 0 0 ${vars.spacingM};
`;

const containerDynamicStyles = (props) => {
  if (props.alignRight) {
    return css`
      flex-direction: row-reverse;
    `;
  }
  return css``;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    cursor: pointer;

    svg {
      transform: rotate(180deg);
    }

    * {
      fill: ${vars.colorNeutral};
    }
  }

  ${containerDynamicStyles}

  &:hover {
    ${Span} {
      visibility: visible;
    }
  }
`;

const SortableHeader = (props) => {
  const isActive = props.sortBy === props.columnKey;
  const isArrowDown = isActive && props.sortDirection === 'DESC';
  return (
    <Container alignRight={props.alignRight}>
      <Text.Body tone="inverted">{props.children}</Text.Body>
      <Span
        id="arrow"
        css={[
          isActive &&
            css`
              visibility: visible;
            `,
          props.alignRight &&
            css`
              padding: 0 ${vars.spacingM} 0 0;
            `,
        ]}
      >
        {isArrowDown ? (
          <AngleDownIcon size="medium" color="surface" />
        ) : (
          <AngleUpIcon size="medium" color="neutral60" />
        )}
      </Span>
    </Container>
  );
};

SortableHeader.displayName = 'SortableHeader';

SortableHeader.propTypes = {
  children: PropTypes.node.isRequired,
  sortBy: PropTypes.string,
  sortDirection: PropTypes.oneOf(['DESC', 'ASC']),
  columnKey: PropTypes.string.isRequired,
  alignRight: PropTypes.bool,
};

export default SortableHeader;
