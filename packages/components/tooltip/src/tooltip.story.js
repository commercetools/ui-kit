import { storiesOf } from '@storybook/react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import {
  withKnobs,
  boolean,
  text,
  select,
  number,
} from '@storybook/addon-knobs/react';
import Constraints from '@commercetools-uikit/constraints';
import { PrimaryButton } from '@commercetools-uikit/buttons';
import Section from '../../../../docs/.storybook/decorators/section';
import Readme from '../README.md';
import Tooltip from './tooltip';

const CustomWrapper = styled.div`
  display: block;
  background-color: pink;
`;

const CustomButtonWrapper = styled.div`
  width: min-content;
  > :disabled {
    pointer-events: none;
  }
`;

const CustomBody = styled.div`
  font-size: 0.875rem;
  color: red;
`;

storiesOf('Components|Tooltips', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('Tooltip', () => {
    const label = text('children', 'Tool tip text.');

    const constraint = select(
      'constraint',
      Constraints.getAcceptedMaxPropValues(),
      'scale'
    );

    const placement = select(
      'placement',
      {
        top: 'top',
        'top-start': 'top-start',
        'top-end': 'top-end',
        right: 'right',
        'right-start': 'right-start',
        'right-end': 'right-end',
        bottom: 'bottom',
        'bottom-start': 'bottom-start',
        'bottom-end': 'bottom-end',
        left: 'left',
        'left-start': 'left-start',
        'left-end': 'left-end',
      },
      'top'
    );

    const showAfter = number('show after', 300);
    const closeAfter = number('close after', 200);

    const fullWidth = boolean('full width wrapper', false);
    const customBodyWrapper = boolean('custom body wrapper', false);

    return (
      <Section>
        <div
          css={css`
            padding: 80px 0 80px 80px;
          `}
        >
          <p>With ui kit button</p>
          <Tooltip
            off={boolean('off', false)}
            title={label}
            showAfter={showAfter}
            closeAfter={closeAfter}
            placement={placement}
            horizontalConstraint={constraint}
            components={{
              WrapperComponent: fullWidth ? CustomWrapper : null,
              BodyComponent: customBodyWrapper ? CustomBody : null,
            }}
          >
            <CustomButtonWrapper>
              <PrimaryButton
                onClick={() => {}}
                label="Submit"
                isDisabled={boolean('button disabled', false)}
              />
            </CustomButtonWrapper>
          </Tooltip>
        </div>
      </Section>
    );
  });
