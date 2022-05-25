import { createElement } from 'react';
import { storiesOf } from '@storybook/react';
import { addons } from '@storybook/addons';
import { CHANGE } from '@storybook/addon-knobs';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs/react';
import * as icons from '@commercetools-uikit/icons';
import Section from '../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import ViewSwitcher from '.';

const viewSwitcher = 'View Switcher';
const BUTTONS_COUNT = 4;
const DEFAULT_BUTTON_ICON = 'WorldIcon';

const buttonName = (index) => `Button #${index}`;

const iconNames = Object.keys(icons);
storiesOf('Components|ViewSwitcher', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('ViewSwitcher', () => {
    console.log({ CHANGE });
    // Reference: https://github.com/storybookjs/storybook/issues/3855#issuecomment-638245040
    const channel = addons.getChannel();
    channel.addListener(CHANGE, (event) => {
      if (event.name === 'Allow icons') {
        Array(BUTTONS_COUNT)
          .fill('')
          .forEach((_, index) => {
            channel.emit(CHANGE, {
              name: `icon_${buttonName(index + 1)}`,
              value: event.value ? DEFAULT_BUTTON_ICON : '',
            });
          });
      }
    });

    const allowIcons = boolean('Allow icons', true);
    return (
      <Section allowIcons={allowIcons}>
        <ViewSwitcher.Group
          isCondensed={boolean('isCondensed', false, viewSwitcher)}
          defaultSelected="Button #3"
        >
          {Array(BUTTONS_COUNT)
            .fill('')
            .map((_, index) => {
              const viewSwitcherButton = buttonName(index + 1);
              const selectedIcon = select(
                'icon',
                ['', ...(allowIcons ? iconNames : [])],
                allowIcons ? 'WorldIcon' : '',
                viewSwitcherButton
              );

              return (
                <ViewSwitcher.Button
                  key={index + 1}
                  isDisabled={boolean('isDisabled', false, viewSwitcherButton)}
                  value={viewSwitcherButton}
                  {...(selectedIcon
                    ? { icon: createElement(icons[selectedIcon]) }
                    : {})}
                >
                  {text('children', `View #${index + 1}`, viewSwitcherButton)}
                </ViewSwitcher.Button>
              );
            })}
        </ViewSwitcher.Group>
      </Section>
    );
  });
