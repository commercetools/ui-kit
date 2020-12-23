import React from 'react';
import styled from '@emotion/styled';
import Text from '@commercetools-uikit/text';
import * as icons from '../src';

const IconList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`;

const IconItem = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const IconContainer = styled.div`
  margin: 16px 0;
`;

const iconNames = Object.keys(icons);

export default {
  title: 'Components/Icons',
  subcomponents: icons,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: [
          'solid',
          'neutral60',
          'surface',
          'info',
          'primary',
          'primary40',
          'warning',
          'error',
        ],
      },
    },
  },
};

const Template = (args) => (
  <IconList>
    {Object.values(icons).map((Icon, index) => {
      const containerWidth = args.size === 'scale' ? { width: `200px` } : {};
      return (
        <IconItem key={index}>
          <IconContainer style={containerWidth}>
            <Icon {...args} />
          </IconContainer>
          <Text.Body>{iconNames[index]}</Text.Body>
        </IconItem>
      );
    })}
  </IconList>
);

export const Default = Template.bind({});
Default.args = {};
export const Small = Template.bind({});
Small.args = {
  size: 'small',
};
export const Medium = Template.bind({});
Medium.args = {
  size: 'medium',
};
export const Big = Template.bind({});
Big.args = {
  size: 'big',
};
export const Scale = Template.bind({});
Scale.args = {
  size: 'scale',
};
