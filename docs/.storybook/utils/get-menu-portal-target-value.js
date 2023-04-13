export const getMenuPortalTargetValue = (menuPortalTarget) => {
  if (menuPortalTarget === 'document.body') {
    return document.body;
  }
  return undefined;
};
