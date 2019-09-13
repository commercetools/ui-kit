import React from 'react';
import { Value } from 'slate';
import { RichTextInput } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';
import jsonMinimalValue from './testValue';
import jsonLargeValue from './value';

const minimalValue = Value.fromJSON(jsonMinimalValue);
const largeValue = Value.fromJSON(jsonLargeValue);

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
  </Suite>
);
