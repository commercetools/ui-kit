// eslint-disable-next-line import/prefer-default-export
import { Horizontal } from './horizontal';
import {
  parseHorizontalConstraintProp,
  getAcceptedMaxPropValues,
} from './helpers';

const Constraints = {
  Horizontal,
  parseHorizontalConstraintProp,
  getAcceptedMaxPropValues,
};

export default Constraints;
export { Horizontal, parseHorizontalConstraintProp, getAcceptedMaxPropValues };
export { default as version } from './version';
