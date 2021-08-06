import PropTypes from 'prop-types';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { components } from 'react-select';
import { NO_VALUE_FALLBACK, SELECT_DROPDOWN_OPTION_TYPES } from './constants';

export const MultiplePropertiesSelectInputOption = (props) => {
  const { data } = props;
  const noValueFallback = props.noValueFallback || NO_VALUE_FALLBACK;

  return (
    <components.Option {...props}>
      <Spacings.Stack scale="xs">
        <Text.Detail isBold={true}>{data.label || noValueFallback}</Text.Detail>
        <Text.Detail>Key: {data.key || noValueFallback}</Text.Detail>
        <Text.Detail>ID: {data.id || noValueFallback}</Text.Detail>
      </Spacings.Stack>
    </components.Option>
  );
};

MultiplePropertiesSelectInputOption.displayName =
  'MultiplePropertiesSelectInputOption';
MultiplePropertiesSelectInputOption.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string,
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  noValueFallback: PropTypes.string,
};

export const DoublePropertySelectInputOption = (props) => {
  const { data } = props;
  const noValueFallback = props.noValueFallback || NO_VALUE_FALLBACK;
  return (
    <components.Option {...props}>
      <Spacings.Stack scale="xs">
        <Text.Detail isBold={true}>{data.label || noValueFallback}</Text.Detail>
        <Text.Detail>Key: {data.key || noValueFallback}</Text.Detail>
      </Spacings.Stack>
    </components.Option>
  );
};

DoublePropertySelectInputOption.displayName = 'DoublePropertySelectInputOption';
DoublePropertySelectInputOption.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string,
    key: PropTypes.string,
  }),
  noValueFallback: PropTypes.string,
};

export const CustomSelectInputOption = (props) => {
  const noValueFallback = props.noValueFallback || NO_VALUE_FALLBACK;

  switch (props.optionType) {
    case SELECT_DROPDOWN_OPTION_TYPES.MULTIPLE_PROPERTIES:
      return (
        <MultiplePropertiesSelectInputOption
          {...props.optionInnerProps}
          noValueFallback={noValueFallback}
        />
      );
    case SELECT_DROPDOWN_OPTION_TYPES.DOUBLE_PROPERTY:
      return (
        <DoublePropertySelectInputOption
          {...props.optionInnerProps}
          noValueFallback={noValueFallback}
        />
      );
    default:
      return (
        <components.Option {...props.optionInnerProps}>
          <Text.Detail>
            {props.optionInnerProps.data.label || noValueFallback}
          </Text.Detail>
        </components.Option>
      );
  }
};

CustomSelectInputOption.displayName = 'CustomSelectInputOption';
CustomSelectInputOption.propTypes = {
  optionType: PropTypes.oneOf(Object.values(SELECT_DROPDOWN_OPTION_TYPES)),
  noValueFallback: PropTypes.string,
  optionInnerProps: PropTypes.shape({
    data: PropTypes.shape({
      label: PropTypes.string,
      key: PropTypes.string,
      id: PropTypes.string,
    }),
  }).isRequired,
};
