import PropTypes from 'prop-types';
import AsyncSelectInput from '@commercetools-uikit/async-select-input';

const Example = (props) => (
  <AsyncSelectInput
    name="form-field-name"
    value={props.value}
    onChange={
      (/** event */) => {
        // console.log(event)
      }
    }
    options={[
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },
    ]}
  />
);

Example.propTypes = {
  value: PropTypes.string,
};

export default Example;
