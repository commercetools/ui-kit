import type { ComponentProps } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import Constraints from './../index';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';
import { getAcceptedMaxPropValues, getMaxPropTokenValue } from '../helpers';

type ConstraintsHorizontalProps = ComponentProps<typeof Constraints.Horizontal>;

const meta: Meta<ConstraintsHorizontalProps> = {
  title: 'components/Constraints/Horizontal',
  component: Constraints.Horizontal,
};
export default meta;

const ColouredRow = styled.div`
  display: flex;
  padding: 2px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: ${designTokens.borderRadius6};
  color: ${designTokens.colorSurface};
  background-color: ${designTokens.colorPrimary};
`;

const Stack = styled.div`
  > * + * {
    margin: 8px 0 0;
  }
`;

const Wrapper = styled.div`
  position: relative;
  padding-top: ${designTokens.spacing50};
`;

const ColumnsContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  white-space: nowrap;
`;
const Column = styled.div`
  display: inline-block;
  width: ${designTokens.constraint2};
  margin-right: ${designTokens.spacing30};
  height: 100%;
  text-align: center;
  background-color: rgba(241, 109, 14, 0.3);
`;

const Outlined = styled.div`
  outline: 1px solid tomato;
`;

/**
 * At it's most basic usage, this component accepts a `max` prop which limits the width that is available to its children
 */
export const BasicExample: StoryFn<ConstraintsHorizontalProps> = (args) => {
  return (
    <Constraints.Horizontal {...args}>
      <Outlined>
        The {`<Constraints.Horizontal/>`} component limits my width
      </Outlined>
    </Constraints.Horizontal>
  );
};

BasicExample.args = {
  max: 6,
};

/**
 * This story demos the different values that can be passed to the `max` prop
 */
export const VisualizeConstraints: StoryFn<ConstraintsHorizontalProps> = () => {
  const values = getAcceptedMaxPropValues();

  return (
    <Wrapper>
      <ColumnsContainer>
        {Array.from({ length: 8 }).map((_, index) => (
          <Column key={index}>{`Column ${index + 1}`}</Column>
        ))}
      </ColumnsContainer>
      <Stack>
        {values.map((max) => (
          <Constraints.Horizontal key={max} max={max}>
            <ColouredRow>
              <b>{max.toString()}</b>
              {typeof max === 'number' ? (
                <small>{`${getMaxPropTokenValue(max)}`}</small>
              ) : null}
            </ColouredRow>
          </Constraints.Horizontal>
        ))}
      </Stack>
    </Wrapper>
  );
};
