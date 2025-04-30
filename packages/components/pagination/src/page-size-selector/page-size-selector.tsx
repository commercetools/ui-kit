import { useState, useCallback } from 'react';
import uniqueId from 'lodash/uniqueId';
import SelectInput from '@commercetools-uikit/select-input';
import Spacings from '@commercetools-uikit/spacings';
import Constraints from '@commercetools-uikit/constraints';
import { warning } from '@commercetools-uikit/utils';
import Label from '@commercetools-uikit/label';
import messages from './messages';

export type TPageRangeSize = 'xs' | 's' | 'm' | 'l';

export type TPageSizeSelectorProps = {
  /**
   * Number of items per page, according to the pre-defined range values.
   */
  perPage?: number;

  /**
   * Range of items per page.
   * <br/>
   * `XS: 5,10,15,20`
   * <br/>
   * `SMALL: 20,50`
   * <br/>
   * `MEDIUM: 20,50,100`
   * <br/>
   * `LARGE: 200,500`
   */
  perPageRange?: TPageRangeSize;

  /**
   * A callback function, called when `perPage` is changed.
   */
  onPerPageChange: (value: number) => void;

  /**
   * Number of items in the current page
   */
  pageItems: number;
};

const mapRangeToListOfOptions = (perPageRange: TPageRangeSize) => {
  switch (perPageRange) {
    case 'xs':
      return [5, 10, 15, 20];
    case 's':
      return [20, 50];
    case 'm':
      return [20, 50, 100];
    case 'l':
      return [200, 500];
    default:
      throw new Error(
        `Invalid page range "${perPageRange}", expected one of "xs,s,m,l".`
      );
  }
};

const PageSizeSelector = ({
  perPage = 20,
  perPageRange = 's',
  ...props
}: TPageSizeSelectorProps) => {
  const [perPageSelectorId] = useState(uniqueId('per-page-selector-'));
  const options = mapRangeToListOfOptions(perPageRange);
  const hasValidPerPageOption = options.includes(perPage);

  warning(
    hasValidPerPageOption,
    `@commercetools-uikit/pagination: invalid page size ${perPage}. It must be one of the values of the selected range in "${options.toString()}".`
  );

  const { onPerPageChange } = props;
  const handleSelectPerPage = useCallback(
    (event) => {
      onPerPageChange(Number(event.target.value));
    },
    [onPerPageChange]
  );

  return (
    <Spacings.Inline alignItems="center">
      <Constraints.Horizontal max="auto">
        <SelectInput
          id={perPageSelectorId}
          isSearchable={false}
          name="per-page-selector"
          value={perPage.toString()}
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

export default PageSizeSelector;
