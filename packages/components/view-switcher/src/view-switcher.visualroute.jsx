import {
  ViewSwitcher,
  CubeIcon,
  InformationIcon,
  WorldIcon,
} from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/view-switcher';

export const component = () => (
  <Suite>
    <Spec label="with a button selected">
      <ViewSwitcher.Group defaultSelected="view-1">
        <ViewSwitcher.Button value="view-1">View 1</ViewSwitcher.Button>
        <ViewSwitcher.Button value="view-2">View 2</ViewSwitcher.Button>
        <ViewSwitcher.Button value="view-3">View 3</ViewSwitcher.Button>
      </ViewSwitcher.Group>
    </Spec>

    <Spec label="with a button disabled and a button selected">
      <ViewSwitcher.Group defaultSelected="view-2">
        <ViewSwitcher.Button value="view-1" isDisabled>
          View 1
        </ViewSwitcher.Button>
        <ViewSwitcher.Button value="view-2">View 2</ViewSwitcher.Button>
        <ViewSwitcher.Button value="view-3">View 3</ViewSwitcher.Button>
      </ViewSwitcher.Group>
    </Spec>

    <Spec label="with condensed version">
      <ViewSwitcher.Group defaultSelected="view-1" isCondensed>
        <ViewSwitcher.Button value="view-1">View 1</ViewSwitcher.Button>
        <ViewSwitcher.Button value="view-2">View 2</ViewSwitcher.Button>
        <ViewSwitcher.Button value="view-3">View 3</ViewSwitcher.Button>
      </ViewSwitcher.Group>
    </Spec>

    <Spec label="with icon only buttons">
      <ViewSwitcher.Group defaultSelected="view-1">
        <ViewSwitcher.Button value="view-1" icon={<InformationIcon />} />
        <ViewSwitcher.Button value="view-2" icon={<CubeIcon />} />
        <ViewSwitcher.Button value="view-3" icon={<WorldIcon />} />
      </ViewSwitcher.Group>
    </Spec>

    <Spec label="with icon and text buttons">
      <ViewSwitcher.Group defaultSelected="view-1">
        <ViewSwitcher.Button value="view-1" icon={<InformationIcon />}>
          View 1
        </ViewSwitcher.Button>
        <ViewSwitcher.Button value="view-2" icon={<CubeIcon />}>
          View 2
        </ViewSwitcher.Button>
        <ViewSwitcher.Button value="view-3" icon={<WorldIcon />}>
          View 3
        </ViewSwitcher.Button>
      </ViewSwitcher.Group>
    </Spec>

    <Spec label="with icon buttons and condensed version">
      <ViewSwitcher.Group defaultSelected="view-1" isCondensed>
        <ViewSwitcher.Button value="view-1" icon={<InformationIcon />}>
          View 1
        </ViewSwitcher.Button>
        <ViewSwitcher.Button value="view-2" icon={<CubeIcon />}>
          View 2
        </ViewSwitcher.Button>
        <ViewSwitcher.Button value="view-3" icon={<WorldIcon />}>
          View 3
        </ViewSwitcher.Button>
      </ViewSwitcher.Group>
    </Spec>

    <Spec label="with icon buttons, condensed version and a disabled button">
      <ViewSwitcher.Group defaultSelected="view-1" isCondensed>
        <ViewSwitcher.Button value="view-1" icon={<InformationIcon />}>
          View 1
        </ViewSwitcher.Button>
        <ViewSwitcher.Button value="view-2" isDisabled icon={<CubeIcon />}>
          View 2
        </ViewSwitcher.Button>
        <ViewSwitcher.Button value="view-3" icon={<WorldIcon />}>
          View 3
        </ViewSwitcher.Button>
      </ViewSwitcher.Group>
    </Spec>
  </Suite>
);
