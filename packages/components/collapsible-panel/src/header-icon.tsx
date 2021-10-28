import { css } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import { AngleDownIcon, AngleRightIcon } from '@commercetools-uikit/icons';

const sizeIconContainer = '22px';
const sizeIconContainerSmall = '14px';

const getArrowColor = ({
  tone,
  isDisabled,
}: Pick<THeaderIcon, 'isDisabled' | 'tone'>) => {
  if (isDisabled) return 'neutral60';
  if (tone === 'urgent') return 'surface';
  return 'solid';
};

type THeaderIcon = {
  tone?: 'urgent' | 'primary';
  isClosed: boolean;
  isDisabled: boolean;
  size: 'small' | 'medium' | 'big' | 'scale';
};

const HeaderIcon = (props: THeaderIcon) => {
  const backgroundColor =
    props.tone === 'urgent' ? vars.colorWarning : vars.colorSurface;
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
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: ${vars.shadow7};
          background-color: ${backgroundColor};
          border: 1px solid ${backgroundColor};
        `,
        props.isDisabled &&
          css`
            box-shadow: none;
            border: 1px solid ${vars.colorNeutral};
            background-color: ${vars.colorAccent98};
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
