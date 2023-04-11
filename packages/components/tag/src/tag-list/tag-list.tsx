import { ReactNode, Children } from 'react';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';

export type TTagListProps = {
  children: ReactNode;
  tag: string;
};

const getTagListContainerStyles = () => {
  return css`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  `;
};

const getTagListItemStyles = () => {
  return css`
    margin: ${designTokens.marginForTagList};
  `;
};

const TagList = (props: TTagListProps) => {
  return (
    <div css={[getTagListContainerStyles]}>
      {Children.map(props.children, (tag) => (
        <div css={[getTagListItemStyles]}>{tag}</div>
      ))}
    </div>
  );
};

TagList.displayName = 'TagList';

export default TagList;
