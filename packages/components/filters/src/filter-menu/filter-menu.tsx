import { ReactNode, useState } from 'react';
import { css } from '@emotion/react';
import Constraints from '@commercetools-uikit/constraints';
import { designTokens } from '@commercetools-uikit/design-system';
import * as Popover from '@radix-ui/react-popover';
import { Footer } from './footer';
import { Header } from './header';
import { TriggerButton } from './trigger-button';
import SelectInput from '@commercetools-uikit/select-input';

export type TAppliedFilterValue = {
  value: string;
  label: ReactNode;
};

export type TFilterMenuProps = {
  /**
   * unique identifier for the filter
   */
  filterKey: string;
  /**
   * formatted message to display the filter's name
   */
  label: ReactNode;
  /**
   * the input in which the user selects values for the filter
   */
  renderMenuBody: () => ReactNode;
  /**
   * the input in which the user can select which operator should be used for this filter
   */
  renderOperatorsInput?: () => ReactNode;
  /**
   * the values applied to this filter by the user
   */
  appliedFilterValues: TAppliedFilterValue[] | undefined | null;
  /**
   * indicates whether FilterMenu can be removed from the filtersList
   */
  isPersistent?: boolean;
  /**
   * whether or not the filter is disabled
   */
  isDisabled?: boolean;
  /**
   * controls whether `x` in Trigger Button is displayed - required if `isPersistent` is `false`
   */
  onRemoveRequest?: Function;
  /**
   * optional button that allows the user to apply selected filter values
   */
  renderApplyButton?: () => ReactNode;
  /**
   * controls whether `clear` button in Menu Body Footer is displayed
   */
  onClearRequest?: Function;
  /**
   * controls whether `sort` button in Menu Body Header is displayed
   */
  onSortRequest?: Function;
  /**
   * controls whether menu is open on initial render
   */
  defaultOpen?: boolean;
};

const menuStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${designTokens.spacing30};
  width: ${Constraints.getMaxPropTokenValue(6)};
  padding: ${designTokens.spacing20} ${designTokens.spacing30};
  background-color: ${designTokens.colorSurface};
  border: 1px solid ${designTokens.colorSurface};
  border-radius: ${designTokens.borderRadius8};
  box-shadow: ${designTokens.shadow18};
  animation-duration: ${designTokens.transitionStandard};
  will-change: 'transform, opacity';
  margin-top: ${designTokens.spacing10};
  position: relative;
  z-index: 5;
`;
function FilterMenu(props: TFilterMenuProps) {
  const [headerSelectOptions, setHeaderSelectOptions] = useState<string>();
  const renderOperatorsInput = (): ReactNode => {
    const operatorOptions = [
      { value: 'is', label: 'is' },
      { value: 'is not', label: 'is NOT' },
    ];

    return (
      <SelectInput
        appearance="quiet"
        isCondensed={true}
        isSearchable={false}
        value={
          // Default to the first option if no value is passed
          headerSelectOptions ? headerSelectOptions : operatorOptions[0].value
        }
        options={operatorOptions}
        onChange={(event) => {
          setHeaderSelectOptions(event.target.value as string);
        }}
      />
    );
  };

  return (
    <Popover.Root defaultOpen={props.isDisabled ? false : props.defaultOpen}>
      <Popover.Trigger asChild>
        <TriggerButton
          filterKey={props.filterKey}
          label={props.label}
          appliedFilterValues={props.appliedFilterValues}
          isDisabled={props.isDisabled}
          isPersistent={props.isPersistent}
          onRemoveRequest={props.onRemoveRequest}
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content side="bottom" align="start" css={menuStyles}>
          <Header
            // For storybook purposes, we are not using the actual props - will be taken off eventually.
            headerLabel="Size"
            renderOperatorsInput={renderOperatorsInput}
            onSort={() => {}}
            menuHeaderWidth={'100px'}
          />
          <div>{props.renderMenuBody()}</div>
          <Footer />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default FilterMenu;
