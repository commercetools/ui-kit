// react-testing-library setup
import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
// set up visual regression testing
import { toMatchImageSnapshot } from 'jest-image-snapshot';

// give tests more time as taking screenshots takes a while
jest.setTimeout(15000);

expect.extend({ toMatchImageSnapshot });
