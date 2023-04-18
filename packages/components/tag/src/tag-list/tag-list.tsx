import { type ReactNode, Children } from 'react';
import { designTokens } from '@commercetools-uikit/design-system';
import styled from '@emotion/styled';

export type TTagListProps = {
  children: ReactNode;
};

const TagListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const TagListItem = styled.div`
  margin: ${designTokens.marginForTagList};
`;

const TagList = (props: TTagListProps) => {
  return (
    <TagListContainer>
      {Children.map(props.children, (tag) => (
        <TagListItem>{tag}</TagListItem>
      ))}
    </TagListContainer>
  );
};

TagList.displayName = 'TagList';

export default TagList;
