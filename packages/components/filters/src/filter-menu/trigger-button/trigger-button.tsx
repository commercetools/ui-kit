import { type ReactNode } from 'react';

export type TFilterMenuTriggerButtonProps = {
  /**
   * formatted message to display the filter's name
   */
  label: ReactNode;
  /**
   * the values applied to this filter by the user
   *
   * NOTE: this will become more specific in later PR's
   */
  appliedFilterValues: unknown | undefined | null;
  /**
   * whether or not the filter is disabled
   */
  isDisabled?: boolean;
  /**
   * indicates whether FilterMenu can be removed from the filtersList
   */
  isPersistent?: boolean;
  /**
   * controls whether `x` in Trigger Button is displayed - required if `isPersistent` is `false`
   */
  onRemoveRequest?: Function;
};

const TriggerButton = (props: TFilterMenuTriggerButtonProps) => {
  return (
    <button>
      <div>{props.label}</div>
    </button>
  );
};

export default TriggerButton;
