import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import SelectInput from '@commercetools-uikit/select-input';
import Spacings from '@commercetools-uikit/spacings';
import Constraints from '@commercetools-uikit/constraints';
import { warning } from '@commercetools-uikit/utils';
import Label from '@commercetools-uikit/label';
import messages from './messages';

const mapRangeToListOfOptions = (perPageRange) => {
  switch (perPageRange) {
    case 's':
      return [20, 50];
    case 'm':
      return [20, 50, 100];
    case 'l':
      return [200, 500];
    default:
      throw new Error(
        `Invalid page range "${perPageRange}", expected one of "s,m,l".`
      );
  }
};

const PageSizeSelector = (props) => {
  const [perPageSelectorId] = React.useState(uniqueId('per-page-selector-'));
  const options = mapRangeToListOfOptions(props.perPageRange);
  const hasValidPerPageOption = options.includes(props.perPage);

  warning(
    hasValidPerPageOption,
    `@commercetools-uikit/pagination: invalid page size ${
      props.perPage
    }. It must be one of the values of the selected range in "${options.toString()}".`
  );

  const { onPerPageChange } = props;
  const handleSelectPerPage = React.useCallback(
    (event) => {
      onPerPageChange(Number(event.target.value));
    },
    [onPerPageChange]
  );

  return (
    <Spacings.Inline alignItems="center">
      <Constraints.Horizontal max={2}>
        <SelectInput
          id={perPageSelectorId}
          name="per-page-selector"
          value={props.perPage.toString()}
          options={options.map((option) => ({
            value: option.toString(),
            label: option.toString(),
          }))}
          onChange={handleSelectPerPage}
        />
      </Constraints.Horizontal>
      <Label
        htmlFor={perPageSelectorId}
        intlMessage={{
          ...messages.pageSize,
          values: {
            count: props.pageItems,
          },
        }}
      />
    </Spacings.Inline>
  );
};

PageSizeSelector.displayName = 'PageSizeSelector';
PageSizeSelector.propTypes = {
  perPage: PropTypes.number,
  perPageRange: PropTypes.oneOf(['s', 'm', 'l']),
  onPerPageChange: PropTypes.func.isRequired,
  pageItems: PropTypes.number.isRequired,
};

PageSizeSelector.defaultProps = {
  perPage: 20,
  perPageRange: 's',
};

export default PageSizeSelector;
