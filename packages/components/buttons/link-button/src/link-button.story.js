import { storiesOf } from '@storybook/react';
import Readme from '../README.md';

storiesOf('Components|Buttons', module)
  .addParameters({
    readme: {
      sidebar: Readme,
    },
  })
  .add('LinkButton', () => {});
