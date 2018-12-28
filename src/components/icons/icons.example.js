import React from 'react';
import styled from '@emotion/styled';
import * as UIKit from 'ui-kit';
import { Suite, Spec } from '../../../test/percy';

const Inline = styled.div`
  display: flex;
  flex-direction: row;
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

export const component = () => (
  <Suite>
    {icons.map(iconName => {
      const Icon = UIKit[iconName];
      return sizes.map(size => (
        <Spec
          key={`${iconName}-${size}`}
          label={`${iconName} - ${size}`}
          omitPropsList
        >
          <Inline>
            {themes.map(theme => (
              <Icon key={theme} size={size} theme={theme} />
            ))}
          </Inline>
        </Spec>
      ));
    })}
  </Suite>
);
