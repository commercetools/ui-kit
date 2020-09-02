import React from 'react';
import PropTypes from 'prop-types';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import AsyncSelectInput from '@commercetools-uikit/async-select-input';

export const FullDetailedSearchSelectInputOption = (props) => {
  const { data } = props;
  return (
    <AsyncSelectInput.Option {...props}>
      <Spacings.Stack scale="xs">
        <Text.Detail isBold={true}>{data.label || '----'}</Text.Detail>
        <Text.Detail>value: {data.value}</Text.Detail>
        <Text.Detail>Key: {data.key}</Text.Detail>
      </Spacings.Stack>
    </AsyncSelectInput.Option>
  );
};

FullDetailedSearchSelectInputOption.displayName =
  'FullDetailedSearchSelectInputOption';
FullDetailedSearchSelectInputOption.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }),
};

export const BriefDetailedSearchSelectInputOption = (props) => {
  const { data } = props;
  return (
    <AsyncSelectInput.Option {...props}>
      <Spacings.Stack scale="xs">
        <Text.Detail isBold={true}>{data.label || '----'}</Text.Detail>
        <Text.Detail>Key: {data.key}</Text.Detail>
      </Spacings.Stack>
    </AsyncSelectInput.Option>
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
