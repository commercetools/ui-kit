import React from 'react';
import wrapDisplayName from '../wrap-display-name';

const withMouseOverState = BaseComponent => {
  class WithMouseOverState extends React.Component {
    static displayName = wrapDisplayName(BaseComponent, 'withMouseOverState');

    state = {
      isMouseOver: false,
    };

    setMouseOver = nextMouseOver =>
      this.setState({ isMouseOver: nextMouseOver });

    handleMouseOver = () => this.setMouseOver(true);
    handleMouseOut = () => this.setMouseOver(false);

    render() {
      const injectedProps = {
        isMouseOver: this.state.isMouseOver,
        handleMouseOver: this.handleMouseOver,
        handleMouseOut: this.handleMouseOut,
      };

      return <BaseComponent {...{ ...this.props, ...injectedProps }} />;
    }
  }

  return WithMouseOverState;
};

export default withMouseOverState;
