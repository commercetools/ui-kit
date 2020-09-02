import React from 'react';
import PropTypes from 'prop-types';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { components } from 'react-select';
import { NO_VALUE_FALLBACK, SELECT_DROPDOWN_OPTION_TYPES } from './constants';

export const FullDetailedSearchSelectInputOption = (props) => {
  const { data } = props;
  return (
    <components.Option {...props}>
      <Spacings.Stack scale="xs">
        <Text.Detail isBold={true}>
          {data.label || NO_VALUE_FALLBACK}
        </Text.Detail>
        <Text.Detail>
          {(data.id && ` ID: ${data.id}`) || NO_VALUE_FALLBACK}
        </Text.Detail>
        <Text.Detail>
          {(data.key && ` Key: ${data.key}`) || NO_VALUE_FALLBACK}
        </Text.Detail>
      </Spacings.Stack>
    </components.Option>
  );
};

FullDetailedSearchSelectInputOption.displayName =
  'FullDetailedSearchSelectInputOption';
FullDetailedSearchSelectInputOption.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }),
};

export const BriefDetailedSearchSelectInputOption = (props) => {
  const { data } = props;
  return (
    <components.Option {...props}>
      <Spacings.Stack scale="xs">
        <Text.Detail isBold={true}>
          {data.label || NO_VALUE_FALLBACK}
        </Text.Detail>
        <Text.Detail>
          {(data.key && ` Key: ${data.key}`) || NO_VALUE_FALLBACK}
        </Text.Detail>
      </Spacings.Stack>
    </components.Option>
  );
};

BriefDetailedSearchSelectInputOption.displayName =
  'BriefDetailedSearchSelectInputOption';
BriefDetailedSearchSelectInputOption.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
  }),
};

export const SearchSelectInputOption = (props) => {
  switch (props.optionType) {
    case SELECT_DROPDOWN_OPTION_TYPES.EXTENDED_DETAILED_OPTION:
      return (
        <FullDetailedSearchSelectInputOption {...props.optionInnerProps} />
      );
    case SELECT_DROPDOWN_OPTION_TYPES.BRIEF_DETAILED_OPTION:
      return (
        <BriefDetailedSearchSelectInputOption {...props.optionInnerProps} />
      );
    default:
      return (
        <components.Option {...props.optionInnerProps}>
          <Text.Detail>
            {props.optionInnerProps.data.label || NO_VALUE_FALLBACK}
          </Text.Detail>
        </components.Option>
      );
  }
};

SearchSelectInputOption.displayName = 'SearchSelectInputOption';
SearchSelectInputOption.propTypes = {
  optionType: PropTypes.oneOf(Object.values(SELECT_DROPDOWN_OPTION_TYPES)),
  optionInnerProps: PropTypes.shape({
    data: PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
