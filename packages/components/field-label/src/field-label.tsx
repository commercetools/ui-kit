import {
  cloneElement,
  MouseEvent,
  KeyboardEvent,
  ReactElement,
  ReactNode,
} from 'react';
import { warning } from '@commercetools-uikit/utils';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import IconButton from '@commercetools-uikit/icon-button';
import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';
import { InformationIcon, InfoIcon } from '@commercetools-uikit/icons';
import Text from '@commercetools-uikit/text';
import Constraints from '@commercetools-uikit/constraints';
import Inline from '@commercetools-uikit/spacings-inline';
import Label from '@commercetools-uikit/label';
import { designTokens, useTheme } from '@commercetools-uikit/design-system';

export type TFieldLabelProps = {
  /**
   * Title of the label
   */
  title: string | ReactNode;
  /**
   * Hint for the label. Provides a supplementary but important information regarding the behaviour of the input (e.g warn about uniqueness of a field, when it can only be set once), whereas description can describe it in more depth. Can also receive a hintIcon.
   */
  hint?: string | ReactNode;
  /**
   * Provides a description for the title.
   */
  description?: string | ReactNode;
  /**
   * Function called when info button is pressed. Info button will only be visible when this prop is passed.
   */
  onInfoButtonClick?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  /**
   * Indicates the tone to be applied to the label
   */
  tone?: 'primary' | 'inverted';
  /**
   * Icon to be displayed beside the hint text. Will only get rendered when hint is passed as well.
   */
  hintIcon?: ReactElement;
  /**
   * Badge to be displayed beside the label. Might be used to display additional information about the content of the field (E.g verified email)
   */
  badge?: ReactNode;
  /**
   * Indicates if the labeled field is required in a form
   */
  hasRequiredIndicator?: boolean;
  /**
   * The for HTML attribute, used to reference form elements with the related attribute id or aria-labelledby.
   */
  htmlFor?: string;
  /**
   * The id HTML attribute, used to reference non-form elements with the related attribute aria-labelledby.
   */
  id?: string;
  /**
   * Horizontal size limit of the label.
   */
  horizontalConstraint?:
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 'scale'
    | 'auto';
};

/*
  This is needed to deal with every FieldLabel row vertical spacing
  when provided `hint` or `description` is a React component which
  might render nothing.
  Previously we were using the `Stack` component but, as we are wrapping
  those props values with some elements, `Stack` was including some vertical
  spacing even when the received values did not render anything.

  The implementation is tightly coupled to how we currently wrap
  those props, so if we change that, we will need to adjust this as well.
*/
const LabelRowWrapper = styled.div`
  & [data-key='field-label-hint-wrapper'],
  & [data-key='field-label-description-wrapper'] {
    margin-top: ${designTokens.spacing10} !important;
  }
  & [data-key='field-label-hint-wrapper']:empty,
  & [data-key='field-label-description-wrapper']:empty {
    margin-top: 0 !important;
  }
`;

const FieldLabel = (props: TFieldLabelProps) => {
  const { themedValue } = useTheme();

  if (props.hintIcon) {
    warning(
      props.hintIcon.props.size === undefined,
      'ui-kit/FieldLabel: setting `hintIcon` size is not supported.'
    );

    warning(
      Boolean(props.hint),
      'ui-kit/FieldLabel: `hint` is required when `hintIcon` is provided'
    );
  }

  return (
    <Constraints.Horizontal max={props.horizontalConstraint}>
      <Inline alignItems={'center'} scale="xs">
        <Text.Wrap>
          <Label
            isRequiredIndicatorVisible={props.hasRequiredIndicator}
            tone={props.tone}
            id={props.id}
            htmlFor={props.htmlFor}
          >
            {props.title}
          </Label>
        </Text.Wrap>
        {props.onInfoButtonClick &&
          themedValue(
            <IconButton
              label="More Info"
              icon={<InformationIcon />}
              size="small"
              onClick={props.onInfoButtonClick}
            />,
            <SecondaryIconButton
              label="More Info"
              icon={<InfoIcon />}
              size="medium"
              color="info"
              onClick={props.onInfoButtonClick}
            />
          )}
      </Inline>

      {props.hint && (
        <LabelRowWrapper>
          <Inline alignItems={'center'} scale="xs">
            {props.hintIcon && (
              <Inline data-key="field-label-hint-wrapper">
                {cloneElement(props.hintIcon, {
                  // FIXME: add proper tone when tones are refactored
                  size: 'medium',
                  color: props.hintIcon.props.color || 'warning',
                })}
              </Inline>
            )}
            {props.hint && (
              <Text.Detail tone="secondary" data-key="field-label-hint-wrapper">
                {props.hint}
              </Text.Detail>
            )}
          </Inline>
        </LabelRowWrapper>
      )}
      {props.description && (
        <LabelRowWrapper>
          <Text.Wrap>
            <Text.Detail
              tone="secondary"
              data-key="field-label-description-wrapper"
            >
              {props.description}
            </Text.Detail>
          </Text.Wrap>
        </LabelRowWrapper>
      )}

      {props.badge && (
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
          `}
        >
          {props.badge}
        </div>
      )}
    </Constraints.Horizontal>
  );
};

FieldLabel.displayName = 'FieldLabel';
FieldLabel.defaultProps = {
  horizontalConstraint: 'scale',
};

export default FieldLabel;
