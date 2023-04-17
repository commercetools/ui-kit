import { type ReactNode, Children, ReactElement } from 'react';
import { designTokens } from '@commercetools-uikit/design-system';
import styled from '@emotion/styled';
import { warning } from '@commercetools-uikit/utils';

type TReactChild = {
  type?: { displayName: string };
} & ReactElement;

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
  const childrenArray = Children.toArray(props.children) as TReactChild[];
  const nonTagsChildren = childrenArray.filter(
    (child) => child.type.displayName === 'Tag'
  );

  warning(
    nonTagsChildren.length,
    `TagList component can be used as a wrapper only for the Tag component`
  );

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
