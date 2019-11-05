import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { useIntl } from 'react-intl';
import vars from '../../../../materials/custom-properties';
import Text from '../../typography/text';
import Spacings from '../../spacings';
import { AngleLeftIcon, AngleRightIcon, CircleIcon } from '../../icons';
import Tooltip from '../../tooltip';
import SecondaryIconButton from '../../buttons/secondary-icon-button';
import messages from './messages';

const WrapperComponent = styled.div`
  display: flex;
`;

const CalendarHeader = props => {
  const intl = useIntl();
  // https://codepen.io/mudassir0909/pen/eIHqB

  // we prevent all our defined onClicks inside of the CalendarHeader
  // from blurring our input.
  const onMouseDown = React.useCallback(event => {
    event.preventDefault();
  }, []);
  return (
    <div
      onMouseDown={onMouseDown}
      css={css`
        display: flex;
        padding: 10px 2% 6px;
        margin-bottom: ${vars.spacingXs};
        justify-content: space-between;
        border-bottom: 1px solid ${vars.colorNeutral90};
      `}
    >
      <Spacings.Inline scale="xs" alignItems="center">
        <Tooltip
          title={intl.formatMessage(messages.previousMonthTooltip)}
          components={{ WrapperComponent }}
        >
          <SecondaryIconButton
            label="show prev month"
            onClick={props.onPrevMonthClick}
            icon={<AngleLeftIcon size="medium" />}
          />
        </Tooltip>
        <Tooltip
          title={intl.formatMessage(messages.todayTooltip)}
          components={{ WrapperComponent }}
        >
          <SecondaryIconButton
            label="show today"
            onClick={props.onTodayClick}
            icon={<CircleIcon size="medium" />}
          />
        </Tooltip>
        <Tooltip
          title={intl.formatMessage(messages.nextMonthTooltip)}
          components={{ WrapperComponent }}
        >
          <SecondaryIconButton
            label="show next month"
            onClick={props.onNextMonthClick}
            icon={<AngleRightIcon size="medium" />}
          />
        </Tooltip>
        <Text.Body as="span" isBold={true}>
          {props.monthLabel}
        </Text.Body>
      </Spacings.Inline>
      <Spacings.Inline scale="xs" alignItems="center">
        <Tooltip
          title={intl.formatMessage(messages.previousYearTooltip)}
          components={{ WrapperComponent }}
        >
          <SecondaryIconButton
            label="show prev year"
            onClick={props.onPrevYearClick}
            icon={<AngleLeftIcon size="medium" />}
          />
        </Tooltip>
        <Text.Body isBold={true}>{props.yearLabel}</Text.Body>
        <Tooltip
          title={intl.formatMessage(messages.nextYearTooltip)}
          components={{ WrapperComponent }}
        >
          <SecondaryIconButton
            label="show next year"
            onClick={props.onNextYearClick}
            icon={<AngleRightIcon size="medium" />}
          />
        </Tooltip>
      </Spacings.Inline>
    </div>
  );
};

CalendarHeader.displayName = 'CalendarHeader';

CalendarHeader.propTypes = {
  monthLabel: PropTypes.string.isRequired,
  yearLabel: PropTypes.string.isRequired,
  onPrevMonthClick: PropTypes.func.isRequired,
  onTodayClick: PropTypes.func.isRequired,
  onNextMonthClick: PropTypes.func.isRequired,
  onPrevYearClick: PropTypes.func.isRequired,
  onNextYearClick: PropTypes.func.isRequired,
};

export default CalendarHeader;
