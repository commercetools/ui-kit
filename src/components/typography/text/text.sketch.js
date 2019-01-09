import React from 'react';
import { Text } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

export default () => (
  <Suite>
    <Spec label="Headline - h1">
      <div data-sketch-text="Text.Headline/h1">
        <Text.Headline elementType="h1">{'Title H1'}</Text.Headline>
      </div>
    </Spec>
    <Spec label="Headline - h2">
      <div data-sketch-text="Text.Headline/h2">
        <Text.Headline elementType="h2">{'Title H2'}</Text.Headline>
      </div>
    </Spec>
    <Spec label="Headline - h3">
      <div data-sketch-text="Text.Headline/h3">
        <Text.Headline elementType="h3">{'Title H3'}</Text.Headline>
      </div>
    </Spec>
    <Spec label="Subheadline - h4">
      <div data-sketch-text="Text.Subheadline/element/h4/font/regular">
        <Text.Subheadline elementType="h4">
          {'Bigger subheadline'}
        </Text.Subheadline>
      </div>
    </Spec>
    <Spec label="Subheadline - h4 - bold">
      <div data-sketch-text="Text.Subheadline/element/h4/font/bold">
        <Text.Subheadline isBold={true} elementType="h4">
          {'Bold subheadline'}
        </Text.Subheadline>
      </div>
    </Spec>
    <Spec label="Subheadline - tone - primary">
      <div data-sketch-text="Text.Subheadline/element/h4/tone/primary">
        <Text.Subheadline tone="primary" elementType="h4">
          {'Subheadline tone primary'}
        </Text.Subheadline>
      </div>
    </Spec>
    <Spec label="Subheadline - tone - secondary">
      <div data-sketch-text="Text.Subheadline/element/h4/tone/secondary">
        <Text.Subheadline tone="secondary" elementType="h4">
          {'Subheadline tone secondary'}
        </Text.Subheadline>
      </div>
    </Spec>
    <Spec label="Subheadline - tone - information">
      <div data-sketch-text="Text.Subheadline/element/h4/tone/information">
        <Text.Subheadline tone="information" elementType="h4">
          {'Subheadline tone information'}
        </Text.Subheadline>
      </div>
    </Spec>
    <Spec label="Subheadline - tone - positive">
      <div data-sketch-text="Text.Subheadline/element/h4/tone/positive">
        <Text.Subheadline tone="positive" elementType="h4">
          {'Subheadline tone positive'}
        </Text.Subheadline>
      </div>
    </Spec>
    <Spec label="Subheadline - tone - negative">
      <div data-sketch-text="Text.Subheadline/element/h4/tone/negative">
        <Text.Subheadline tone="negative" elementType="h4">
          {'Subheadline tone negative'}
        </Text.Subheadline>
      </div>
    </Spec>
    <Spec label="Subheadline - h5">
      <div data-sketch-text="Text.Subheadline/element/h5">
        <Text.Subheadline elementType="h5">
          {'Smaller subheadline'}
        </Text.Subheadline>
      </div>
    </Spec>
    <Spec label="Body">
      <div data-sketch-text="Text.Body/font/regular">
        <Text.Body>Body text</Text.Body>
      </div>
    </Spec>
    <Spec label="Body - bold">
      <div data-sketch-text="Text.Body/font/bold">
        <Text.Body isBold={true}>Body text bold</Text.Body>
      </div>
    </Spec>
    <Spec label="Body - italic">
      <div data-sketch-text="Text.Body/font/italic">
        <Text.Body isItalic={true}>Body text italic</Text.Body>
      </div>
    </Spec>
    <Spec label="Body - tone - primary">
      <div data-sketch-text="Text.Body/tone/primary">
        <Text.Body tone="primary">Body text primary</Text.Body>
      </div>
    </Spec>
    <Spec label="Body - tone - secondary">
      <div data-sketch-text="Text.Body/tone/secondary">
        <Text.Body tone="secondary">Body text secondary</Text.Body>
      </div>
    </Spec>
    <Spec label="Body - tone - information">
      <div data-sketch-text="Text.Body/tone/information">
        <Text.Body tone="information">Body text information</Text.Body>
      </div>
    </Spec>
    <Spec label="Body - tone - positive">
      <div data-sketch-text="Text.Body/tone/positive">
        <Text.Body tone="positive">Body text positive</Text.Body>
      </div>
    </Spec>
    <Spec label="Body - tone - negative">
      <div data-sketch-text="Text.Body/tone/negative">
        <Text.Body tone="negative">Body text negative</Text.Body>
      </div>
    </Spec>
    <Spec inverted label="Body - tone - inverted">
      <div data-sketch-text="Text.Body/tone/inverted">
        <Text.Body tone="inverted">Body text inverted</Text.Body>
      </div>
    </Spec>
    <Spec label="Detail">
      <div data-sketch-text="Text.Detail/font/regular">
        <Text.Detail>Detail text</Text.Detail>
      </div>
    </Spec>
    <Spec label="Detail - bold">
      <div data-sketch-text="Text.Detail/font/bold">
        <Text.Detail isBold={true}>Detail text bold</Text.Detail>
      </div>
    </Spec>
    <Spec label="Detail - italic">
      <div data-sketch-text="Text.Detail/font/italic">
        <Text.Detail isItalic={true}>Detail text italic</Text.Detail>
      </div>
    </Spec>
    <Spec label="Detail - tone - primary">
      <div data-sketch-text="Text.Detail/tone/primary">
        <Text.Detail tone="primary">Detail text primary</Text.Detail>
      </div>
    </Spec>
    <Spec label="Detail - tone - secondary">
      <div data-sketch-text="Text.Detail/tone/secondary">
        <Text.Detail tone="secondary">Detail text secondary</Text.Detail>
      </div>
    </Spec>
    <Spec label="Detail - tone - information">
      <div data-sketch-text="Text.Detail/tone/information">
        <Text.Detail tone="information">Detail text information</Text.Detail>
      </div>
    </Spec>
    <Spec label="Detail - tone - positive">
      <div data-sketch-text="Text.Detail/tone/positive">
        <Text.Detail tone="positive">Detail text positive</Text.Detail>
      </div>
    </Spec>
    <Spec label="Detail - tone - negative">
      <div data-sketch-text="Text.Detail/tone/negative">
        <Text.Detail tone="negative">Detail text negative</Text.Detail>
      </div>
    </Spec>
    <Spec inverted label="Detail - tone - inverted">
      <div data-sketch-text="Text.Detail/tone/inverted">
        <Text.Detail tone="inverted">Detail text inverted</Text.Detail>
      </div>
    </Spec>
  </Suite>
);
