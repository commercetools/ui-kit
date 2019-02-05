// inspired from https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/RootRef/RootRef.js
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

const setRef = (ref, value) => {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    // eslint-disable-next-line no-param-reassign
    ref.current = value;
  }
};

export default class RootRef extends React.Component {
  static displayName = 'RootRef';
  componentDidMount() {
    this.ref = ReactDOM.findDOMNode(this);
    setRef(this.props.rootRef, this.ref);
  }

  componentDidUpdate(prevProps) {
    const ref = ReactDOM.findDOMNode(this);

    if (prevProps.rootRef !== this.props.rootRef || this.ref !== ref) {
      if (prevProps.rootRef !== this.props.rootRef) {
        setRef(prevProps.rootRef, null);
      }

      this.ref = ref;
      setRef(this.props.rootRef, this.ref);
    }
  }

  componentWillUnmount() {
    this.ref = null;
    setRef(this.props.rootRef, null);
  }

  render() {
    return this.props.children;
  }
}

RootRef.propTypes = {
  children: PropTypes.element.isRequired,
  rootRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};
