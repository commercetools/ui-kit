import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs/react';
import Section from '../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import ViewSwitcher from '.';

const KNOB_GROUP_NAME = 'View Switcher';

storiesOf('Components|ViewSwitcher', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('ViewSwitcher (without icons)', () => {
    return (
      <Section>
        <ViewSwitcher.Group
          isCondensed={boolean('isCondensed', false, KNOB_GROUP_NAME)}
          defaultSelected="Button 3"
        >
          {[...Array(4).keys()].map((j) => {
            const i = j + 1;
            const viewSwitcherButton = `Button ${i}`;
            return (
              <ViewSwitcher.Button
                key={i}
                isDisabled={boolean('isDisabled', false, viewSwitcherButton)}
                value={viewSwitcherButton}
              >
                {text('children', `View ${i}`, viewSwitcherButton)}
              </ViewSwitcher.Button>
            );
          })}
        </ViewSwitcher.Group>
      </Section>
    );
  });
