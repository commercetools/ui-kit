import PropTypes from 'prop-types';
import SelectInput from '@commercetools-uikit/select-input';

const Example = (props) => (
  <SelectInput
    name="form-field-name"
    value={props.value}
    onChange={
      (/** event */) => {
        // console.log(event.target.value)
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
