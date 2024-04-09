import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import CheckboxInput from '@commercetools-uikit/checkbox-input';
import Constraints from '@commercetools-uikit/constraints';
import IconButton from '@commercetools-uikit/icon-button';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import SelectInput from '@commercetools-uikit/select-input';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import Text from '@commercetools-uikit/text';
import Label from '@commercetools-uikit/label';
import FlatButton from '@commercetools-uikit/flat-button';
import Section from '../../../../docs/.storybook/decorators/section/section';
import { CalendarIcon, PlusThinIcon } from '../../icons';

import FilterTag from './filter-tag';

storiesOf('Components|FilterTag', module)
  .addDecorator(withKnobs)
  // .addParameters({
  //   readme: {
  //     // Show readme at the addons panel
  //     sidebar: Readme,
  //   },
  // })
  .add('FilterTag', () => (
    <Section>
      <FilterTag
        label="Date range: 09/21/2023 to 09/21/2024"
        iconLeft={<CalendarIcon />}
        onRemove={action('onRemove')}
      >
        <Constraints.Horizontal max={6}>
          <SpacingsStack scale="xl">
            <SelectInput
              placeholder="Search filters"
              options={[
                { value: 'one', label: 'One' },
                { value: 'two', label: 'Two' },
              ]}
            />
            <SpacingsStack scale="l">
              <Label>Applied filters</Label>
              <CheckboxInput
                value="store"
                onChange={action('onChange')}
              >Store</CheckboxInput>
            </SpacingsStack>

            <SpacingsStack scale="l">
              <Label>Suggested filters</Label>
              <SpacingsStack scale="m">
                <CheckboxInput
                  value="one"
                  onChange={action('onChange')}
                >Customer group</CheckboxInput>
                <CheckboxInput
                  value="one"
                  onChange={action('onChange')}
                >Date of birth</CheckboxInput>
                <CheckboxInput
                  value="one"
                  onChange={action('onChange')}
                >Date created</CheckboxInput>
                <CheckboxInput
                  value="one"
                  onChange={action('onChange')}
                >Date modified</CheckboxInput>
              </SpacingsStack>
            </SpacingsStack>

            <FlatButton
              iconLeft={<PlusThinIcon />}
              onClick={action('onClick')}
              isDisabled
              label="See more"
            />
          </SpacingsStack>
        </Constraints.Horizontal>
      </FilterTag>
    </Section>
  ));
