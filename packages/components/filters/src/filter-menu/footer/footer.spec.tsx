import Footer from './footer';
import { PrimaryButton } from '@commercetools-uikit/buttons';
import { screen, render, fireEvent } from '../../../../../../test/test-utils';

const mockOnClearRequest = jest.fn();
const mockRenderApplyButton = jest.fn(() => <PrimaryButton label="Apply" />);

describe('FilterMenu Footer', () => {
  it('should not render a Footer if neither prop is passed', () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).toBeNull();
  });

  it('should render a FlatButton if the onClearAllRequest prop is passed', async () => {
    render(<Footer onClearRequest={mockOnClearRequest} />);

    await screen.findByRole('button', { name: /clear all/i });
  });

  it('should call onClearRequest when clear all button is pressed', async () => {
    render(<Footer onClearRequest={mockOnClearRequest} />);

    const clearAllButton = await screen.findByRole('button', {
      name: /clear all/i,
    });
    fireEvent.click(clearAllButton);
    expect(mockOnClearRequest).toHaveBeenCalled();
  });

  it('should render a PrimaryButton if the renderApplyButton prop is passed', async () => {
    render(<Footer renderApplyButton={mockRenderApplyButton} />);

    await screen.findByRole('button', { name: /apply/i });
  });

  it('should render an apply button and clear all button when renderApplyButton and onClearAllRequest are passed', async () => {
    const { container } = render(
      <Footer
        renderApplyButton={mockRenderApplyButton}
        onClearRequest={mockOnClearRequest}
      />
    );

    const applyButton = await screen.findByRole('button', { name: /apply/i });
    const clearAllButton = await screen.findByRole('button', {
      name: /clear all/i,
    });
    expect(container.firstChild).toContainElement(applyButton);
    expect(container.lastChild).toContainElement(clearAllButton);
  });
});
