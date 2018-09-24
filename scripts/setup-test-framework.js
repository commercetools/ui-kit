// This file is more-or-less also published as the
// @commercetools-frontend/jest-preset-mc-app preset.
// However the updated version of it was not yet pushed to NPM,
// so we copy it to here for now. This file can be removed once the new version
// of the preset is on NPM.

// react-testing-library setup
import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

// enzyme setup
import 'jest-enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ShallowWrapper from 'enzyme/ShallowWrapper';
import configureEnzymeExtensions from '@commercetools/enzyme-extensions';
import * as commerceToolsEnzymeMatchers from '@commercetools/jest-enzyme-matchers';

Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });

expect.extend({
  toBeComponentWithName(received, actual) {
    const pass = received && received.displayName === actual;
    const message = () =>
      `expected ${received} ${pass ? 'not ' : ''} to be ${actual}`;
    return { message, pass };
  },
});

expect.extend(commerceToolsEnzymeMatchers);

configureEnzymeExtensions(ShallowWrapper);
