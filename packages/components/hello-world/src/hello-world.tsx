type THelloWorldProps = {
  /**
   * Text to display
   */
  text: string;
};

const HelloWorld = (props: THelloWorldProps) => {
  return <div>{props.text || 'Hello World'}</div>;
};

export default HelloWorld;
