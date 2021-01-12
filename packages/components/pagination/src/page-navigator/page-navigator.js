import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import {
  AngleThinLeftIcon,
  AngleThinRightIcon,
} from '@commercetools-uikit/icons';
import NumberInput from '@commercetools-uikit/number-input';
import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import Label from '@commercetools-uikit/label';
import { createSequentialId } from '@commercetools-uikit/utils';
import { isValid, normalizePageValue } from './utils';
import messages from './messages';

const sequentialId = createSequentialId('page-number-');

function PageNavigator(props) {
  const intl = useIntl();
  const [page, setPage] = React.useState(props.currentPage);

  const { onPageChange, totalPages } = props;
  const normalizedValue = Number(normalizePageValue(page, totalPages));

  const handleSubmit = React.useCallback(
    (event) => {
      event.preventDefault();

      setPage(normalizedValue);

      onPageChange(normalizedValue);
    },
    [normalizedValue, onPageChange]
  );

  const onBlurNormalize = () => setPage(normalizedValue);

  const isDisabled = totalPages === 0;

  const onPrevPage = React.useCallback(() => {
    const prevPage = page - 1;
    if (prevPage < 1) return null;

    setPage(prevPage);
    onPageChange(prevPage);
  }, [page, onPageChange]);

  const onNextPage = React.useCallback(() => {
    const nextPage = page + 1;
    if (nextPage > totalPages) return null;

    setPage(nextPage);
    onPageChange(nextPage);
  }, [page, onPageChange, totalPages]);

  const isPreviousDisabled = page <= 1;
  const isNextDisabled = page >= totalPages;

  const pageNumberInputId = sequentialId();

  return (
    <form onSubmit={handleSubmit}>
      <Spacings.Inline alignItems="center" scale="s">
        <SecondaryIconButton
          label={intl.formatMessage(messages.previousPageLabel)}
          onClick={onPrevPage}
          isDisabled={isPreviousDisabled || isDisabled}
          icon={<AngleThinLeftIcon />}
        />
        <Label htmlFor={pageNumberInputId} intlMessage={messages.page} />
        <div>
          <NumberInput
            id={pageNumberInputId}
            value={page}
            onBlur={onBlurNormalize}
            onFocus={(event) => event.target.select()}
            onChange={(event) => setPage(event.target.value)}
            isDisabled={isDisabled}
            hasWarning={!isValid(page, props.totalPages)}
            horizontalConstraint={2}
          />
        </div>
        <Text.Body
          intlMessage={{
            ...messages.pageCount,
            values: {
              count: intl.formatNumber(props.totalPages),
            },
          }}
        />
        <SecondaryIconButton
          label={intl.formatMessage(messages.nextPageLabel)}
          onClick={onNextPage}
          isDisabled={isNextDisabled || isDisabled}
          icon={<AngleThinRightIcon />}
        />
      </Spacings.Inline>
    </form>
  );
}

PageNavigator.displayName = 'PageNavigator';
PageNavigator.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default PageNavigator;
