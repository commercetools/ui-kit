// TODO: @redesign cleanup
import { useState, useCallback } from 'react';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import uniqueId from 'lodash/uniqueId';
import { AngleLeftIcon, AngleRightIcon } from '@commercetools-uikit/icons';
import NumberInput from '@commercetools-uikit/number-input';
import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';
import Spacings from '@commercetools-uikit/spacings';
import Label from '@commercetools-uikit/label';
import { isValid, normalizePageValue } from './utils';
import messages from './messages';

type TPageNavigatorProps = {
  /**
   * Total number of pages available
   */
  totalPages: number;
  /**
   * The current page
   */
  page: number;
  /**
   * A callback function, called when the page is changed.
   */
  onPageChange: (newPerPage: number) => void;
};

const PageNavigator = (props: TPageNavigatorProps) => {
  const intl = useIntl();

  const [pageNumberInputId] = useState(uniqueId('page-number-'));

  const paginationForm = useFormik({
    initialValues: { page: props.page },
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: (values /**, helpers */) => {
      const nextNormalizedValue = Number(
        normalizePageValue(values.page, props.totalPages)
      );
      props.onPageChange(nextNormalizedValue);
    },
    validate: (values) => {
      if (!isValid(values.page, props.totalPages)) {
        return { page: true };
      }
      return {};
    },
  });

  const { page, totalPages } = props;
  const isDisabled = totalPages === 0;
  const isPreviousDisabled = page <= 1;
  const isNextDisabled = page >= totalPages;

  const handlePrevPageChange = useCallback(() => {
    const previousPage = paginationForm.values.page - 1;
    if (previousPage >= 1) {
      paginationForm.setFieldValue('page', previousPage, true);
      paginationForm.submitForm();
    }
  }, [paginationForm]);

  const handleNextPageChange = useCallback(() => {
    const nextPage = paginationForm.values.page + 1;
    if (nextPage <= totalPages) {
      paginationForm.setFieldValue('page', nextPage, true);
      paginationForm.submitForm();
    }
  }, [paginationForm, totalPages]);

  return (
    <form onSubmit={paginationForm.handleSubmit}>
      <Spacings.Inline alignItems="center" scale="s">
        <SecondaryIconButton
          label={intl.formatMessage(messages.previousPageLabel)}
          onClick={handlePrevPageChange}
          isDisabled={isPreviousDisabled || isDisabled}
          icon={<AngleLeftIcon />}
        />
        <Label htmlFor={pageNumberInputId} intlMessage={messages.page} />
        <div>
          <NumberInput
            name="page"
            id={pageNumberInputId}
            value={paginationForm.values.page}
            min={1}
            max={totalPages}
            onBlur={paginationForm.handleBlur}
            onChange={paginationForm.handleChange}
            isDisabled={isDisabled}
            hasWarning={Boolean(paginationForm.errors.page)}
            horizontalConstraint={2}
          />
        </div>
        <Label
          intlMessage={{
            ...messages.pageCount,
            values: {
              count: props.totalPages,
            },
          }}
        />
        <SecondaryIconButton
          label={intl.formatMessage(messages.nextPageLabel)}
          onClick={handleNextPageChange}
          isDisabled={isNextDisabled || isDisabled}
          icon={<AngleRightIcon />}
        />
      </Spacings.Inline>
    </form>
  );
};

PageNavigator.displayName = 'PageNavigator';

export default PageNavigator;
