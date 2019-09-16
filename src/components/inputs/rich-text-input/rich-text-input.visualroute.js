import React from 'react';
import { Value } from 'slate';
import { RichTextInput } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';
import jsonMinimalValue from './testValue';
import jsonLargeValue from './value';
import jsonEmptyValue from './test/emptyValue';

const minimalValue = Value.fromJSON(jsonMinimalValue);
const largeValue = Value.fromJSON(jsonLargeValue);
const emptyValue = Value.fromJSON(jsonEmptyValue);

export const routePath = '/rich-text-input';

export const component = () => (
  <Suite>
    <Spec label="minimal" omitPropsList>
      <RichTextInput
        defaultValue={minimalValue}
        onChange={() => {}}
        value={minimalValue}
        horizontalConstraint="m"
      />
    </Spec>

    <Spec
      label="with a a longer value and defaultExpandMultilineText disabled"
      omitPropsList
    >
      <RichTextInput
        defaultValue={largeValue}
        onChange={() => {}}
        value={largeValue}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec
      label="with a a longer value and defaultExpandMultilineText enabled"
      omitPropsList
    >
      <RichTextInput
        defaultValue={largeValue}
        onChange={() => {}}
        value={largeValue}
        defaultExpandMultilineText={true}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when placeholder is visible" omitPropsList>
      <RichTextInput
        defaultValue={emptyValue}
        onChange={() => {}}
        value={emptyValue}
        placeholder="Placeholder"
        defaultExpandMultilineText={true}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when hasWarning" omitPropsList>
      <RichTextInput
        defaultValue={minimalValue}
        onChange={() => {}}
        value={minimalValue}
        hasWarning={true}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when hasError" omitPropsList>
      <RichTextInput
        defaultValue={minimalValue}
        onChange={() => {}}
        value={minimalValue}
        hasError={true}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="with horizontalConstraint `l`" omitPropsList>
      <RichTextInput
        defaultValue={minimalValue}
        onChange={() => {}}
        value={minimalValue}
        horizontalConstraint="l"
      />
    </Spec>
    <Spec label="with horizontalConstraint `xl`" omitPropsList>
      <RichTextInput
        defaultValue={minimalValue}
        onChange={() => {}}
        value={minimalValue}
        horizontalConstraint="xl"
      />
    </Spec>
    <Spec label="with horizontalConstraint `scale`" omitPropsList>
      <RichTextInput
        defaultValue={minimalValue}
        onChange={() => {}}
        value={minimalValue}
        horizontalConstraint="scale"
      />
    </Spec>
  </Suite>
);
