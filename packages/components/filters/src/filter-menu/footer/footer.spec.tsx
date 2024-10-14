import Footer from './footer';
import { PrimaryButton } from '@commercetools-uikit/buttons';
import { screen, render } from '../../../../../../test/test-utils';

describe('FilterMenu Footer', () => {
  it('should not render a Footer if neither prop is passed', () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).toBeNull();
  });

  it('should render a FlatButton if the onClearAllRequest prop is passed', async () => {
    const mockOnClearAllRequest = jest.fn();

    render(<Footer onClearAllRequest={mockOnClearAllRequest} />);

    const flatButton = screen.getByRole('button', { name: /clear all/i });
    expect(flatButton).toBeInTheDocument();
  });

  it('should render a PrimaryButton if the renderApplyButton prop is passed', () => {
    const mockRenderApplyButton = jest.fn(() => (
      <PrimaryButton label="Apply" />
    ));

    const { getByRole } = render(
      <Footer renderApplyButton={mockRenderApplyButton} />
    );

    expect(getByRole('button', { name: /apply/i })).toBeInTheDocument();
  });
});
