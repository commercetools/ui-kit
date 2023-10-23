import { createElement } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs/react';
import Section from '../../../../docs/.storybook/decorators/section';
import * as icons from '../../icons';
import Avatar from './avatar';
import Readme from '../README.md';

const iconNames = [null, ...Object.keys(icons)];
const selectedIcon = () => {
  const icon = select('icon', iconNames, iconNames[0]);
  return icon && createElement(icons[select('icon', iconNames)]);
};

storiesOf('Components|Avatar', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('Avatar', () => (
    <Section>
      <Avatar
        firstName={text('firstName', 'Jon')}
        lastName={text('lastName', 'Snow')}
        gravatarHash={text('gravatarHash', '')}
        isHighlighted={boolean('isHighlighted', false)}
        size={select('size', ['s', 'm', 'l'], 'l')}
        icon={selectedIcon()}
        color={select(
          'color',
          ['accent', 'purple', 'turquoise', 'brown'],
          'accent'
        )}
      />
    </Section>
  ));
