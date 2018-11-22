import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../.storybook/decorators/section';
import Avatar from './avatar';
import Readme from './README.md';

storiesOf('Avatar', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('Avatar', () => {
    const size = select('size', ['s', 'm', 'l'], 'l');

    const wrapperSize = do {
      if (size === 's') '26px';
      else if (size === 'm') '48px';
      else '100px';
    };

    return (
      <Section>
        <div
          style={{
            width: wrapperSize,
            height: wrapperSize,
          }}
        >
          <Avatar
            firstName={text('firstName', 'Jon')}
            lastName={text('lastName', 'Snow')}
            gravatarHash={text('gravatarHash', '')}
            isHighlighted={boolean('isHighlighted', false)}
            size={size}
          />
        </div>
      </Section>
    );
  });
