import { screen, render, fireEvent } from '../../../../../../test/test-utils';
import TriggerButton, {
  type TFilterMenuTriggerButtonProps,
} from './trigger-button';

const mockOnRemoveRequest = jest.fn();

const getDefaultProps = (custom?: Partial<TFilterMenuTriggerButtonProps>) => ({
  filterKey: 'test-key',
  label: 'test',
  appliedFilterValues: [{ label: 'cool test phrase', value: 'testPhrase' }],
  onRemoveRequest: mockOnRemoveRequest,
  ...custom,
});

describe('FilterMenu Trigger Button', () => {
  it('should render the label', async () => {
    const props = getDefaultProps();
    await render(<TriggerButton {...props} />);
    await screen.findByLabelText(/test:/i);
  });

  describe('when there are no applied filter values', () => {
    it('should render the CaretDownIcon', async () => {
      const props = getDefaultProps({ appliedFilterValues: undefined });
      await render(<TriggerButton {...props} />);
      await screen.findByLabelText('toggle filter menu icon');
    });
    it('should render the CaretDownIcon if isPersistent is true', async () => {
      const props = getDefaultProps({
        appliedFilterValues: undefined,
        isPersistent: true,
      });
      await render(<TriggerButton {...props} />);
      await screen.findByLabelText('toggle filter menu icon');
    });
    it('should not render a remove button', async () => {
      const props = getDefaultProps({ appliedFilterValues: undefined });
      await render(<TriggerButton {...props} />);
      await screen.findByLabelText(/test:/i);
      expect(
        screen.queryByRole('button', { name: 'remove test filter' })
      ).not.toBeInTheDocument();
    });
  });

  describe('when there are applied filter values', () => {
    it('should not render the CaretDownIcon', async () => {
      const props = getDefaultProps();
      await render(<TriggerButton {...props} />);
      await screen.findByLabelText(/test:/i);
      expect(
        screen.queryByLabelText('toggle filter menu icon')
      ).not.toBeInTheDocument();
    });
    it('should render a remove button', async () => {
      const props = getDefaultProps();
      await render(<TriggerButton {...props} />);
      await screen.findByRole('button', { name: 'remove test filter' });
    });
    it('should call onRemoveRequest when remove button is clicked', async () => {
      const props = getDefaultProps();
      await render(<TriggerButton {...props} />);
      const removeButton = await screen.findByRole('button', {
        name: 'remove test filter',
      });
      fireEvent.click(removeButton);
      expect(mockOnRemoveRequest).toHaveBeenCalled();
    });
    it('should not render a remove button if isPersistent is true', async () => {
      const props = getDefaultProps({ isPersistent: true });
      await render(<TriggerButton {...props} />);
      await screen.findByLabelText(/test:/i);
      expect(
        screen.queryByRole('button', { name: 'remove test filter' })
      ).not.toBeInTheDocument();
    });
    it('should render the correct number of filter chips', async () => {
      const props = getDefaultProps({
        appliedFilterValues: [
          { value: 'one', label: 'one' },
          { value: 'two', label: 'two' },
        ],
      });
      await render(<TriggerButton {...props} />);
      expect(screen.getAllByText(/one|two/)).toHaveLength(2);
    });
    it('should display the overflow badge when chips overflow', async () => {
      const props = getDefaultProps({
        appliedFilterValues: [
          { value: 'one', label: 'one' },
          { value: 'two', label: 'two' },
          {
            value: 'long-label',
            label: 'just a realllllly reallllllllllllllyyyyyyy long label',
          },
          {
            value: 'another-one',
            label: 'another reallllyu reerealllllay longggg label',
          },
        ],
      });
      // Mock clientWidth and scrollWidth to simulate overflow
      Object.defineProperty(HTMLUListElement.prototype, 'clientWidth', { configurable: true, value: 537 });
      Object.defineProperty(HTMLUListElement.prototype, 'scrollWidth', { configurable: true, value: 800 });
      // Mock getBoundingClientRect for all li elements to have a consistent width
      window.HTMLLIElement.prototype.getBoundingClientRect = () => ({
        x: 0,
        y: 0,
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 100,
        toJSON: () => ({}),
      });
      await render(<TriggerButton {...props} />);
      const badge = await screen.findByText(/\+/);
      expect(badge).toBeInTheDocument();
    });
    it('should not display an overflow badge when all chips fit', async () => {
      const props = getDefaultProps({
        appliedFilterValues: [{ value: 'one', label: 'one' }],
      });
      await render(<TriggerButton {...props} />);
      expect(screen.queryByText(/\+/)).not.toBeInTheDocument();
    });
  });

  describe('when disabled', () => {
    it('should apply the proper attributes to the main action (overlay) button', async () => {
      const props = getDefaultProps({ isDisabled: true });
      await render(<TriggerButton {...props} />);
      const overlayButton = await screen.findByRole('button', {
        name: 'test:',
      });
      expect(overlayButton).toHaveAttribute('disabled');
      expect(overlayButton).toHaveAttribute('readonly');
      expect(overlayButton).toHaveAttribute('tabindex', '-1');
    });
  });
});
