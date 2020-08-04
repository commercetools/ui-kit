import React from 'react';
import { screen, render } from '../../../../../../test/test-utils';
import DensityManager from '.';
import PrimaryButton from '../../../../buttons/primary-button';
import SecondaryButton from '../../../../buttons/secondary-button';
import {
  WRAPPED_TEXT_VISIBLE,
  SHOW_HIDE_ON_DEMAND,
  DENSITY_DEFAULT,
  DENSITY_COMPACT,
} from './constants';

const createTestProps = (customProps) => ({
  isCondensed: false,
  isWrappingText: false,
  onDensityDisplayChange: jest.fn(),
  onTextWrappingChange: jest.fn(),
  onClose: jest.fn(),
  ...customProps,
});

describe('DensityManager', () => {
  it('not wrapping text', () => {
    const props = createTestProps();
    const { container } = render(<DensityManager {...props} />);
    expect(
      container.querySelector(`[value='${WRAPPED_TEXT_VISIBLE}']`)
    ).toBeChecked();
  });

  it('wrapping text', () => {
    const props = createTestProps({ isWrappingText: true });
    const { container } = render(<DensityManager {...props} />);
    expect(
      container.querySelector(`[value='${SHOW_HIDE_ON_DEMAND}']`)
    ).toBeChecked();
  });

  it('not condensed', () => {
    const props = createTestProps();
    const { container } = render(<DensityManager {...props} />);
    expect(
      container.querySelector(`[value='${DENSITY_DEFAULT}']`)
    ).toBeChecked();
  });

  it('condensed', () => {
    const props = createTestProps({ isCondensed: true });
    const { container } = render(<DensityManager {...props} />);
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
      render(<DensityManager {...props} />);
      expect(screen.getByText(primaryButtonLabel)).toBeInTheDocument();
    });

    it('secondary button', () => {
      const secondaryButtonLabel = 'Secondary Test';
      const props = createTestProps({
        secondaryButton: (
          <SecondaryButton label={secondaryButtonLabel} onClick={jest.fn()} />
        ),
      });
      render(<DensityManager {...props} />);
      expect(screen.getByText(secondaryButtonLabel)).toBeInTheDocument();
    });
  });
});
