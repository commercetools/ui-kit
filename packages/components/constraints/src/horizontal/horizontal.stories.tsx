import type { ComponentProps } from 'react';
import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { VisualSpec } from '@/storybook-helpers';
import Constraints from './../index';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';
import { getAcceptedMaxPropValues, getMaxPropTokenValue } from '../helpers';

type ConstraintsHorizontalProps = ComponentProps<typeof Constraints.Horizontal>;

const meta: Meta<ConstraintsHorizontalProps> = {
  title: 'layout/Constraints/Horizontal',
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

const GreenBox = styled.div`
  width: 100%;
  height: 20px;
  background-color: green;
`;

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="when max is 1">
        <Constraints.Horizontal max={1}>
          <GreenBox />
        </Constraints.Horizontal>
      </VisualSpec>
      <VisualSpec label="when max is 2">
        <Constraints.Horizontal max={2}>
          <GreenBox />
        </Constraints.Horizontal>
      </VisualSpec>
      <VisualSpec label="when max is 3">
        <Constraints.Horizontal max={3}>
          <GreenBox />
        </Constraints.Horizontal>
      </VisualSpec>
      <VisualSpec label="when max is 4">
        <Constraints.Horizontal max={4}>
          <GreenBox />
        </Constraints.Horizontal>
      </VisualSpec>
      <VisualSpec label="when max is 5">
        <Constraints.Horizontal max={5}>
          <GreenBox />
        </Constraints.Horizontal>
      </VisualSpec>
      <VisualSpec label="when max is 6">
        <Constraints.Horizontal max={6}>
          <GreenBox />
        </Constraints.Horizontal>
      </VisualSpec>
      <VisualSpec label="when max is 7">
        <Constraints.Horizontal max={7}>
          <GreenBox />
        </Constraints.Horizontal>
      </VisualSpec>
      <VisualSpec label="when max is 8">
        <Constraints.Horizontal max={8}>
          <GreenBox />
        </Constraints.Horizontal>
      </VisualSpec>
      <VisualSpec label="when max is 9">
        <Constraints.Horizontal max={9}>
          <GreenBox />
        </Constraints.Horizontal>
      </VisualSpec>
      <VisualSpec label="when max is 10">
        <Constraints.Horizontal max={10}>
          <GreenBox />
        </Constraints.Horizontal>
      </VisualSpec>
      <VisualSpec label="when max is 11">
        <Constraints.Horizontal max={11}>
          <GreenBox />
        </Constraints.Horizontal>
      </VisualSpec>
      <VisualSpec label="when max is 12">
        <Constraints.Horizontal max={12}>
          <GreenBox />
        </Constraints.Horizontal>
      </VisualSpec>
      <VisualSpec label="when max is 13">
        <Constraints.Horizontal max={13}>
          <GreenBox />
        </Constraints.Horizontal>
      </VisualSpec>
      <VisualSpec label="when max is 14">
        <Constraints.Horizontal max={14}>
          <GreenBox />
        </Constraints.Horizontal>
      </VisualSpec>
      <VisualSpec label="when max is 15">
        <Constraints.Horizontal max={15}>
          <GreenBox />
        </Constraints.Horizontal>
      </VisualSpec>
      <VisualSpec label="when max is 16">
        <Constraints.Horizontal max={16}>
          <GreenBox />
        </Constraints.Horizontal>
      </VisualSpec>
      <VisualSpec label='when max is "scale"'>
        <Constraints.Horizontal max="scale">
          <GreenBox />
        </Constraints.Horizontal>
      </VisualSpec>
      <VisualSpec label='when max is "auto"'>
        <Constraints.Horizontal max="auto">
          <GreenBox />
        </Constraints.Horizontal>
      </VisualSpec>
    </>
  ),
};
