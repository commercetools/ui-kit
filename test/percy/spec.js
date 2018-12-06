import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const Spec = props => (
  <Container>
    <div>{props.label}</div>
    <div>{props.children}</div>
  </Container>
);

Spec.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
};

Spec.displayName = 'Spec';

export default Spec;
