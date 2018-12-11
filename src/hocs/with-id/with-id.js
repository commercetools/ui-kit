import React from 'react';
import invariant from 'tiny-invariant';
import { wrapDisplayName } from 'recompose';
import PropTypes from 'prop-types';
import createSequentialId from '../../utils/create-sequential-id';

const withId = prefix => Component => {
  invariant(prefix && prefix.length > 0, 'withId requires a prefix');
  const sequentialId = createSequentialId(prefix);

  class WithId extends React.Component {
    static displayName = wrapDisplayName(Component, 'WithId');
    static propTypes = {
      id: PropTypes.string,
    };

    state = {
      // We generate an id in case no id is provided by the parent to attach the
      // label to the input component.
      id: this.props.id,
    };

    static getDerivedStateFromProps = (props, state) => ({
      id: do {
        if (props.id) props.id;
        else if (state.id) state.id;
        else sequentialId();
      },
    });

    render() {
      return <Component {...this.props} id={this.state.id} />;
    }
  }
  return WithId;
};

export default withId;
