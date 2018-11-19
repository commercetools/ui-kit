import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Section from '../../../.storybook/decorators/section';
import Avatar from './avatar';
import Readme from './README.md';

storiesOf('Images', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('Avatar', () => {
    const scale = select('scale', ['s', 'm', 'l'], 'l');

    const wrapperScale = do {
      if (scale === 's') '26px';
      else if (scale === 'm') '48px';
      else '100px';
    };

    return (
      <Section>
        <div
          style={{
            width: wrapperScale,
            height: wrapperScale,
          }}
        >
          <Avatar
            firstName={text('firstName', 'Jon')}
            lastName={text('lastName', 'Snow')}
            gravatarHash={text('gravatarHash', '')}
            isHighlighted={boolean('isHighlighted', false)}
            scale={scale}
          />
        </div>
      </Section>
    );
  });
