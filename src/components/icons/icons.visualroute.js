import React from 'react';
import styled from '@emotion/styled';
import { Switch, Route } from 'react-router-dom';
import * as UIKit from 'ui-kit';
import { Suite, Spec } from '../../../test/percy';

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
  width: ${props => (props.big ? '50px' : '25px')};
`;

const icons = Object.keys(UIKit).filter(thing => thing.endsWith('Icon'));

const sizes = ['small', 'medium', 'big', 'scale'];
const themes = [
  'black',
  'grey',
  'white',
  'blue',
  'green',
  'green-light',
  'orange',
  'red',
];

export const routePath = '/icons';

const renderIcon = (iconName, theme, size) => {
  const Icon = UIKit[iconName];
  return (
    <IconItem key={iconName}>
      <IconContainer big={size === 'scale'}>
        <Icon theme={theme} size={size} />
      </IconContainer>
      <UIKit.Text.Body>{iconName}</UIKit.Text.Body>
    </IconItem>
  );
};

export const component = () => (
  <Switch>
    {themes.map(theme => (
      <Route
        key={theme}
        path={`${routePath}/${theme}`}
        exact
        render={() => (
          <Suite>
            {sizes.map(size => (
              <Spec
                key={size}
                label={`All Icons - Theme: ${theme} / Size: ${size}`}
                omitPropsList
              >
                <IconList>
                  {icons.map(iconName => renderIcon(iconName, theme, size))}
                </IconList>
              </Spec>
            ))}
          </Suite>
        )}
      />
    ))}
  </Switch>
);
