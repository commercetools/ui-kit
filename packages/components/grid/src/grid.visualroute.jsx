import styled from '@emotion/styled';
import Grid from '@commercetools-uikit/grid';
import { designTokens } from '@commercetools-uikit/design-system';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/grid';

const createList = (size) =>
  Array.from({ length: size }).map((_, index) => index + 1);

const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: pink;
  padding: 16px;
  font-size: 16px;
  font-family: ${designTokens.fontFamily};
`;

export const component = () => (
  <Suite>
    <Spec label="With fixed columns">
      <Grid
        gridGap="16px"
        gridAutoColumns="1fr"
        gridTemplateColumns="repeat(3, 1fr)"
      >
        {createList(6).map((el, index) => (
          <Grid.Item key={index}>
            <Placeholder>{el}</Placeholder>
          </Grid.Item>
        ))}
      </Grid>
    </Spec>
    <Spec label="With auto-sizing columns">
      <Grid
        gridGap="16px"
        gridAutoColumns="1fr"
        gridTemplateColumns="repeat(auto-fill, minmax(150px, 1fr))"
      >
        {createList(6).map((el, index) => (
          <Grid.Item key={index}>
            <Placeholder>{el}</Placeholder>
          </Grid.Item>
        ))}
      </Grid>
    </Spec>
  </Suite>
);
