import { createElement } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs/react';
import * as icons from '@commercetools-uikit/icons';
import Section from '../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import ViewSwitcher from '.';

const viewSwitcher = 'View Switcher';

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
    return (
      <Section>
        <ViewSwitcher.Group
          isCondensed={boolean('isCondensed', false, viewSwitcher)}
          defaultSelected="Button #3"
        >
          {[...Array(4).keys()].map((num) => {
            const i = num + 1;
            const viewSwitcherButton = `Button #${i}`;

            return (
              <ViewSwitcher.Button
                key={i}
                isDisabled={boolean('isDisabled', false, viewSwitcherButton)}
                value={viewSwitcherButton}
                icon={createElement(
                  icons[
                    select(
                      'icon',
                      iconNames,
                      iconNames[iconNames.length - 1],
                      viewSwitcherButton
                    )
                  ]
                )}
              >
                {text('children', `View #${i}`, viewSwitcherButton)}
              </ViewSwitcher.Button>
            );
          })}
        </ViewSwitcher.Group>
      </Section>
    );
  });
