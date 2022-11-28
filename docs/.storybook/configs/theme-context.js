import PropTypes from 'prop-types';
import { ThemeProvider } from '@commercetools-uikit/design-system';

const ThemeWrapper = (props) => {
  return (
    <>
      <ThemeProvider theme={props.themeName} />
      {props.children}
    </>
  );
};

ThemeWrapper.propTypes = {
  theme: PropTypes.any,
};

const themeParams = [
  {
    name: 'Default Theme',
    props: { themeName: 'default' },
  },
];

// Do not show the new test theme in public environment
if (process.env.VERCEL_ENV !== 'production') {
  themeParams.push({
    name: 'Test Theme',
    props: { themeName: 'test' },
  });
}

const themeContext = {
  icon: 'box', // a icon displayed in the Storybook toolbar to control contextual props
  title: 'Themes', // an unique name of a contextual environment
  components: [ThemeWrapper],
  params: themeParams,
  options: {
    deep: true, // pass the `props` deeply into all wrapping components
    cancelable: false, // allow this contextual environment to be opt-out optionally in toolbar
  },
};

// export const globalTypes = {
//   theme: {
//     name: 'Theme',
//     description: 'UI Theme',
//     defaultValue: 'default',
//     toolbar: {
//       icon: 'circlehollow',
//       items: ['default', 'test'],
//       // showName: true,
//       // dynamicTitle: true
//     }
//   }
// };

export default themeContext;
