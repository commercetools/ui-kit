import React from 'react';
import styled from '@emotion/styled';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import * as icons from '@commercetools-uikit/icons';
import Text from '@commercetools-uikit/text';
import { Suite, Spec } from '../../../../test/percy';

const IconList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;

const IconItem = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const IconContainer = styled.div`
  margin: 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.big ? '50px' : '25px')};
`;

const allIconNames = Object.keys(icons).sort();

const sizes = ['small', 'medium', 'big', 'scale'];

const colors = [
  'solid',
  'neutral60',
  'surface',
  'info',
  'primary',
  'primary40',
  'warning',
  'error',
];

export const routePath = '/icons';

const renderIcon = (iconName, color, size) => {
  const Icon = icons[iconName];
  return (
    <IconItem key={iconName}>
      <IconContainer big={size === 'scale'}>
        <Icon color={color} size={size} />
      </IconContainer>
      <Text.Body>{iconName}</Text.Body>
    </IconItem>
  );
};

export const component = ({ themes }) => (
  <Switch>
    {colors.map((color) => (
      <Route
        key={color}
        path={`${routePath}/${color}`}
        exact
        render={() => (
          <Suite>
            {sizes.map((size) => (
              <Spec
                key={size}
                label={`All Icons - Color: ${color} / Size: ${size}`}
                omitPropsList
              >
                <IconList>
                  {allIconNames.map((iconName) =>
                    renderIcon(iconName, color, size)
                  )}
                </IconList>
              </Spec>
            ))}
          </Suite>
        )}
      />
    ))}
    <Route
      exact
      path={`${routePath}/theme`}
      render={() => (
        <Suite>
          <ThemeProvider theme={themes.darkTheme}>
            {colors.map((color) => (
              <Spec
                key={color}
                label={`Themed Icons - Color: ${color}`}
                omitPropsList
              >
                <IconList>{renderIcon('ClockIcon', color, 'big')}</IconList>
              </Spec>
            ))}
          </ThemeProvider>
        </Suite>
      )}
    />
  </Switch>
);
