import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import { AngleDownIcon, AngleRightIcon } from '@commercetools-uikit/icons';

const getArrowColor = ({
  tone,
  isDisabled,
}: Pick<THeaderIcon, 'isDisabled' | 'tone'>) => {
  if (isDisabled) return 'neutral60';
  if (tone === 'urgent') return 'warning';

  return 'solid';
};

type THeaderIcon = {
  tone?: 'urgent' | 'primary';
  isClosed: boolean;
  isDisabled: boolean;
  size: 'small' | 'medium' | 'big' | 'scale';
};

const HeaderIcon = (props: THeaderIcon) => {
  return (
    <div
      css={[
        css`
          display: flex;
          align-items: center;
          justify-content: center;
        `,
        props.isDisabled &&
          css`
            box-shadow: none;
            border: none;
            background-color: ${designTokens.colorSurface};
          `,
      ]}
    >
      {props.isClosed ? (
        <AngleRightIcon
          color={getArrowColor({
            tone: props.tone,
            isDisabled: props.isDisabled,
          })}
          size={props.size}
        />
      ) : (
        <AngleDownIcon
          color={getArrowColor({
            tone: props.tone,
            isDisabled: props.isDisabled,
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
