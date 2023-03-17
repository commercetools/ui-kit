// eslint-disable-next-line import/prefer-default-export
import Horizontal from './horizontal';
import { getAcceptedMaxPropValues } from './helpers';
export * from './horizontal/export-types';

const Constraints = {
  Horizontal,
  getAcceptedMaxPropValues,
};
export default Constraints;

export { default as version } from './version';
