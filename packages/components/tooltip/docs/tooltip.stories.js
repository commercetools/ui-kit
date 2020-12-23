import React from 'react';
import styled from '@emotion/styled';
import { action } from '@storybook/addon-actions';
import { PrimaryButton } from '@commercetools-uikit/buttons';
import { Tooltip } from '../src';

const Container = styled.div`
  padding: 80px 0 80px 80px;
`;
const CustomButtonWrapper = styled.div`
  width: min-content;
  cursor: not-allowed;
  > :disabled {
    pointer-events: none;
  }
`;

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argsTypes: {
    fullWidth: { control: 'boolean' },
    customBodyWrapper: { control: 'boolean' },
    buttonDisabled: { control: 'boolean' },
  },
};

const Template = (args) => {
  const { isButtonDisabled, ...rest } = args;
  return (
    <Container>
      <Tooltip {...rest}>
        <CustomButtonWrapper>
          <PrimaryButton
            onClick={action('clicked')}
            label="Submit"
            isDisabled={isButtonDisabled}
          />
        </CustomButtonWrapper>
      </Tooltip>
    </Container>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: 'This is the tooltip text',
  onOpen: action('opened'),
  onClose: action('closed'),
};
export const Off = Template.bind({});
Off.args = {
  title: 'This is the tooltip text',
  off: true,
};
export const Open = Template.bind({});
Open.args = {
  title: 'This is the tooltip text',
  isOpen: true,
};
export const WithDisabledButton = Template.bind({});
WithDisabledButton.args = {
  title: 'This is the tooltip text',
  isButtonDisabled: true,
};
