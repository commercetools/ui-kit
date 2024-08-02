import { createPortal } from 'react-dom';
import { forwardRef, type FC } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Tooltip, { TTooltipProps } from './tooltip';
import PrimaryButton from '@commercetools-uikit/primary-button';
import styled from '@emotion/styled';

const meta: Meta<typeof Tooltip> = {
  title: 'components/Tooltip',
  component: Tooltip,
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

/** At it's most basic usage, `<Tooltip/>` expects a `title` and `children`-property.
 * The `children`-property is the element that will trigger the tooltip to be shown.
 * The `title`-property is the text that will be shown in the tooltip.
 */
export const BasicExample: Story = ({ children, ...args }: TTooltipProps) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 256,
      }}
    >
      <Tooltip {...args}>
        <PrimaryButton
          label="Buy Pizza now!"
          onClick={() => {}}
        ></PrimaryButton>
      </Tooltip>
    </div>
  );
};

BasicExample.args = {
  title: 'If you buy 🍕, you will also get a free 🍦! ',
};

/**
 * Working with disabled child elements
 * When you use a tooltip with a disabled element, you should define the
 * style `pointer-events: none` to the disabled element to stop it from capturing events.
 */
export const ExampleWithDisabledElements = () => (
  <Tooltip
    placement="left"
    title="You do not have permission to delete the database"
  >
    <PrimaryButton
      isDisabled
      onClick={() => {}}
      style={{ pointerEvents: 'none' }}
      label={'Delete production database'}
    />
  </Tooltip>
);

/**
 * The tooltip applies event listeners (`onMouseOver`, `onMouseLeave`, `onFocus`,
 * and `onBlur`) to a wrapping div component around the children element.
 * By default, this wrapper is displayed with `display: inline-block`.
 * If you want to customize this behaviour, then you can pass in a custom element.
 * Be sure to use `React.forwardRef`, as the component needs to pass the `ref` to the wrapper.
 */

export const ExampleWithCustomWrapper: Story = (args: TTooltipProps) => {
  // The Wrapper needs to forward the ref to the wrapping element.
  const Wrapper = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
  >((props, ref) => (
    <div
      ref={ref}
      style={{ display: 'block', outline: '1px solid tomato' }}
      {...props}
    />
  ));

  Wrapper.displayName = 'Wrapper';

  return (
    <Tooltip
      components={{
        WrapperComponent: Wrapper,
      }}
      {...args}
    >
      <PrimaryButton
        onClick={() => {}}
        style={{ pointerEvents: 'none' }}
        label={'Wrapper influences positioning of the tooltip'}
      />
    </Tooltip>
  );
};

ExampleWithCustomWrapper.args = {
  title: 'Delete',
};

/**
 * You can customize the look and feel of the tooltip by passing in a custom `BodyComponent` via the `components` property.
 */
export const CustomTooltipDesign = () => {
  const CustomBody = styled.div`
    background: red;
    color: white;
    padding: 0.5em;
  `;

  return (
    <Tooltip title="Delete" components={{ BodyComponent: CustomBody }}>
      <PrimaryButton onClick={() => {}} label={'I use a custom tooltip'} />
    </Tooltip>
  );
};

CustomTooltipDesign.args = {
  title: 'I use a custom BodyComponent',
};

const Portal: FC = (props) => createPortal(props.children, document.body);

/**
 * When you are dealing with virtualized components, it can be useful to render
 * the tooltip into another part of the document.
 * You can define a TooltipWrapperComponent to do this.
 */
export const ExampleWithCustomPortal = () => (
  <Tooltip title="Delete" components={{ TooltipWrapperComponent: Portal }}>
    <PrimaryButton onClick={() => {}} label={"I'm using my own Portal"} />
  </Tooltip>
);
