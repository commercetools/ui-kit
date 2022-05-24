import {
  ViewSwitcher,
  CubeIcon,
  InformationIcon,
} from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/view-switcher';

export const component = () => (
  <Suite>
    <Spec label="with View 1 button selected">
      <ViewSwitcher.Group defaultSelected="view-1">
        <ViewSwitcher.Button value="view-1">View 1</ViewSwitcher.Button>
        <ViewSwitcher.Button value="view-2">View 2</ViewSwitcher.Button>
        <ViewSwitcher.Button value="view-3">View 3</ViewSwitcher.Button>
      </ViewSwitcher.Group>
    </Spec>

    <Spec label="with View 1 button disabled and view 2 button selected">
      <ViewSwitcher.Group defaultSelected="view-2">
        <ViewSwitcher.Button value="view-1" isDisabled>
          View 1
        </ViewSwitcher.Button>
        <ViewSwitcher.Button value="view-2">View 2</ViewSwitcher.Button>
        <ViewSwitcher.Button value="view-3">View 3</ViewSwitcher.Button>
      </ViewSwitcher.Group>
    </Spec>

    <Spec label="with buttons condensed">
      <ViewSwitcher.Group defaultSelected="view-1" isCondensed>
        <ViewSwitcher.Button value="view-1">View 1</ViewSwitcher.Button>
        <ViewSwitcher.Button value="view-2">View 2</ViewSwitcher.Button>
      </ViewSwitcher.Group>
    </Spec>

    <Spec label="with icon buttons">
      <ViewSwitcher.Group defaultSelected="view-1">
        <ViewSwitcher.Button value="view-1" icon={<InformationIcon />}>
          View 1
        </ViewSwitcher.Button>
        <ViewSwitcher.Button value="view-2" icon={<CubeIcon />}>
          View 2
        </ViewSwitcher.Button>
      </ViewSwitcher.Group>
    </Spec>
  </Suite>
);
