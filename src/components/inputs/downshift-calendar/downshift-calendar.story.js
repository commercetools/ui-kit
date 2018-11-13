import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import DownshiftCalendarReadme from './README.md';
import DownshiftCalendar from './downshift-calendar';
import Section from '../../../../.storybook/decorators/section';

class DownshiftCalendarStory extends React.Component {
  static displayName = 'DownshiftCalendarStory';

  render() {
    return (
      <Section>
        <DownshiftCalendar />
      </Section>
    );
  }
}

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(DownshiftCalendarReadme))
  .add('DownshiftCalendar', () => <DownshiftCalendarStory />);
