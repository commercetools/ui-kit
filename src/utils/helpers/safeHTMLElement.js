import { canUseDOM } from './exenv';

const SafeHTMLElement = canUseDOM ? window.HTMLElement : {};

export default SafeHTMLElement;
