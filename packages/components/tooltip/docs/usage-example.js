import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import Tooltip from '@commercetools-uikit/tooltip';

/* 1. Standard example */
const ExampleStandard = () => (
  <Tooltip
    placement="left"
    title="If you buy a pizza, you will also get a free ice cream :)"
  >
    <button onClick={() => {}}>Submit</button>
  </Tooltip>
);

/**
 * 2. Working with disabled child elements
 *
 * When you use a tooltip with a disabled element, you should define the
 * style `pointer-events: none` to the disabled element to stop it from capturing events.
 * The Button components from UIKit already support this functionality.
 */
const ExampleWithDisabledElements = () => (
  <Tooltip
    placement="left"
    title="You do not have permission to delete the database"
  >
    <button disabled onClick={() => {}} style={{ pointerEvents: 'none' }}>
      Delete production database
    </button>
  </Tooltip>
);

/**
 * 3. Customizing the wrapper
 *
 * The tooltip applies event listeners (`onMouseOver`, `onMouseLeave`, `onFocus`,
 * and `onBlur`) to a wrapping `div` component around the children element.
 * By default, this wrapper is displayed with style `inline-block`.
 * If you want to customize this behaviour, then you can pass in a custom element.
 * Be sure to use `React.forwardRef`, as we need the to pass the ref to the wrapper.
 */
const Wrapper = React.forwardRef((props, ref) => (
  <div ref={ref} style={{ display: 'block' }} {...props}>
    {props.children}
  </div>
));
Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
const FullWidthButton = styled.button`
  display: block;
  width: 100%;
`;
const ExampleWithCustomWrapper = () => (
  <Tooltip title="Delete" components={{ WrapperComponent: Wrapper }}>
    <FullWidthButton>Submit</FullWidthButton>
  </Tooltip>
);

/**
 * 4. Customizing the tooltip body
 *
 * You can customize the look and feel of the tooltip body by passing in a custom `BodyComponent`.
 */
const Body = styled.div`
  color: red;
`;
const ExampleWithCustomBody = () => (
  <Tooltip title="Delete" components={{ BodyComponent: Body }}>
    <button>Submit</button>
  </Tooltip>
);

/**
 * 5. Customizing where the portal is rendered
 *
 * When you are dealing with virtualized components, it can be useful to render
 * the tooltip into another part of the document.
 * You can define a `TooltipWrapperComponent` to do this.
 */
const Portal = (props) => ReactDOM.createPortal(props.children, document.body);
const ExampleWithCustomPortal = () => (
  <Tooltip title="Delete" components={{ TooltipWrapperComponent: Portal }}>
    <button>Submit</button>
  </Tooltip>
);

/**
 * 6. Conditionally displaying tooltips
 *
 * There may be cases when you only want to enable the display of a tooltip under
 * a certain condition. In these cases, you may want to use the `off` prop.
 * In the following example, the tooltip text only appears on hover when the button is disabled.
 */
const ExampleWithConditionals = (props) => (
  <Tooltip
    off={props.isDisabled}
    title="You do not have permission to perform this action"
  >
    <button disabled={props.isDisabled}>Submit</button>
  </Tooltip>
);
ExampleWithConditionals.propTypes = {
  isDisabled: PropTypes.bool,
};

/**
 * 7. Fine-tuning underlying Popper.js behavior
 *
 * This component uses [Popper.js](https://popper.js.org/) under the hood.
 * Popper provides a way to adjust how tooltip element should behave, by providing
 * a [set of `modifiers`](https://popper.js.org/popper-documentation.html#modifiers).
 * For instance, forcing tooltip to stay in the original placement and not to try
 * flipping when it's getting out of boundaries, can be implemented as following:
 */
const ExampleWithCustomPopperBehavior = (props) => (
  <Tooltip
    placement="left"
    title="I will always be on the left side"
    modifiers={{
      preventOverflow: {
        enabled: false,
      },
      flip: {
        enabled: false,
      },
    }}
  >
    <button disabled={props.isDisabled}>Submit</button>
  </Tooltip>
);
ExampleWithCustomPopperBehavior.propTypes = {
  isDisabled: PropTypes.bool,
};

export {
  ExampleStandard,
  ExampleWithDisabledElements,
  ExampleWithCustomWrapper,
  ExampleWithCustomBody,
  ExampleWithCustomPortal,
  ExampleWithConditionals,
  ExampleWithCustomPopperBehavior,
};
