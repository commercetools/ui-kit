import {
  FieldLabel,
  WarningIcon,
  FlatButton,
} from '@commercetools-frontend/ui-kit';
import styled from '@emotion/styled';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/field-label';

const BorderedBox = styled.div`
  border: 1px solid red;
`;
const NonRenderingComponent = () => null;

export const component = () => (
  <Suite>
    <Spec label="minimal">
      <FieldLabel title="Hello" horizontalConstraint={7} />
    </Spec>
    <Spec label="with hint and hint icon">
      <FieldLabel
        title="Hello"
        hint="a hint"
        hintIcon={<WarningIcon />}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="with required indicator">
      <FieldLabel
        title="Hello"
        hasRequiredIndicator={true}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="with required indicator and ReactNode as title">
      <FieldLabel
        title={<div>Hello</div>}
        hasRequiredIndicator={true}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="with all options">
      <FieldLabel
        title="Hello"
        hasRequiredIndicator={true}
        onInfoButtonClick={() => {}}
        hint="a hint"
        hintIcon={<WarningIcon />}
        description="description"
        badge={<FlatButton tone="primary" label="show" />}
        htmlFor="sampleInput"
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="with all options and large horizontal constraint">
      <FieldLabel
        title="Hello"
        hasRequiredIndicator={true}
        onInfoButtonClick={() => {}}
        hint="a hint"
        hintIcon={<WarningIcon />}
        description="description"
        badge={<FlatButton tone="primary" label="show" />}
        htmlFor="sampleInput"
        horizontalConstraint={10}
      />
    </Spec>
    <Spec label="with a very long hint">
      <FieldLabel
        title="Hello"
        hint="Sed vel condimentum lacus. Nam sit amet dui et magna tincidunt faucibus. Praesent gravida tempor semper. Donec et faucibus ante. Maecenas consectetur urna mi."
        hintIcon={<WarningIcon />}
        horizontalConstraint={7}
      />
    </Spec>
    <Spec label="with inverted tone" omitPropsList backgroundColor="black">
      <FieldLabel
        title="Hello"
        description="description"
        hasRequiredIndicator={true}
        tone="inverted"
      />
    </Spec>
    <Spec label="with react component description which renders nothing">
      <BorderedBox>
        <FieldLabel
          title="Hello"
          description={<NonRenderingComponent />}
        />
      </BorderedBox>
    </Spec>
  </Suite>
);
