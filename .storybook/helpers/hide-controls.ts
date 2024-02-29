const hideControls = (controlsNames: string[] | string) => {
  const namesArray = Array.isArray(controlsNames)
    ? controlsNames
    : [controlsNames];

  return namesArray.reduce((argTypes, controlName) => {
    return { ...argTypes, [controlName]: { control: false } };
  }, {});
};

export default hideControls;
