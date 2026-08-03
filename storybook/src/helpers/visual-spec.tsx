import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import { designTokens } from '../../../design-system';

const SpecRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${designTokens.spacing30};
  /*
    Absorbs a small height change in one state so it doesn't shift every state
    below it and light up the whole diff. Sized to a control, not to the tallest
    component in the repo: at 400px a 35-state stack was 83% whitespace.
  */
  min-height: 56px;
`;

const Box = styled.div<{ backgroundColor?: string }>`
  background-color: ${(props) =>
    props.backgroundColor ?? designTokens.colorSurface};
`;

const Label = styled.div`
  font-family: ${designTokens.fontFamily};
  font-size: ${designTokens.fontSize30};
  color: ${designTokens.colorSolid};
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

/**
 * Chromatic replacement for Percy's `Spec` (`test/percy/spec.jsx`), wrapped
 * around each captured state in a generated visual-regression story. Rationale
 * for what it keeps and drops:
 * `.agents/skills/visualroute-to-story/resources/conversion-recipe.md`.
 */
const VisualSpec = ({ label, backgroundColor, children }: TVisualSpecProps) => (
  <SpecRow>
    <Box backgroundColor={backgroundColor}>{children}</Box>
    <Label>{label}</Label>
  </SpecRow>
);

VisualSpec.displayName = 'VisualSpec';

/**
 * Heading over a run of `VisualSpec`s that share an axis, so their own labels
 * don't each repeat it.
 */
export const VisualSpecGroup = ({ label, children }: TVisualSpecGroupProps) => (
  <GroupContainer>
    <GroupLabel>{label}</GroupLabel>
    {children}
  </GroupContainer>
);

VisualSpecGroup.displayName = 'VisualSpecGroup';

export default VisualSpec;
