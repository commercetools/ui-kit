import React from 'react';
import { Tag } from '../../../dist/ui-kit.esm';
import { Suite, Spec, screenshot } from '../../../test/percy';

screenshot('Tag', () => (
  <Suite>
    <Spec label="Normal">
      <Tag type="normal">Tag</Tag>
    </Spec>
    <Spec label="Normal - onRemove">
      <Tag type="normal" onRemove={() => {}}>
        With remove
      </Tag>
    </Spec>
    <Spec label="Normal - horizontalConstraint - xs">
      <Tag type="normal" horizontalConstraint="xs">
        Tag
      </Tag>
    </Spec>
    <Spec label="Normal - horizontalConstraint - s">
      <Tag type="normal" horizontalConstraint="s">
        Tag
      </Tag>
    </Spec>
    <Spec label="Normal - horizontalConstraint - m">
      <Tag type="normal" horizontalConstraint="m">
        Tag
      </Tag>
    </Spec>
    <Spec label="Normal - horizontalConstraint - l">
      <Tag type="normal" horizontalConstraint="l">
        Tag
      </Tag>
    </Spec>
    <Spec label="Normal - horizontalConstraint - xl">
      <Tag type="normal" horizontalConstraint="xl">
        Tag
      </Tag>
    </Spec>

    <Spec label="Warning">
      <Tag type="warning">Warning message</Tag>
    </Spec>
    <Spec label="Warning - disabled">
      <Tag type="warning" isDisabled={true}>
        Warning but disabled
      </Tag>
    </Spec>
  </Suite>
));
