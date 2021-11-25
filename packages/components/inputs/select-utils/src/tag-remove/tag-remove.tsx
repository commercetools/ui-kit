import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import { CloseBoldIcon } from '@commercetools-uikit/icons';

// see https://github.com/JedWatson/react-select/blob/44e9fb29b230e49a754a2f0d6f30c2250aa45009/src/components/MultiValue.js
const removeProps = ['onClick', 'onTouchEnd', 'onMouseDown'];

type TSelectProps = {
  isDisabled: boolean;
  isReadOnly: boolean;
};

type TInnerProps = {};

type TTagRemoveProps = {
  selectProps: TSelectProps;
  innerProps: TInnerProps;
};
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

TagRemove.propTypes = {
  selectProps: PropTypes.shape({
    isDisabled: PropTypes.bool.isRequired,
    isReadOnly: PropTypes.bool,
  }).isRequired,
  innerProps: PropTypes.object,
};

export default TagRemove;
