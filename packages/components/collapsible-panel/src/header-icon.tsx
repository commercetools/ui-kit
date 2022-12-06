import { css } from '@emotion/react';
import { designTokens, useTheme } from '@commercetools-uikit/design-system';
import { AngleDownIcon, AngleRightIcon } from '@commercetools-uikit/icons';

const sizeIconContainer = '22px';
const sizeIconContainerSmall = '14px';

const getArrowColor = (
  { tone, isDisabled }: Pick<THeaderIcon, 'isDisabled' | 'tone'>,
  theme: 'default' | 'test'
) => {
  if (isDisabled) return 'neutral60';
  if (tone === 'urgent') {
    if (theme === 'default') {
      return 'surface';
    } else {
      return 'warning';
    }
  }

  return 'solid';
};

const checkIfTestOrDefault = (
  theme?: 'default' | 'test',
  cssValue?: string
) => {
  if (theme === 'test') return null;
  return cssValue;
};

type THeaderIcon = {
  tone?: 'urgent' | 'primary';
  isClosed: boolean;
  isDisabled: boolean;
  size: 'small' | 'medium' | 'big' | 'scale';
};

const HeaderIcon = (props: THeaderIcon) => {
  const { theme } = useTheme();
  const backgroundColor =
    props.tone === 'urgent' && theme === 'default'
      ? designTokens.colorWarning
      : designTokens.colorSurface;
  return (
    <div
      css={[
        css`
          display: flex;
          align-items: center;
          justify-content: center;
          height: ${props.size === 'small'
            ? sizeIconContainerSmall
            : sizeIconContainer};
          width: ${props.size === 'small'
            ? sizeIconContainerSmall
            : sizeIconContainer};

          border-radius: ${checkIfTestOrDefault(theme, '50%')};
          flex-shrink: ${checkIfTestOrDefault(theme, '0')};
          box-shadow: ${checkIfTestOrDefault(theme, designTokens.shadow7)};
          background-color: ${checkIfTestOrDefault(theme, backgroundColor)};
          border: ${checkIfTestOrDefault(theme, backgroundColor)};
        `,
        props.isDisabled &&
          css`
            box-shadow: none;
            border: 1px solid ${designTokens.colorNeutral};
            background-color: ${designTokens.colorAccent98};
          `,
      ]}
    >
      {props.isClosed ? (
        <AngleRightIcon
          color={getArrowColor(
            {
              tone: props.tone,
              isDisabled: props.isDisabled,
            },
            theme
          )}
          size={props.size}
        />
      ) : (
        <AngleDownIcon
          color={getArrowColor(
            {
              tone: props.tone,
              isDisabled: props.isDisabled,
            },
            theme
          )}
          size={props.size}
        />
      )}
    </div>
  );
};

HeaderIcon.displayName = 'HeaderIcon';
HeaderIcon.defaultProps = {
  tone: 'primary',
};

export default HeaderIcon;
