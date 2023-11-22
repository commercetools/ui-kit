import { storiesOf } from '@storybook/react';
import { designTokens } from '@commercetools-uikit/design-system';
import styled from '@emotion/styled';
import Horizontal from './horizontal';
import { getAcceptedMaxPropValues, getMaxPropTokenValue } from '../helpers';
import Readme from '../../README.md';

const ColouredRow = styled.div`
  display: flex;
  padding: 2px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: ${designTokens.borderRadius6};
  color: ${designTokens.colorSurface};
  background-color: ${designTokens.colorPrimary};
`;

const Stack = styled.div`
  > * + * {
    margin: 8px 0 0;
  }
`;

const Wrapper = styled.div`
  position: relative;
  padding-top: ${designTokens.spacing50};
`;

const ColumnsContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  white-space: nowrap;
`;
const Column = styled.div`
  display: inline-block;
  width: ${designTokens.constraint2};
  margin-right: ${designTokens.spacing30};
  height: 100%;
  text-align: center;
  background-color: rgba(241, 109, 14, 0.3);
`;

storiesOf('Components|Constraints', module)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('Horizontal', () => {
    const values = getAcceptedMaxPropValues();

    return (
      <Wrapper>
        <ColumnsContainer>
          {Array.from({ length: 8 }).map((_, index) => (
            <Column key={index}>{`Column ${index + 1}`}</Column>
          ))}
        </ColumnsContainer>
        <Stack>
          {values.map((max) => (
            <Horizontal key={max} max={max}>
              <ColouredRow>
                <b>{max.toString()}</b>
                {typeof max === 'number' ? (
                  <small>{`${getMaxPropTokenValue(max)}`}</small>
                ) : null}
              </ColouredRow>
            </Horizontal>
          ))}
        </Stack>
      </Wrapper>
    );
  });
