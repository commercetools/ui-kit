import React from 'react';
import PropTypes from 'prop-types';

// This is a wrapper for a Controlled component

class ControlledComponentWrapper extends React.Component {
    static displayName = 'ControlledComponentWrapper';
    state = { value: undefined };

    handleChange = newVal => {
      this.setState({
        value: newVal.value
      })
    };

    render () {
      return this.props.children({
         value: this.state.value,
         onChange: this.handleChange,
       });
    }
}

export default ControlledComponentWrapper;
