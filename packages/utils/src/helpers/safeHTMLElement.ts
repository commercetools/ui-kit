import { canUseDOM } from './exenv';

const SafeHTMLElement: HTMLElement | {} = canUseDOM ? window.HTMLElement : {};

export default SafeHTMLElement;
