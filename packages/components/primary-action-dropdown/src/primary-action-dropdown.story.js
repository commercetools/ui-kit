import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs/react';
import Section from '../../../../docs/.storybook/decorators/section';
import { BoxIcon, BrainIcon, FlameIcon } from '../../icons';
import Readme from '../README.md';
import PrimaryActionDropdown from './primary-action-dropdown';
import Option from './option';

const groupIdOption1 = 'option-1';
const groupIdOption2 = 'option-2';
const groupIdOption3 = 'option-3';

storiesOf('Components|Dropdowns', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('PrimaryActionDropdown', () => (
    <Section>
      <PrimaryActionDropdown>
        <Option
          iconLeft={<BoxIcon />}
          isDisabled={boolean('Option 1: isDisabled', false, groupIdOption1)}
          onClick={action('onClick option 1')}
        >
          {text('Option 1: label', 'Option 1', groupIdOption1)}
        </Option>
        <Option
          iconLeft={<BrainIcon />}
          isDisabled={boolean('Option 2: isDisabled', false, groupIdOption2)}
          onClick={action('onClick option 2')}
        >
          {text('Option 2: label', 'Option 2', groupIdOption2)}
        </Option>
        <Option
          iconLeft={<FlameIcon />}
          isDisabled={boolean('Option 3: isDisabled', false, groupIdOption3)}
          onClick={action('onClick option 3')}
        >
          {text('Option 3: label', 'Option 3', groupIdOption3)}
        </Option>
      </PrimaryActionDropdown>
    </Section>
  ));
