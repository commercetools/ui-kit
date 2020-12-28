import React from 'react';
import FieldErrors from '../src';

export default {
  title: 'Components/FieldErrors',
  component: FieldErrors,
};

const Template = (args) => <FieldErrors {...args} />;

export const Missing = Template.bind({});
Missing.args = {
  isVisible: true,
  errors: {
    missing: true,
  },
};
export const Negative = Template.bind({});
Negative.args = {
  isVisible: true,
  errors: {
    negative: true,
  },
};
export const Fractions = Template.bind({});
Fractions.args = {
  isVisible: true,
  errors: {
    fractions: true,
  },
};
export const Custom = Template.bind({});
Custom.args = {
  isVisible: true,
  errors: {
    invalidUrl: true,
  },
  renderError: (key) => {
    switch (key) {
      case 'invalidUrl':
        return 'Invalid URL';
      default:
        return null;
    }
  },
};
