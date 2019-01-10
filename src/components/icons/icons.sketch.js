import React from 'react';
import styled from '@emotion/styled';
import * as UIKit from 'ui-kit';
import { Suite, SketchSpec } from '../../../test/percy';

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

export default (
  <Suite>
    <SketchSpec label="Icons">
      {icons.map(iconName => {
        const Icon = UIKit[iconName];
        return sizes.map(size => (
          <div key={`${iconName}-${size}`}>
            <Inline>
              {themes.map(theme => (
                <div
                  key={theme}
                  data-sketch-symbol={`Icon/${iconName}/${size}/${theme}`}
                >
                  <Icon size={size} theme={theme} />
                </div>
              ))}
            </Inline>
          </div>
        ));
      })}
    </SketchSpec>
  </Suite>
);
