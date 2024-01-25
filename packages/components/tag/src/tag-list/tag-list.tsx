import { type ReactNode, Children } from 'react';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import styled from '@emotion/styled';

export type TTagListProps = {
  children: ReactNode;
  /**
   * @deprecated
   *
   * Allow to override the styles by passing a `className` prop.
   * <br/>
   * Custom styles can also be passed using the [`css` prop from emotion](https://emotion.sh/docs/css-prop#style-precedence).
   */
  className?: string;
};

const TagListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const TagListItem = styled.div`
  margin: 0 var(--spacing-20) var(--spacing-20) 0;
`;

const TagList = (props: TTagListProps) => {
  return (
    <TagListContainer
      className={props.className}
      {...filterDataAttributes(props)}
    >
      {Children.map(props.children, (tag) => (
        <TagListItem>{tag}</TagListItem>
      ))}
    </TagListContainer>
  );
};

TagList.displayName = 'TagList';

export default TagList;
