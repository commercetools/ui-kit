import PrimaryButton from '@commercetools-uikit/primary-button';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { screen, render } from '../../../../../test/test-utils';
import {
  WRAPPED_TEXT_VISIBLE,
  SHOW_HIDE_ON_DEMAND,
  DENSITY_COMFORTABLE,
  DENSITY_COMPACT,
} from './constants';
import DisplaySettingsManager from './display-settings-manager';

const createTestProps = (customProps) => ({
  isCondensed: false,
  isWrappingText: false,
  onDensityDisplayChange: jest.fn(),
  onTextWrappingChange: jest.fn(),
  onClose: jest.fn(),
  ...customProps,
});

describe('DisplaySettingsManager', () => {
  it('not wrapping text', () => {
    const props = createTestProps();
    const { container } = render(<DisplaySettingsManager {...props} />);
    expect(
      container.querySelector(`[value='${WRAPPED_TEXT_VISIBLE}']`)
    ).toBeChecked();
  });

  it('wrapping text', () => {
    const props = createTestProps({ isWrappingText: true });
    const { container } = render(<DisplaySettingsManager {...props} />);
    expect(
      container.querySelector(`[value='${SHOW_HIDE_ON_DEMAND}']`)
    ).toBeChecked();
  });

  it('not condensed', () => {
    const props = createTestProps();
    const { container } = render(<DisplaySettingsManager {...props} />);
    expect(
      container.querySelector(`[value='${DENSITY_COMFORTABLE}']`)
    ).toBeChecked();
  });

  it('condensed', () => {
    const props = createTestProps({ isCondensed: true });
    const { container } = render(<DisplaySettingsManager {...props} />);
    expect(
      container.querySelector(`[value='${DENSITY_COMPACT}']`)
    ).toBeChecked();
  });

  describe('buttons', () => {
    it('primary button', () => {
      const primaryButtonLabel = 'Primary Test';
      const props = createTestProps({
        primaryButton: (
          <PrimaryButton label={primaryButtonLabel} onClick={jest.fn()} />
        ),
      });
      render(<DisplaySettingsManager {...props} />);
      expect(screen.getByText(primaryButtonLabel)).toBeInTheDocument();
    });

    it('secondary button', () => {
      const secondaryButtonLabel = 'Secondary Test';
      const props = createTestProps({
        secondaryButton: (
          <SecondaryButton label={secondaryButtonLabel} onClick={jest.fn()} />
        ),
      });
      render(<DisplaySettingsManager {...props} />);
      expect(screen.getByText(secondaryButtonLabel)).toBeInTheDocument();
    });
  });
});
