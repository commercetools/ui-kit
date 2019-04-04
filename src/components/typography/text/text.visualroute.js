import React from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import { Text } from 'ui-kit';
import { Suite, Spec } from '../../../../test/percy';

const NarrowBox = styled.div`
  width: 200px;
`;

const darkTheme = {
  colorSurface: 'black',
};

export const routePath = '/text';

export const component = () => (
  <Suite>
    <Spec label="Headline - h1">
      <Text.Headline elementType="h1">{'Title H1'}</Text.Headline>
    </Spec>
    <NarrowBox>
      <Spec label="Headline - h1 - truncated">
        <Text.Headline elementType="h1" truncate={true}>
          {'A longer title that should be truncated'}
        </Text.Headline>
      </Spec>
    </NarrowBox>

    <Spec label="Headline - h2">
      <Text.Headline elementType="h2">{'Title H2'}</Text.Headline>
    </Spec>
    <Spec label="Headline - h3">
      <Text.Headline elementType="h3">{'Title H3'}</Text.Headline>
    </Spec>
    <Spec label="Subheadline - h4">
      <Text.Subheadline elementType="h4">
        {'Bigger subheadline'}
      </Text.Subheadline>
    </Spec>
    <NarrowBox>
      <Spec label="Subheadline - h4 - truncated">
        <Text.Subheadline elementType="h4" truncate={true}>
          {'A longer subheadline that should be truncated'}
        </Text.Subheadline>
      </Spec>
    </NarrowBox>
    <Spec label="Subheadline - h4 - bold">
      <Text.Subheadline isBold={true} elementType="h4">
        {'Bold subheadline'}
      </Text.Subheadline>
    </Spec>
    <Spec label="Subheadline - tone - primary">
      <Text.Subheadline tone="primary" elementType="h4">
        {'Subheadline tone primary'}
      </Text.Subheadline>
    </Spec>
    <Spec label="Subheadline - tone - secondary">
      <Text.Subheadline tone="secondary" elementType="h4">
        {'Subheadline tone secondary'}
      </Text.Subheadline>
    </Spec>
    <Spec label="Subheadline - tone - information">
      <Text.Subheadline tone="information" elementType="h4">
        {'Subheadline tone information'}
      </Text.Subheadline>
    </Spec>
    <Spec label="Subheadline - tone - positive">
      <Text.Subheadline tone="positive" elementType="h4">
        {'Subheadline tone positive'}
      </Text.Subheadline>
    </Spec>
    <Spec label="Subheadline - tone - negative">
      <Text.Subheadline tone="negative" elementType="h4">
        {'Subheadline tone negative'}
      </Text.Subheadline>
    </Spec>
    <Spec label="Subheadline - h5">
      <Text.Subheadline elementType="h5">
        {'Smaller subheadline'}
      </Text.Subheadline>
    </Spec>
    <NarrowBox>
      <Spec label="Wrap">
        <Text.Wrap>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text.Wrap>
      </Spec>
    </NarrowBox>
    <Spec label="Body">
      <Text.Body>Body text</Text.Body>
    </Spec>
    <Spec label="Body - bold">
      <Text.Body isBold={true}>Body text bold</Text.Body>
    </Spec>
    <Spec label="Body - italic">
      <Text.Body isItalic={true}>Body text italic</Text.Body>
    </Spec>
    <Spec label="Body - tone - primary">
      <Text.Body tone="primary">Body text primary</Text.Body>
    </Spec>
    <Spec label="Body - tone - secondary">
      <Text.Body tone="secondary">Body text secondary</Text.Body>
    </Spec>
    <Spec label="Body - tone - information">
      <Text.Body tone="information">Body text information</Text.Body>
    </Spec>
    <Spec label="Body - tone - positive">
      <Text.Body tone="positive">Body text positive</Text.Body>
    </Spec>
    <Spec label="Body - tone - negative">
      <Text.Body tone="negative">Body text negative</Text.Body>
    </Spec>
    <NarrowBox>
      <ThemeProvider theme={darkTheme}>
        <Spec label="Body - tone - inverted">
          <Text.Body tone="inverted">Body text inverted</Text.Body>
        </Spec>
      </ThemeProvider>
    </NarrowBox>
    <NarrowBox>
      <Spec label="Body - truncate">
        <Text.Body truncate={true}>
          A longer body text that needs to be truncated.
        </Text.Body>
      </Spec>
    </NarrowBox>
    <Spec label="Body - inline" omitPropsList>
      <Text.Body isInline={true}>One inline body text{'. '}</Text.Body>
      <Text.Body isInline={true}>A second inline text.</Text.Body>
    </Spec>
    <Spec label="Detail">
      <Text.Detail>Detail text</Text.Detail>
    </Spec>
    <Spec label="Detail - bold">
      <Text.Detail isBold={true}>Detail text bold</Text.Detail>
    </Spec>
    <Spec label="Detail - italic">
      <Text.Detail isItalic={true}>Detail text italic</Text.Detail>
    </Spec>
    <Spec label="Detail - tone - primary">
      <Text.Detail tone="primary">Detail text primary</Text.Detail>
    </Spec>
    <Spec label="Detail - tone - secondary">
      <Text.Detail tone="secondary">Detail text secondary</Text.Detail>
    </Spec>
    <Spec label="Detail - tone - information">
      <Text.Detail tone="information">Detail text information</Text.Detail>
    </Spec>
    <Spec label="Detail - tone - positive">
      <Text.Detail tone="positive">Detail text positive</Text.Detail>
    </Spec>
    <Spec label="Detail - tone - negative">
      <Text.Detail tone="negative">Detail text negative</Text.Detail>
    </Spec>
    <NarrowBox>
      <ThemeProvider theme={darkTheme}>
        <Spec label="Detail - tone - inverted">
          <Text.Detail tone="inverted">Detail text inverted</Text.Detail>
        </Spec>
      </ThemeProvider>
    </NarrowBox>
    <NarrowBox>
      <Spec label="Detail - truncate">
        <Text.Detail truncate={true}>
          A longer detail text that needs to be truncated.
        </Text.Detail>
      </Spec>
    </NarrowBox>
    <Spec label="Detail - inline" omitPropsList>
      <Text.Detail isInline={true}>One inline detail text{'. '}</Text.Detail>
      <Text.Detail isInline={true}>A second inline text.</Text.Detail>
    </Spec>
  </Suite>
);
