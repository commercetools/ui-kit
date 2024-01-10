import { Value } from 'react-value';
// import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';
// import LinkTo from '@storybook/addon-links/react';
import Grid from '@commercetools-uikit/grid';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';

// { TCheckboxProps }
import CheckboxInput from './checkbox-input';

const states = {
  default: 'Default',
  disabled: 'Disabled',
  readonly: 'Read only',
  error: 'Error',
};

const meta = {
  title: 'Components/Inputs/CheckboxInput',
  component: CheckboxInput,
} satisfies Meta<typeof CheckboxInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// type TInputWrapperProps = TCheckboxProps & {
//   stateLabel: string;
//   onChange: (isChecked: boolean) => void;
// };
// const InputWrapper = (props: TInputWrapperProps) => {
//   const { stateLabel, onChange, ...rest } = props;

//   return (
//     <CheckboxInput
//       {...rest}
//       onChange={() => onChange(!props.isChecked)}
//       isChecked={props.isChecked}
//       isDisabled={stateLabel === states.disabled}
//       isReadOnly={stateLabel === states.readonly}
//       hasError={stateLabel === states.error}
//     >
//       <span>This is a label</span>
//     </CheckboxInput>
//   );
// };

export const Default: Story = {
  args: {
    id: '',
    name: '',
    // onChange={(event) => {
    //   action('onChange')(event);
    //   onChange(!isChecked);
    // }}
    value: '',
    isChecked: false,
    isHovered: false,
    isDisabled: false,
    isReadOnly: false,
    hasError: false,
  },
  render: (args) => {
    return (
      <Spacings.Stack>
        {Object.entries(states).map(([stateKey, stateLabel]) => (
          <Grid
            key={stateKey}
            alignItems="center"
            gridTemplateColumns="100px 1fr 1fr 1fr"
          >
            <Text.Body isBold>{stateLabel}</Text.Body>
            <Value
              defaultValue={true}
              render={(isChecked, onChange) => (
                <CheckboxInput
                  {...args}
                  onChange={() => onChange(!isChecked)}
                  isChecked={isChecked}
                  isDisabled={stateLabel === states.disabled}
                  isReadOnly={stateLabel === states.readonly}
                  hasError={stateLabel === states.error}
                >
                  <span>This is a label</span>
                </CheckboxInput>
              )}
            />
            <Value
              defaultValue={false}
              render={(isChecked, onChange) => (
                <CheckboxInput
                  {...args}
                  onChange={() => onChange(!isChecked)}
                  isChecked={isChecked}
                  isDisabled={stateLabel === states.disabled}
                  isReadOnly={stateLabel === states.readonly}
                  hasError={stateLabel === states.error}
                >
                  <span>This is a label</span>
                </CheckboxInput>
              )}
            />
            <Value
              defaultValue={false}
              render={(isChecked, onChange) => (
                <CheckboxInput
                  {...args}
                  onChange={() => onChange(!isChecked)}
                  isChecked={isChecked}
                  isIndeterminate={true}
                  isDisabled={stateLabel === states.disabled}
                  isReadOnly={stateLabel === states.readonly}
                  hasError={stateLabel === states.error}
                >
                  <span>This is a label</span>
                </CheckboxInput>
              )}
            />
          </Grid>
        ))}
      </Spacings.Stack>
    );
  },
};
