import React from 'react';
import { Switch, Route } from 'react-router';
import { Value } from 'slate';
import { RichTextInput } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';
import jsonMinimalValue from './testing/json-values/minimal-value';
import jsonLargeValue from './testing/json-values/large-value';
import jsonEmptyValue from './testing/json-values/empty-value';

const minimalValue = Value.fromJSON(jsonMinimalValue);
const largeValue = Value.fromJSON(jsonLargeValue);
const emptyValue = Value.fromJSON(jsonEmptyValue);

export const routePath = '/rich-text-input';

// this route will be used with puppeteer based testing.
const InteractiveRoute = () => {
  const [value, setValue] = React.useState(emptyValue);

  const onChange = event => {
    setValue(event.target.value);
  };

  return (
    <Suite>
      <Spec label="minimal" omitPropsList>
        <label htmlFor="rich-text">Rich text</label>
        <RichTextInput
          id="rich-text"
          onChange={onChange}
          value={value}
          horizontalConstraint="m"
        />
      </Spec>
    </Suite>
  );
};

const DefaultRoute = () => (
  <Suite>
    <Spec label="minimal" omitPropsList>
      <RichTextInput
        onChange={() => {}}
        value={minimalValue}
        horizontalConstraint="m"
      />
    </Spec>

    <Spec
      label="with a longer value and defaultExpandMultilineText disabled"
      omitPropsList
    >
      <RichTextInput
        onChange={() => {}}
        value={largeValue}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec
      label="with a longer value and defaultExpandMultilineText enabled"
      omitPropsList
    >
      <RichTextInput
        onChange={() => {}}
        value={largeValue}
        defaultExpandMultilineText={true}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when placeholder is visible" omitPropsList>
      <RichTextInput
        onChange={() => {}}
        value={emptyValue}
        placeholder="Placeholder"
        defaultExpandMultilineText={true}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when hasWarning" omitPropsList>
      <RichTextInput
        onChange={() => {}}
        value={minimalValue}
        hasWarning={true}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when hasError" omitPropsList>
      <RichTextInput
        onChange={() => {}}
        value={minimalValue}
        hasError={true}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="with horizontalConstraint `l`" omitPropsList>
      <RichTextInput
        onChange={() => {}}
        value={minimalValue}
        horizontalConstraint="l"
      />
    </Spec>
    <Spec label="with horizontalConstraint `xl`" omitPropsList>
      <RichTextInput
        onChange={() => {}}
        value={minimalValue}
        horizontalConstraint="xl"
      />
    </Spec>
    <Spec label="with horizontalConstraint `scale`" omitPropsList>
      <RichTextInput
        onChange={() => {}}
        value={minimalValue}
        horizontalConstraint="scale"
      />
    </Spec>
  </Suite>
);

export const component = () => (
  <Switch>
    <Route path={`${routePath}/interactive`} component={InteractiveRoute} />
    <Route path={routePath} component={DefaultRoute} />
  </Switch>
);
