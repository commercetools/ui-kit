import styled from '@emotion/styled';
import { ProgressBar } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/progress-bar';

const InvertedContainer = styled.div`
  background-color: black;
  height: 100px;
`;

export const component = () => (
  <Suite>
    <Spec label="when label is a string">
      <ProgressBar label={`${50}% completed`} progress={50} />
    </Spec>
    <Spec label="when height is 10">
      <ProgressBar label={`${25}% completed`} progress={25} height="10" />
    </Spec>
    <Spec label="when bar width is scale">
      <ProgressBar label={`${25}% completed`} progress={25} height="10" barWidth={'scale'}/>
    </Spec>
    <Spec label="when isAnimated is false">
      <ProgressBar
        label={`${50}% completed`}
        progress={50}
        isAnimated={false}
      />
    </Spec>
    <Spec label="when label position is bottom">
      <ProgressBar
        labelPosition="bottom"
        label={`${50}% completed`}
        progress={50}
      />
    </Spec>
    <Spec label="when label position is left">
      <ProgressBar
        labelPosition="left"
        label={`${25}% completed`}
        progress={25}
      />
    </Spec>
    <Spec label="when label position is right">
      <ProgressBar
        labelPosition="right"
        label={`${60}% completed`}
        progress={60}
      />
    </Spec>
    <Spec label="when label position is left and labelWidth is 4">
      <ProgressBar
        labelPosition="left"
        label={`${25}% completed`}
        progress={25}
        labelWidth={4}
      />
    </Spec>
    <Spec label="when label position is right and bar width is 4">
      <ProgressBar
        labelPosition="right"
        label={`${50}% completed`}
        progress={50}
        barWidth={4}
      />
    </Spec>
    <Spec label="when label position is right and label is long">
      <ProgressBar
        labelPosition="right"
        label={`super long label title that exceeds the width of the constraint`}
        labelWidth={6}
        progress={50}
      />
    </Spec>
    <Spec label="when label position is left and label is long">
      <ProgressBar
        labelPosition="left"
        label={`super long label title that exceeds the width of the constraint`}
        progress={50}
        labelWidth={6}
        barWidth={4}
      />
    </Spec>
    <Spec label="when label is long">
      <ProgressBar
        label={`super long label title that exceeds the width of the constraint`}
        progress={50}
        labelWidth={6}
        barWidth={4}
      />
    </Spec>
    <Spec label="when label is long and label position is bottom">
      <ProgressBar
        labelPosition='bottom'
        label={`super long label title that exceeds the width of the constraint`}
        progress={50}
        labelWidth={6}
        barWidth={6}
      />
    </Spec>
    <Spec label="when inverted">
      <InvertedContainer >
        <ProgressBar label={`${75}% completed`} progress={75} isInverted />
      </InvertedContainer>
    </Spec>
    <Spec label="when inverted and label is left">
      <InvertedContainer >
        <ProgressBar
          labelPosition="left"
          label={`${75}% completed`}
          progress={75}
          isInverted
        />
      </InvertedContainer>
    </Spec>
    <Spec label="when inverted and label is right">
      <InvertedContainer >
        <ProgressBar
          labelPosition="right"
          label={`${75}% completed`}
          progress={75}
          isInverted
        />
      </InvertedContainer>
    </Spec>
    <Spec label="when inverted and label is bottom">
      <InvertedContainer >
        <ProgressBar
          labelPosition="bottom"
          label={`${75}% completed`}
          progress={75}
          isInverted
        />
      </InvertedContainer>
    </Spec>
  </Suite>
);
