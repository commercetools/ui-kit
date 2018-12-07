import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  font-weight: bold;
  background-color: #774caf;
  padding: 5px;
  color: white;
`;

const PropList = styled.div`
  background-color: #894ac3;
  padding: 5px;
  font-size: 8pt;
  font-family: monospace;
  color: white;
`;

const PropLabel = styled.span`
  font-weight: bold;
  padding: 0 4px;
  min-width: 120px;
  display: inline-block;
`;

const PropValue = styled.span`
  padding: 0 4px;
`;

const Box = styled.div``;

const Pill = props => (
  <div>
    <PropLabel>{props.label}</PropLabel>
    <PropValue>{JSON.stringify(props.value)}</PropValue>
  </div>
);

Pill.displayName = 'Pill';
Pill.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
};

const Props = props => {
  const node = React.Children.only(props.children);
  const propEntries = Object.entries(node.props);
  return (
    <PropList>
      {propEntries
        .filter(([, value]) => typeof value !== 'function')
        .map(([key, value]) => (
          <Pill key={key} label={key} value={value} />
        ))}
    </PropList>
  );
};

Props.displayName = 'Props';
Props.propTypes = {
  children: PropTypes.node.isRequired,
};

const Spec = props => (
  <Container>
    <Label>{props.label}</Label>
    <Props>{props.children}</Props>
    <Box>{props.children}</Box>
  </Container>
);

Spec.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
};

Spec.displayName = 'Spec';

export default Spec;
