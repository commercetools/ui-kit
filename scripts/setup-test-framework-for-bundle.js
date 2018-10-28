// react-testing-library setup
import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
// set up visual regression testing
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { setDefaultOptions } from 'jsdom-screenshot';

// TravisCI requires --no-sandbox to be able to run the tests
setDefaultOptions({
  launch: { args: process.env.CI === 'true' ? ['--no-sandbox'] : [] },
});

// give tests more time as taking screenshots takes a while
jest.setTimeout(15000);

expect.extend({ toMatchImageSnapshot });
