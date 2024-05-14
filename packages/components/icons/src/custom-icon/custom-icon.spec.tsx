import { ArrowLeftIcon } from '../generated';
import { screen, render } from '../../../../../test/test-utils';
import rawSvg from '../fixtures/raw-svg';
import CustomIcon, { type TCustomIconProps } from './custom-icon';

type TCustomIconTestProps = Pick<
  TCustomIconProps,
  'size' | 'icon' | 'hasBorder'
> & {
  'data-testid'?: string;
  'aria-label': string;
};

const createTestProps = (
  custom?: TCustomIconTestProps
): TCustomIconTestProps => ({
  size: '20',
  icon: <ArrowLeftIcon aria-label="arrowLeft" />,
  'aria-label': 'custom-icon-test',
  ...custom,
});

describe('CustomIcon', () => {
  let props: TCustomIconTestProps;
  beforeEach(() => {
    props = createTestProps();
  });
  it('should render a react component and pass aria attributes', async () => {
    render(<CustomIcon {...props} />);
    await screen.findByRole('img', { name: 'custom-icon-test' });
  });
  it('should pass data attributes', async () => {
    render(<CustomIcon {...props} data-testid="test-testid" />);
    await screen.findByTestId('test-testid');
  });
  it('should render a custom svg when svg prop is passed', async () => {
    render(<CustomIcon icon={rawSvg.clock} />);
    await screen.findByLabelText('custom clock svg');
  });
});
