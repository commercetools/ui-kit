import withSizeProp from '../with-size-prop';
import ToggleBackgroundDefaultIcon from './toggle-normal-bkgr.svg';
import ToggleBackgroundHoverIcon from './toggle-active-hover-bkgr.svg';
import ToggleBackgroundDisabledIcon from './toggle-disable-bkgr.svg';
import ToggleBackgroundCheckedIcon from './toggled-bkgr.svg';
import ToggleBackgroundCheckedHoverIcon from './toggled-active-hover-bkgr.svg';
import ToggleBackgroundCheckedDisabledIcon from './toggled-disable-bkgr.svg';
import ToggleButtonDefaultIcon from './toggle-normal-bt.svg';
import ToggleButtonHoverIcon from './toggle-active-hover-bt.svg';
import ToggleButtonDisabledIcon from './toggle-disable-bt.svg';
import ToggleButtonCheckedIcon from './toggled-bt.svg';
import ToggleButtonCheckedHoverIcon from './toggled-active-hover-bt.svg';
import ToggleButtonCheckedDisabledIcon from './toggled-disable-bt.svg';

export default {
  BackgroundDefault: ToggleBackgroundDefaultIcon,
  BackgroundHover: ToggleBackgroundHoverIcon,
  BackgroundDisabled: ToggleBackgroundDisabledIcon,
  BackgroundChecked: ToggleBackgroundCheckedIcon,
  BackgroundCheckedHover: ToggleBackgroundCheckedHoverIcon,
  BackgroundCheckedDisabled: ToggleBackgroundCheckedDisabledIcon,
  ButtonDefault: withSizeProp(ToggleButtonDefaultIcon),
  ButtonHover: withSizeProp(ToggleButtonHoverIcon),
  ButtonDisabled: withSizeProp(ToggleButtonDisabledIcon),
  ButtonChecked: withSizeProp(ToggleButtonCheckedIcon),
  ButtonCheckedHover: withSizeProp(ToggleButtonCheckedHoverIcon),
  ButtonCheckedDisabled: withSizeProp(ToggleButtonCheckedDisabledIcon),
};
