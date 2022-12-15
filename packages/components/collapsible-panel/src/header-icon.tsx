// TODO: @redesign cleanup
import { css } from '@emotion/react';
import {
  designTokens,
  useTheme,
  type ThemeName,
} from '@commercetools-uikit/design-system';
import { AngleDownIcon, AngleRightIcon } from '@commercetools-uikit/icons';

const sizeIconContainer = '24px';
const sizeIconContainerSmall = '14px';

const getArrowColor = ({
  tone,
  isDisabled,
  theme,
}: Pick<THeaderIcon, 'isDisabled' | 'tone'> & { theme: ThemeName }) => {
  if (isDisabled) return 'neutral60';
  if (tone === 'urgent') return theme === 'default' ? 'surface' : 'warning';

  return 'solid';
};

type THeaderIcon = {
  tone?: 'urgent' | 'primary';
  isClosed: boolean;
  isDisabled: boolean;
  size: 'small' | 'medium' | 'big' | 'scale';
};

const HeaderIcon = (props: THeaderIcon) => {
  const { theme, isNewTheme } = useTheme();
  const backgroundColor =
    props.tone === 'urgent' && !isNewTheme
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
        `,
        !isNewTheme &&
          css`
            border-radius: 50%;
            flex-shrink: 0;
            box-shadow: ${designTokens.shadow7};
            background-color: ${backgroundColor};
            border: ${backgroundColor};
          `,
        props.isDisabled &&
          css`
            box-shadow: none;
            border: 1px solid
              ${designTokens.borderForCollapsiblePanelHeaderIconWhenDisabled};
            background-color: ${designTokens.backgroundColorForCollapsiblePanelHeaderIconWhenDisabled};
          `,
      ]}
    >
      {props.isClosed ? (
        <AngleRightIcon
          color={getArrowColor({
            tone: props.tone,
            isDisabled: props.isDisabled,
            theme,
          })}
          size={props.size}
        />
      ) : (
        <AngleDownIcon
          color={getArrowColor({
            tone: props.tone,
            isDisabled: props.isDisabled,
            theme,
          })}
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
