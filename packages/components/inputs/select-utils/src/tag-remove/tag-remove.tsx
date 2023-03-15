import omit from 'lodash/omit';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import { CloseBoldIcon } from '@commercetools-uikit/icons';
import type { MultiValueGenericProps } from 'react-select';

// see https://github.com/JedWatson/react-select/blob/44e9fb29b230e49a754a2f0d6f30c2250aa45009/src/components/MultiValue.js
const removeProps = ['onClick', 'onTouchEnd', 'onMouseDown'];

export type TSelectProps = {
  isReadOnly: boolean;
} & MultiValueGenericProps['selectProps'];

export type TTagRemoveProps = {
  selectProps: TSelectProps;
} & MultiValueGenericProps;

const TagRemove = (props: TTagRemoveProps) => {
  const isDisabled = Boolean(
    props.selectProps.isDisabled || props.selectProps.isReadOnly
  );
  // when the select input is disabled,
  // we don't want to spread the removeProp event handlers
  const innerProps = isDisabled
    ? omit(props.innerProps, removeProps)
    : props.innerProps;

  return (
    <AccessibleButton label="Remove" {...innerProps}>
      <CloseBoldIcon color={isDisabled ? 'neutral60' : 'solid'} size="medium" />
    </AccessibleButton>
  );
};

TagRemove.displayName = 'TagRemove';

export default TagRemove;
