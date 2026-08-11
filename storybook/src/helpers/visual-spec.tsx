import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import { designTokens } from '../../../design-system';

const SpecRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${designTokens.spacing50};
  /* Absorbs a small height change so it can't shift every state below it. */
  min-height: 120px;
  padding: ${designTokens.spacing50} 0;

  /* Separator between states, so a tall one cannot read as two. */
  & + & {
    border-top: 1px solid ${designTokens.colorNeutral90};
  }
`;

/* A definite width, or Constraints.Horizontal's `width: 100%` resolves against
   a shrink-to-fit box and constrained inputs collapse to their text width. */
const Box = styled.div<{ backgroundColor?: string }>`
  min-width: ${designTokens.constraint16};
  width: max-content;
  max-width: 100%;
  background-color: ${(props) =>
    props.backgroundColor ?? designTokens.colorSurface};
`;

/* Gray, not a tinted family: a colored band above a component reads as part of
   that component's state. */
const Label = styled.div`
  align-self: flex-start;
  font-family: ${designTokens.fontFamily};
  font-size: ${designTokens.fontSize30};
  color: ${designTokens.colorSolid};
  background-color: ${designTokens.colorNeutral90};
  border-radius: ${designTokens.borderRadius4};
  padding: ${designTokens.spacing10} ${designTokens.spacing20};

  &::after {
    content: ':';
  }
`;

const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${designTokens.spacing40};
`;

const GroupLabel = styled.div`
  font-family: ${designTokens.fontFamily};
  font-size: ${designTokens.fontSize40};
  font-weight: ${designTokens.fontWeight600};
  color: ${designTokens.colorSolid};
  margin-bottom: ${designTokens.spacing20};
`;

type TVisualSpecProps = {
  label: string;
  backgroundColor?: string;
  children?: ReactNode;
};

type TVisualSpecGroupProps = {
  label: string;
  children?: ReactNode;
};

/** Wraps one captured state in a visual-regression story, with its label. */
const VisualSpec = ({ label, backgroundColor, children }: TVisualSpecProps) => (
  <SpecRow>
    <Label>{label}</Label>
    <Box backgroundColor={backgroundColor}>{children}</Box>
  </SpecRow>
);

VisualSpec.displayName = 'VisualSpec';

/** Heading over a run of `VisualSpec`s that share an axis. */
export const VisualSpecGroup = ({ label, children }: TVisualSpecGroupProps) => (
  <GroupContainer>
    <GroupLabel>{label}</GroupLabel>
    {children}
  </GroupContainer>
);

VisualSpecGroup.displayName = 'VisualSpecGroup';

export default VisualSpec;
