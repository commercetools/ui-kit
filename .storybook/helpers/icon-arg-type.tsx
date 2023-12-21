import React, { ReactNode } from 'react';
import * as icons from '@commercetools-uikit/icons';

const iconNames = Object.keys(icons);

const iconArgType = {
  control: { type: 'select' },
  options: ['', ...iconNames],
  mapping: Object.entries(icons).reduce<Record<string, ReactNode>>(
    (acc, [iconName, IconComponent]) => {
      acc[iconName] = <IconComponent />;
      return acc;
    },
    {}
  ),
};

export default iconArgType;
