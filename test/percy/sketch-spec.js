import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { customProperties } from '../../dist/ui-kit.esm';

const SpecContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  font-family: ${customProperties['--font-family-default']};
  font-weight: bold;
  box-sizing: border-box;
  background-color: #774caf;
  padding: 5px;
  color: white;
  font-size: 13px;
`;

const Box = styled.div`
  background-color: #eee;
  & > * {
    margin: 4px;
  }
`;

const SketchSpec = props => (
  <SpecContainer>
    <Label>{props.label}</Label>
    <Box>{props.children}</Box>
  </SpecContainer>
);

SketchSpec.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
};

SketchSpec.displayName = 'SketchSpec';

export default SketchSpec;
