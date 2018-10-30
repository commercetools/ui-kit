import createSelectStyles from './create-select-styles';
import vars from '../../../materials/custom-properties.json';

export default ({ hasWarning, hasError }) => {
  const selectStyles = createSelectStyles({ hasWarning, hasError });
  return {
    ...selectStyles,
    control: (base, state) => ({
      ...selectStyles.control(base, state),
      paddingRight: 0,
    }),
    indicatorSeparator: (base, state) => ({
      ...base,
      alignSelf: 'stretch',
      backgroundColor: do {
        if (state.isDisabled) vars['--token-border-color-input-disabled'];
        else if (hasError) vars['--token-border-color-input-error'];
        else if (hasWarning) vars['--token-border-color-input-warning'];
        else if (state.isFocused) vars['--token-border-color-input-focus'];
        else vars['--token-border-color-input-pristine'];
      },
      width: '1px',
      margin: '0',
    }),
    dropdownIndicator: (base, state) => ({
      ...selectStyles.dropdownIndicator(base, state),
      margin: `0 ${vars['--spacing-4']}`,
    }),
    indicatorsContainer: (base, state) => ({
      ...selectStyles.indicatorsContainer(base, state),
      alignItems: 'center',
      // total height - 2 times border height
      height: `calc(${vars['--token-size-height-input']} - 2 * 1px)`,
    }),
    option: (base, state) => ({
      ...selectStyles.option(base, state),
      ...(state.data.display === 'calendar'
        ? {
            display: 'inline-block',
            width: '12%',
            margin: `0 1% ${vars['--spacing-8']} 1%`,
            textAlign: 'center',
            borderRadius: '4px',
            fontWeight: state.today ? 'bold' : 'inherit',
          }
        : {}),
      backgroundColor: do {
        if (state.isSelected) vars['--color-green'];
        else if (state.isFocused) vars['--token-background-color-input-hover'];
        else base.backgroundColor;
      },
      color: do {
        if (state.isSelected) vars['--color-white'];
        else vars['--token-font-color-default'];
      },
    }),
    groupHeading: (base, state) => ({
      ...selectStyles.groupHeading(base, state),
      padding: 0,
    }),
    clearIndicator: base => ({
      ...base,
      // The icon is 16px, but its container is 19px high. The icon clings to
      // the top, so we need 3px to actually center it. And then the icon is
      // still of by .5px, so we center it as well. :cry:
      marginTop: '3.5px',
      marginRight: vars['--spacing-4'],
      padding: 0,
    }),
  };
};
