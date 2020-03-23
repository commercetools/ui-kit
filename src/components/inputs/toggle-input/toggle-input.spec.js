import React from 'react';
import PropTypes from 'prop-types';
import { render } from '../../../test-utils';
import ToggleInput from './toggle-input';

class TestComponent extends React.Component {
  static propTypes = {
    isChecked: PropTypes.bool,
    onChange: PropTypes.func,
    id: PropTypes.string,
  };

  state = {
    isChecked: this.props.isChecked,
  };

  render() {
    return (
      <div>
        <label htmlFor={this.props.id}>Toggle</label>
        <ToggleInput
          id={this.props.id}
          isChecked={this.state.isChecked}
          onChange={(evt) => {
            this.setState({
              isChecked: evt.target.checked,
            });
            if (this.props.onChange) {
              this.props.onChange(evt);
            }
          }}
        />
      </div>
    );
  }
}

it('should render children', () => {
  const onChange = jest.fn();
  const { getByLabelText } = render(
    <div>
      <label htmlFor="toggle">Toggle</label>
      <ToggleInput id="toggle" isChecked={false} onChange={onChange} />
    </div>
  );

  expect(getByLabelText('Toggle')).toBeInTheDocument();
});

it('should call onChange when clicked', () => {
  const onChange = jest.fn((event) => {
    event.persist();
  });

  const { getByLabelText } = render(
    <TestComponent id="toggle" isChecked={false} onChange={onChange} />
  );

  getByLabelText('Toggle').click();

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(getByLabelText('Toggle')).toHaveProperty('checked', true);
});

it('should not call onChange when clicked while disabled', () => {
  const onChange = jest.fn();
  const { getByLabelText } = render(
    <div>
      <label htmlFor="toggle">Toggle</label>
      <ToggleInput
        id="toggle"
        isChecked={false}
        onChange={onChange}
        isDisabled={true}
      />
    </div>
  );

  getByLabelText('Toggle').click();

  expect(onChange).not.toHaveBeenCalled();
});

describe('checked attribute', () => {
  it('should have checked state when checked', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <div>
        <label htmlFor="toggle">Toggle</label>
        <ToggleInput id="toggle" isChecked={true} onChange={onChange} />
      </div>
    );

    expect(getByLabelText('Toggle')).toHaveAttribute('checked');
  });

  it('should not have checked state when not checked', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <div>
        <label htmlFor="toggle">Toggle</label>
        <ToggleInput id="toggle" isChecked={false} onChange={onChange} />
      </div>
    );

    expect(getByLabelText('Toggle')).not.toHaveAttribute('checked');
  });
});
