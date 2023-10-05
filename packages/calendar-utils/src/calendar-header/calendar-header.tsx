import { useCallback } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useIntl } from 'react-intl';
import { designTokens } from '@commercetools-uikit/design-system';
import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';
import {
  AngleLeftIcon,
  AngleRightIcon,
  CircleIcon,
} from '@commercetools-uikit/icons';
import Text from '@commercetools-uikit/text';
import Inline from '@commercetools-uikit/spacings-inline';
import Tooltip from '@commercetools-uikit/tooltip';
import messages from './messages';

const WrapperComponent = styled.div`
  display: flex;
`;

type TCalendarHeader = {
  monthLabel: string;
  yearLabel: string;
  onPrevMonthClick: () => void;
  onTodayClick: () => void;
  onNextMonthClick: () => void;
  onPrevYearClick: () => void;
  onNextYearClick: () => void;
};

const CalendarHeader = (props: TCalendarHeader) => {
  const intl = useIntl();
  // https://codepen.io/mudassir0909/pen/eIHqB

  // we prevent all our defined onClicks inside of the CalendarHeader
  // from blurring our input.
  const onMouseDown = useCallback((event) => {
    event.preventDefault();
  }, []);
  return (
    <div
      onMouseDown={onMouseDown}
      css={css`
        display: flex;
        padding: 10px 2% 6px;
        margin-bottom: ${designTokens.spacing10};
        justify-content: space-between;
        border-bottom: 1px solid ${designTokens.colorNeutral90};
      `}
    >
      <Inline scale="xs" alignItems="center">
        <Tooltip
          title={intl.formatMessage(messages.previousMonthTooltip)}
          components={{ WrapperComponent }}
        >
          <SecondaryIconButton
            label="show prev month"
            onClick={props.onPrevMonthClick}
            icon={<AngleLeftIcon />}
            size="medium"
          />
        </Tooltip>
        <Tooltip
          title={intl.formatMessage(messages.todayTooltip)}
          components={{ WrapperComponent }}
        >
          <SecondaryIconButton
            label="show today"
            onClick={props.onTodayClick}
            icon={<CircleIcon />}
            size="medium"
          />
        </Tooltip>
        <Tooltip
          title={intl.formatMessage(messages.nextMonthTooltip)}
          components={{ WrapperComponent }}
        >
          <SecondaryIconButton
            label="show next month"
            onClick={props.onNextMonthClick}
            icon={<AngleRightIcon />}
            size="medium"
          />
        </Tooltip>
        <Text.Body as="span" isBold={true} fontWeight="bold">
          {props.monthLabel}
        </Text.Body>
      </Inline>
      <Inline scale="xs" alignItems="center">
        <Tooltip
          title={intl.formatMessage(messages.previousYearTooltip)}
          components={{ WrapperComponent }}
        >
          <SecondaryIconButton
            label="show prev year"
            onClick={props.onPrevYearClick}
            icon={<AngleLeftIcon />}
            size="medium"
          />
        </Tooltip>
        <Text.Body isBold={true} fontWeight="bold">
          {props.yearLabel}
        </Text.Body>
        <Tooltip
          title={intl.formatMessage(messages.nextYearTooltip)}
          components={{ WrapperComponent }}
        >
          <SecondaryIconButton
            label="show next year"
            onClick={props.onNextYearClick}
            icon={<AngleRightIcon />}
            size="medium"
          />
        </Tooltip>
      </Inline>
    </div>
  );
};

CalendarHeader.displayName = 'CalendarHeader';

export default CalendarHeader;
