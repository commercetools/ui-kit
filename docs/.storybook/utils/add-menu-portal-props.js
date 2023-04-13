import { select } from '@storybook/addon-knobs/react';

const getMenuPortalTargetValue = (menuPortalTarget) => {
  if (menuPortalTarget === 'document.body') {
    return document.body;
  }
  return undefined;
};

export const addMenuPortalProps = () => {
  const menuPortalZIndex = select('menuPortalZIndex', [1, 2, 3], 1);
  const menuPortalTarget = select(
    'menuPortalTarget',
    ['undefined', 'document.body'],
    'undefined'
  );
  return {
    menuPortalZIndex,
    menuPortalTarget: getMenuPortalTargetValue(menuPortalTarget),
  };
};
