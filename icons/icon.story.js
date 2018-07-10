import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import styled from 'styled-components';
import kebabCase from 'lodash.kebabcase';
import Text from '../typography/text';
import Readme from './README.md';
import * as icons from './';

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

const FileName = styled.div`
  > small {
    color: rgba(0, 0, 0, 0.4);
    font-family: Courier;
    white-space: nowrap;
  }
`;

const iconNames = Object.keys(icons);

storiesOf('Icons', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('All Icons', () => (
    <IconList>
      {Object.values(icons).map((Icon, index) => {
        const sizeValue = select(
          'size',
          ['small', 'medium', 'big', 'scale'],
          'big'
        );
        const containerWidth =
          sizeValue === 'scale'
            ? {
                width: `${select(
                  'container width',
                  ['100', '200', '300', '400'],
                  '100'
                )}px`,
              }
            : {};
        return (
          <IconItem key={index}>
            <IconContainer style={containerWidth}>
              <Icon
                size={sizeValue}
                theme={select(
                  'them',
                  [
                    'black',
                    'grey',
                    'white',
                    'blue',
                    'green',
                    'green-light',
                    'orange',
                    'red',
                  ],
                  'black'
                )}
              />
            </IconContainer>
            {iconNames[index]}
            <FileName>
              <Text.Detail>
                {kebabCase(iconNames[index]).replace(/-icon/, '')}
                {'.svg'}
              </Text.Detail>
            </FileName>
          </IconItem>
        );
      })}
    </IconList>
  ));
