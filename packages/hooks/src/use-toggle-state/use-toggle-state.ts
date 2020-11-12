import { useCallback, useState } from 'react';

type TToggleValue = boolean;
type TToggleSetter = (nextToggleState: boolean) => void;

type TToggleState = [TToggleValue, TToggleSetter];

const useToggleState = (defaultValue: boolean = true): TToggleState => {
  const [toggleState, setIsToggled] = useState<boolean>(defaultValue);
  const toggle = useCallback<TToggleSetter>(
    (nextToggleState: boolean) => {
      setIsToggled(
        // We keep this for the cases when user uses the toggle callback as the following
        // ```js
        // <TestComponent onClick={toggle} />
        // ```
        // as opposed to
        // ```js
        // <TestComponent onClick={() => toggle()} />
        // ```
        typeof nextToggleState === 'boolean' ? nextToggleState : !toggleState
      );
    },
    [toggleState]
  );
  return [toggleState, toggle];
};

export default useToggleState;
