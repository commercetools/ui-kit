import { useState, useCallback } from 'react';
import uniqueId from 'lodash/uniqueId';
import SelectInput from '@commercetools-uikit/select-input';
import Spacings from '@commercetools-uikit/spacings';
import Constraints from '@commercetools-uikit/constraints';
import { warning } from '@commercetools-uikit/utils';
import Label from '@commercetools-uikit/label';
import messages from './messages';

export type TPageRangeSize = 's' | 'm' | 'l';

export type TPageSizeSelectorProps = {
  /**
   * Number of items per page, according to the pre-defined range values.
   */
  perPage: number;

  /**
   * Range of items per page.
   * <br/>
   * `SMALL: 20,50`
   * <br/>
   * `MEDIUM: 20,50,100`
   * <br/>
   * `LARGE: 200,500`
   */
  perPageRange: TPageRangeSize;

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

const PageSizeSelector = (props: TPageSizeSelectorProps) => {
  const [perPageSelectorId] = useState(uniqueId('per-page-selector-'));
  const options = mapRangeToListOfOptions(props.perPageRange);
  const hasValidPerPageOption = options.includes(props.perPage);

  warning(
    hasValidPerPageOption,
    `@commercetools-uikit/pagination: invalid page size ${
      props.perPage
    }. It must be one of the values of the selected range in "${options.toString()}".`
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

const defaultProps: Pick<TPageSizeSelectorProps, 'perPage' | 'perPageRange'> = {
  perPage: 20,
  perPageRange: 's',
};

PageSizeSelector.defaultProps = defaultProps;

export default PageSizeSelector;
