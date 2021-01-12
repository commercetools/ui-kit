import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import uniqueId from 'lodash/uniqueId';
import SelectInput from '@commercetools-uikit/select-input';
import Spacings from '@commercetools-uikit/spacings';
import Constraints from '@commercetools-uikit/constraints';
import Label from '@commercetools-uikit/label';
import messages from './messages';

function PageSizeSelector(props) {
  const intl = useIntl();

  const [pageSizeSelectorId] = React.useState(uniqueId('page-size-selector-'));

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
          options={props.options.map((option) => ({
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
            count: intl.formatNumber(props.currentPageItems),
          },
        }}
      />
    </Spacings.Inline>
  );
}

PageSizeSelector.displayName = 'PageSizeSelector';
PageSizeSelector.propTypes = {
  options: PropTypes.arrayOf(PropTypes.number).isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  currentPageItems: PropTypes.number.isRequired,
};

export default PageSizeSelector;
