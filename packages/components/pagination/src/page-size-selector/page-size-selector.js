import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import SelectInput from '@commercetools-uikit/select-input';
import Spacings from '@commercetools-uikit/spacings';
import Constraints from '@commercetools-uikit/constraints';
import { invariant } from '@commercetools-uikit/utils';
import Label from '@commercetools-uikit/label';
import messages from './messages';

const mapRangeToListOfOptions = (pageSizeRange) => {
  switch (pageSizeRange) {
    case 's':
      return [20, 50];
    case 'm':
      return [20, 50, 100];
    case 'l':
      return [200, 500];
    default:
      throw new Error(
        `Invalid page size range "${pageSizeRange}", expected one of "s,m,l".`
      );
  }
};

const PageSizeSelector = (props) => {
  const [pageSizeSelectorId] = React.useState(uniqueId('page-size-selector-'));

  const options = mapRangeToListOfOptions(props.pageSizeRange);
  const hasValidPageSizeOptions = options.includes(props.pageSize);

  invariant(
    hasValidPageSizeOptions,
    `@commercetools-uikit/pagination: invalid page size ${
      props.pageSize
    }. It must be one of the values of the selected range in "${options.toString()}".`
  );

  const { onPageSizeChange } = props;
  const handleSelectPerPage = React.useCallback(
    (event) => {
      onPageSizeChange(Number(event.target.value));
    },
    [onPageSizeChange]
  );

  return (
    <Spacings.Inline alignItems="center">
      <Constraints.Horizontal max={2}>
        <SelectInput
          id={pageSizeSelectorId}
          name="page-size-selector"
          value={props.pageSize.toString()}
          options={options.map((option) => ({
            value: option.toString(),
            label: option.toString(),
          }))}
          onChange={handleSelectPerPage}
        />
      </Constraints.Horizontal>
      <Label
        htmlFor={pageSizeSelectorId}
        intlMessage={{
          ...messages.pageSize,
          values: {
            count: props.currentPageItems,
          },
        }}
      />
    </Spacings.Inline>
  );
};

PageSizeSelector.displayName = 'PageSizeSelector';
PageSizeSelector.propTypes = {
  pageSize: PropTypes.number,
  pageSizeRange: PropTypes.oneOf(['s', 'm', 'l']),
  onPageSizeChange: PropTypes.func.isRequired,
  currentPageItems: PropTypes.number.isRequired,
};
PageSizeSelector.defaultProps = {
  pageSize: 20,
  pageSizeRange: 's',
};

export default PageSizeSelector;
