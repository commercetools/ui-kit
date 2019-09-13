import React from 'react';
import { Value } from 'slate';
import { RichTextInput } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';
import jsonValue from './testValue';

const initialValue = Value.fromJSON(jsonValue);

export const routePath = '/rich-text-input';

export const component = () => (
  <Suite>
    <Spec label="minimal" omitPropsList>
      <RichTextInput
        defaultValue={initialValue}
        onChange={() => {}}
        value={initialValue}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when hasWarning" omitPropsList>
      <RichTextInput
        defaultValue={initialValue}
        onChange={() => {}}
        value={initialValue}
        hasWarning={true}
        horizontalConstraint="m"
      />
    </Spec>
    <Spec label="when hasError" omitPropsList>
      <RichTextInput
        defaultValue={initialValue}
        onChange={() => {}}
        value={initialValue}
        hasError={true}
        horizontalConstraint="m"
      />
    </Spec>
  </Suite>
);
