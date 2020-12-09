import PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';
import SelectInput from '@commercetools-uikit/select-input';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import Constraints from '@commercetools-uikit/constraints';
import Label from '@commercetools-uikit/label';
import { createSequentialId } from '@commercetools-uikit/utils';
import messages from './messages';

const sequentialId = createSequentialId('page-size-selector-');

function PageSizeSelector(props) {
  const intl = useIntl();

  const handleSelectPerPage = (event) => {
    props.onPageSizeChange(Number(event.target.value));
  };

  const pageSizeSelectorId = sequentialId();

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
