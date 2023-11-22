import { Tag } from '@commercetools-uikit/tag';

const Example = () => (
  <Tag
    type="normal"
    isDisabled={false}
    to="/project-key/products/icecream"
    onRemove={() => {}}
  >
    Icecream
  </Tag>
);

export default Example;
