import SecondaryButton from '@commercetools-uikit/secondary-button';

import { act, screen, render } from '../../../../../test/test-utils';
import DropdownMenu from './dropdown-menu';

describe('DropdownMenu', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should render list menu', async () => {
    const firstOptionOnClick = jest.fn();
    const secondOptionOnClick = jest.fn();

    await render(
      <DropdownMenu
        menuType="list"
        triggerElement={<SecondaryButton label="Trigger" />}
      >
        <DropdownMenu.ListMenuItem onClick={firstOptionOnClick}>
          Option 1
        </DropdownMenu.ListMenuItem>
        <DropdownMenu.ListMenuItem onClick={secondOptionOnClick} isDisabled>
          Option 2
        </DropdownMenu.ListMenuItem>
      </DropdownMenu>
    );

    // Dropdown shold be closed by default
    expect(screen.queryByText('Option 1')).not.toBeVisible();

    // Open the dropdown
    screen.getByLabelText('Trigger').click();
    await jest.runAllTimersAsync();
    expect(await screen.findByText('Option 1')).toBeVisible();
    expect(screen.getByText('Option 2')).toBeVisible();

    // Clicking in the disabled options should do nothing
    screen.getByText('Option 2').click();
    expect(secondOptionOnClick).toHaveBeenCalledTimes(0);
    expect(await screen.findByText('Option 1')).toBeVisible();

    // Clicking in the enabled option should close the dropdown
    screen.getByText('Option 1').click();
    expect(firstOptionOnClick).toHaveBeenCalledTimes(1);
    expect(await screen.findByText('Option 1')).not.toBeVisible();
  });

  it('should render the default menu', async () => {
    await render(
      <>
        <h2>Header</h2>
        <DropdownMenu triggerElement={<SecondaryButton label="Trigger" />}>
          <div>Content</div>
        </DropdownMenu>
      </>
    );

    // Dropdown shold be closed by default
    expect(screen.queryByText('Content')).not.toBeVisible();

    // Open the dropdown
    screen.getByLabelText('Trigger').click();
    await jest.runAllTimersAsync();
    expect(await screen.findByText('Content')).toBeVisible();

    // Clicking outside the dropdown should close it
    act(() => {
      screen.getByText('Header').click();
    });
    expect(await screen.findByText('Content')).not.toBeVisible();
  });

  it('should pass data attributes without menuType', async () => {
    await render(
      <DropdownMenu
        data-testid="dropdown-container"
        triggerElement={
          <SecondaryButton label="Trigger" data-testid="trigger-element" />
        }
      >
        <DropdownMenu.ListMenuItem data-testid="list-item">
          Option 1
        </DropdownMenu.ListMenuItem>
      </DropdownMenu>
    );

    // Check that the data-testid attributes are passed down
    expect(screen.getByTestId('trigger-element')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-container')).toBeInTheDocument();
    expect(screen.getByTestId('list-item')).toBeInTheDocument();
  });

  it('should pass data attributes with menuType="list"', async () => {
    await render(
      <DropdownMenu
        menuType="list"
        data-testid="dropdown-container"
        triggerElement={
          <SecondaryButton label="Trigger" data-testid="trigger-element" />
        }
      >
        <DropdownMenu.ListMenuItem data-testid="list-item">
          Option 1
        </DropdownMenu.ListMenuItem>
      </DropdownMenu>
    );

    // Check that the data-testid attributes are passed down
    expect(screen.getByTestId('trigger-element')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-container')).toBeInTheDocument();
    expect(screen.getByTestId('list-item')).toBeInTheDocument();
  });
});
