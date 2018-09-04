import React from 'react';
import { storiesOf } from '@storybook/react';
import PrimaryActionButton from './primary-action-button';

storiesOf('Buttons', module).add('1. Primary Action Button', () => (
  <div>
    <PrimaryActionButton ariaLabel="test">{'Click me'}</PrimaryActionButton>
  </div>
));
