import createSelectStyles from './create-select-styles';
import vars from '../../../materials/custom-properties.json';

export default ({ hasWarning, hasError }) => {
  const selectStyles = createSelectStyles({ hasWarning, hasError });
  return {
    ...selectStyles,
    control: (base, state) => ({
      ...selectStyles.control(base, state),
      flex: 1,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
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
      marginTop: '3px',
      padding: 0,
    }),
  };
};
