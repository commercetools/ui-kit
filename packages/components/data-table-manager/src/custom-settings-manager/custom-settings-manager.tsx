import type { MouseEvent, KeyboardEvent, ReactNode } from 'react';
import SettingsContainer from '../settings-container';
import messages from './messages';

export type TCustomSettingsManagerProps = {
  onClose: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  managerTheme?: 'light' | 'dark';
  children: ReactNode;
  title: string;
};

const CustomSettingsManager = (props: TCustomSettingsManagerProps) => {
  return (
    <>
      <SettingsContainer
        customSettingsTitle={props.title}
        closeButtonLabel={messages.closeButtonLabel}
        onClose={props.onClose}
        containerTheme={props.managerTheme}
      >
        {props.children}
      </SettingsContainer>
    </>
  );
};

CustomSettingsManager.displayName = 'CustomSettingsManager';

export default CustomSettingsManager;
