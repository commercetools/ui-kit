import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs/react';
import Section from '../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import HelloWorld from './hello-world';

storiesOf('Components', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('HelloWorld', () => {
    return (
      <Section>
        <HelloWorld text={text('text', 'Some text')} />
      </Section>
    );
  });
