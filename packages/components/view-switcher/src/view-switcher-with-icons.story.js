import { createElement } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs/react';
import * as icons from '@commercetools-uikit/icons';
import Section from '../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import ViewSwitcher from '.';

const KNOB_GROUP_NAME = 'View Switcher';
const BUTTONS_COUNT = 4;
const DEFAULT_BUTTON_ICON = 'WorldIcon';
const buttonName = (index) => `Button ${index}`;

const iconNames = Object.keys(icons);
storiesOf('Components|ViewSwitcher', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('ViewSwitcher (with icons)', () => {
    return (
      <Section>
        <ViewSwitcher.Group
          isCondensed={boolean('isCondensed', false, KNOB_GROUP_NAME)}
          defaultSelected="Button 3"
        >
          {[...Array(BUTTONS_COUNT).keys()].map((index) => {
            const i = index + 1;
            const viewSwitcherButton = `Button ${i}`;
            const selectedIcon = select(
              'icon',
              iconNames,
              DEFAULT_BUTTON_ICON,
              buttonName(i)
            );

            return (
              <ViewSwitcher.Button
                key={i}
                isDisabled={boolean('isDisabled', false, viewSwitcherButton)}
                value={viewSwitcherButton}
                {...(selectedIcon
                  ? { icon: createElement(icons[selectedIcon]) }
                  : {})}
              >
                {text('children', `View ${i}`, viewSwitcherButton)}
              </ViewSwitcher.Button>
            );
          })}
        </ViewSwitcher.Group>
      </Section>
    );
  });
