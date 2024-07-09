import { screen, render, fireEvent } from '../../../../../test/test-utils';
import DisplaySettingsManager from './custom-settings-manager';

const mockCustomComponentClick = jest.fn();

const CustomComponent = (prop) => (
  <button onClick={prop.onClick}>Custom Component</button>
);

const createTestProps = (customProps) => ({
  managerTheme: 'light',
  children: <CustomComponent onClick={mockCustomComponentClick} />,
  title: 'Test Title',
  onClose: jest.fn(),
  ...customProps,
});

describe('CustomSettingsManager', () => {
  it('renders with the correct title', () => {
    const props = createTestProps();
    render(<DisplaySettingsManager {...props} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
  it('renders with the correct children', () => {
    const props = createTestProps();
    render(<DisplaySettingsManager {...props} />);

    const customButton = screen.getByText('Custom Component');
    expect(customButton).toBeInTheDocument();

    fireEvent.click(customButton);
    expect(mockCustomComponentClick).toHaveBeenCalled();
  });
});
