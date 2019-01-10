import React from 'react';
import { Text } from 'ui-kit';
import { Suite, SketchSpec } from '../../../../test/percy';

export default (
  <Suite>
    <SketchSpec label="Text.Headline">
      <div data-sketch-text="Text.Headline/h1">
        <Text.Headline elementType="h1">{'Title H1'}</Text.Headline>
      </div>
      <div data-sketch-text="Text.Headline/h2">
        <Text.Headline elementType="h2">{'Title H2'}</Text.Headline>
      </div>
      <div data-sketch-text="Text.Headline/h3">
        <Text.Headline elementType="h3">{'Title H3'}</Text.Headline>
      </div>
    </SketchSpec>
    <SketchSpec label="Text.Subheadline">
      <div data-sketch-text="Text.Subheadline/h4/regular">
        <Text.Subheadline elementType="h4">
          {'Bigger subheadline'}
        </Text.Subheadline>
      </div>
      <div data-sketch-text="Text.Subheadline/h4/bold">
        <Text.Subheadline isBold={true} elementType="h4">
          {'Bold subheadline'}
        </Text.Subheadline>
      </div>
      <div data-sketch-text="Text.Subheadline/h4/primary">
        <Text.Subheadline tone="primary" elementType="h4">
          {'Subheadline tone primary'}
        </Text.Subheadline>
      </div>
      <div data-sketch-text="Text.Subheadline/h4/secondary">
        <Text.Subheadline tone="secondary" elementType="h4">
          {'Subheadline tone secondary'}
        </Text.Subheadline>
      </div>
      <div data-sketch-text="Text.Subheadline/h4/information">
        <Text.Subheadline tone="information" elementType="h4">
          {'Subheadline tone information'}
        </Text.Subheadline>
      </div>
      <div data-sketch-text="Text.Subheadline/h4/positive">
        <Text.Subheadline tone="positive" elementType="h4">
          {'Subheadline tone positive'}
        </Text.Subheadline>
      </div>
      <div data-sketch-text="Text.Subheadline/h4/negative">
        <Text.Subheadline tone="negative" elementType="h4">
          {'Subheadline tone negative'}
        </Text.Subheadline>
      </div>
      <div data-sketch-text="Text.Subheadline/h5">
        <Text.Subheadline elementType="h5">
          {'Smaller subheadline'}
        </Text.Subheadline>
      </div>
    </SketchSpec>
    <SketchSpec label="Text.Body">
      <div data-sketch-text="Text.Body/regular">
        <Text.Body>Body text</Text.Body>
      </div>
      <div data-sketch-text="Text.Body/bold">
        <Text.Body isBold={true}>Body text bold</Text.Body>
      </div>
      <div data-sketch-text="Text.Body/italic">
        <Text.Body isItalic={true}>Body text italic</Text.Body>
      </div>
      <div data-sketch-text="Text.Body/primary">
        <Text.Body tone="primary">Body text primary</Text.Body>
      </div>
      <div data-sketch-text="Text.Body/secondary">
        <Text.Body tone="secondary">Body text secondary</Text.Body>
      </div>
      <div data-sketch-text="Text.Body/information">
        <Text.Body tone="information">Body text information</Text.Body>
      </div>
      <div data-sketch-text="Text.Body/positive">
        <Text.Body tone="positive">Body text positive</Text.Body>
      </div>
      <div data-sketch-text="Text.Body/negative">
        <Text.Body tone="negative">Body text negative</Text.Body>
      </div>
      <div data-sketch-text="Text.Body/inverted">
        <Text.Body tone="inverted">Body text inverted</Text.Body>
      </div>
    </SketchSpec>
    <SketchSpec label="Text.Detail">
      <div data-sketch-text="Text.Detail/regular">
        <Text.Detail>Detail text</Text.Detail>
      </div>
      <div data-sketch-text="Text.Detail/bold">
        <Text.Detail isBold={true}>Detail text bold</Text.Detail>
      </div>
      <div data-sketch-text="Text.Detail/italic">
        <Text.Detail isItalic={true}>Detail text italic</Text.Detail>
      </div>
      <div data-sketch-text="Text.Detail/primary">
        <Text.Detail tone="primary">Detail text primary</Text.Detail>
      </div>
      <div data-sketch-text="Text.Detail/secondary">
        <Text.Detail tone="secondary">Detail text secondary</Text.Detail>
      </div>
      <div data-sketch-text="Text.Detail/information">
        <Text.Detail tone="information">Detail text information</Text.Detail>
      </div>
      <div data-sketch-text="Text.Detail/positive">
        <Text.Detail tone="positive">Detail text positive</Text.Detail>
      </div>
      <div data-sketch-text="Text.Detail/negative">
        <Text.Detail tone="negative">Detail text negative</Text.Detail>
      </div>
      <div data-sketch-text="Text.Detail/inverted">
        <Text.Detail tone="inverted">Detail text inverted</Text.Detail>
      </div>
    </SketchSpec>
  </Suite>
);
