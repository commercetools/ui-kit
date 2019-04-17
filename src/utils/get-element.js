const getElement = () => (typeof Element === 'undefined' ? () => {} : Element);

export default getElement;
