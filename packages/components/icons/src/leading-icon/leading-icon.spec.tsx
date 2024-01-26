import { ArrowLeftIcon } from '../generated';
import { screen, render } from '../../../../../test/test-utils';
import svg from '../fixtures/svg';
import LeadingIcon, { type TLeadingIconProps } from './leading-icon';

type TLeadingIconTestProps = Pick<
  TLeadingIconProps,
  'color' | 'size' | 'icon' | 'isInverted'
> & {
  'data-testid'?: string;
  'aria-label': string;
};

const createTestProps = (
  custom?: Partial<TLeadingIconTestProps>
): TLeadingIconTestProps => ({
  color: 'neutral',
  size: '20',
  icon: <ArrowLeftIcon aria-label="arrowLeft" />,
  'aria-label': 'leading-icon',
  ...custom,
});

describe('LeadingIcon', () => {
  let props: Partial<TLeadingIconTestProps>;
  beforeEach(() => {
    props = createTestProps();
  });
  it('should render', async () => {
    render(<LeadingIcon {...props} />);
    await screen.findByRole('img', { name: 'leading-icon' });
  });
  it('should pass aria attributes', async () => {
    render(<LeadingIcon {...props} />);
    await screen.findByRole('img', { name: 'leading-icon' });
  });
  it('should pass data attributes', async () => {
    render(<LeadingIcon {...props} data-testid="test-testid" />);
    await screen.findByTestId('test-testid');
  });
  it('should render a react component when icon prop is passed', async () => {
    render(<LeadingIcon {...props} />);
    await screen.findByRole('img', { name: 'arrowLeft' });
  });
  it('should render a custom svg when svg prop is passed', async () => {
    render(<LeadingIcon svg={svg.clock} />);
    await screen.findByLabelText('custom clock svg');
  });
});
