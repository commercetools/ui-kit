import React from 'react';
import wrapDisplayName from '../wrap-display-name';

export const stateHandlers = {
  handleMouseDown: ({ setMouseDown }) => () => setMouseDown(true),
  handleMouseUp: ({ setMouseDown }) => () => setMouseDown(false),
};

const withMouseDownState = BaseComponent => {
  class WithMouseDownState extends React.Component {
    static displayName = wrapDisplayName(BaseComponent, 'withMouseDownState');

    state = {
      isMouseDown: false,
    };

    setMouseDown = nextMouseDown =>
      this.setState({ isMouseDown: nextMouseDown });

    handleMouseDown = () => this.setMouseDown(true);
    handleMouseUp = () => this.setMouseDown(false);

    render() {
      const injectedProps = {
        isMouseDown: this.state.isMouseDown,
        handleMouseDown: this.handleMouseDown,
        handleMouseUp: this.handleMouseUp,
      };

      return <BaseComponent {...{ ...this.props, ...injectedProps }} />;
    }
  }

  return WithMouseDownState;
};

export default withMouseDownState;
