import styled from '@emotion/styled';
import { Text } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../test/percy';

const NarrowBox = styled.div`
  width: 200px;
`;

const intlMessage = { id: 'Title', defaultMessage: 'Hello' };

export const routePath = '/text';

export const component = () => (
  <Suite>
    <Spec label="Headline - h1">
      <Text.Headline as="h1">{'Title H1'}</Text.Headline>
    </Spec>
    <NarrowBox>
      <Spec label="Headline - h1 - truncated">
        <Text.Headline as="h1" truncate={true}>
          {'A longer title that should be truncated'}
        </Text.Headline>
      </Spec>
    </NarrowBox>
    <NarrowBox>
      <Spec label="Headline - h1 - nowrap">
        <Text.Headline as="h1" nowrap={true}>
          {'A longer title that should not be new line'}
        </Text.Headline>
      </Spec>
    </NarrowBox>

    <Spec label="Headline - h2">
      <Text.Headline as="h2">{'Title H2'}</Text.Headline>
    </Spec>
    <Spec label="Headline - h3">
      <Text.Headline as="h3">{'Title H3'}</Text.Headline>
    </Spec>
    <Spec label="Subheadline - h4">
      <Text.Subheadline as="h4">{'Bigger subheadline'}</Text.Subheadline>
    </Spec>
    <NarrowBox>
      <Spec label="Subheadline - h4 - truncated">
        <Text.Subheadline as="h4" truncate={true}>
          {'A longer subheadline that should be truncated'}
        </Text.Subheadline>
      </Spec>
    </NarrowBox>
    <NarrowBox>
      <Spec label="Subheadline - h4 - nowrap">
        <Text.Subheadline as="h4" nowrap={true}>
          {'A longer title that should not be new line'}
        </Text.Subheadline>
      </Spec>
    </NarrowBox>
    <Spec label="Subheadline - h4 - bold">
      <Text.Subheadline isBold={true} as="h4">
        {'Bold subheadline'}
      </Text.Subheadline>
    </Spec>
    <Spec label="Subheadline - tone - primary">
      <Text.Subheadline tone="primary" as="h4">
        {'Subheadline tone primary'}
      </Text.Subheadline>
    </Spec>
    <Spec label="Subheadline - tone - secondary">
      <Text.Subheadline tone="secondary" as="h4">
        {'Subheadline tone secondary'}
      </Text.Subheadline>
    </Spec>
    <Spec label="Subheadline - tone - information">
      <Text.Subheadline tone="information" as="h4">
        {'Subheadline tone information'}
      </Text.Subheadline>
    </Spec>
    <Spec label="Subheadline - tone - positive">
      <Text.Subheadline tone="positive" as="h4">
        {'Subheadline tone positive'}
      </Text.Subheadline>
    </Spec>
    <Spec label="Subheadline - tone - negative">
      <Text.Subheadline tone="negative" as="h4">
        {'Subheadline tone negative'}
      </Text.Subheadline>
    </Spec>
    <Spec label="Subheadline - h5">
      <Text.Subheadline as="h5">{'Smaller subheadline'}</Text.Subheadline>
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
    <Spec label="Body - strikethrough">
      <Text.Body isStrikethrough={true}>Body text strikethrough</Text.Body>
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
      <Spec label="Body - truncate">
        <Text.Body truncate={true}>
          A longer body text that needs to be truncated.
        </Text.Body>
      </Spec>
    </NarrowBox>
    <NarrowBox>
      <Spec label="Body - nowrap">
        <Text.Body nowrap={true}>
          A longer title that should not be new line
        </Text.Body>
      </Spec>
    </NarrowBox>
    <Spec label="Body - inline" omitPropsList>
      <Text.Body as="span">One inline body text{'. '}</Text.Body>
      <Text.Body as="span">A second inline text.</Text.Body>
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
    <Spec label="Detail - strikethrough">
      <Text.Detail isStrikethrough={true}>Detail text strikethrough</Text.Detail>
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
      <Spec label="Detail - truncate">
        <Text.Detail truncate={true}>
          A longer detail text that needs to be truncated.
        </Text.Detail>
      </Spec>
    </NarrowBox>
    <NarrowBox>
      <Spec label="Detail - nowrap">
        <Text.Detail nowrap={true}>
          A longer title that should not be new line
        </Text.Detail>
      </Spec>
    </NarrowBox>
    <Spec label="Headline - h1 (intl message)">
      <Text.Headline as="h1" intlMessage={intlMessage} />
    </Spec>
    <Spec label="Headline - h2 (intl message)">
      <Text.Headline as="h2" intlMessage={intlMessage} />
    </Spec>
    <Spec label="Headline - h3 (intl message)">
      <Text.Headline as="h3" intlMessage={intlMessage} />
    </Spec>
    <Spec label="Subheadline - h4 (intl message)">
      <Text.Subheadline as="h4" intlMessage={intlMessage} />
    </Spec>
    <Spec label="Subheadline - h5 (intl message)">
      <Text.Subheadline as="h5" intlMessage={intlMessage} />
    </Spec>
    <Spec label="Wrap (intl message)">
      <Text.Wrap
        intlMessage={{
          ...intlMessage,
          defaultMessage:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }}
      />
    </Spec>
    <Spec label="Body (intl message)">
      <Text.Body intlMessage={intlMessage} />
    </Spec>
    <Spec label="Detail (intl message)">
      <Text.Detail intlMessage={intlMessage} />
    </Spec>
  </Suite>
);
