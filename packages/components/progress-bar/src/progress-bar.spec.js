import { screen, render } from '../../../../test/test-utils';
import Text from '@commercetools-uikit/text';
import { BoxIcon } from '../../icons';
import ProgressBar from './progress-bar';

jest.mock('@commercetools-uikit/utils', () => ({
  ...jest.requireActual('@commercetools-uikit/utils'),
  warning: jest.fn(),
}));

const TestProp = () => (
  <Text.Body data-testid="test-prop">
    <BoxIcon /> Unpacking the boxes
  </Text.Body>
);

it('should render the inline props', () => {
  render(<ProgressBar label="Hello" />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});

it('should render a component as a label', () => {
  render(<ProgressBar label={<TestProp />} />);
  expect(screen.getByTestId('test-prop')).toBeInTheDocument();
});
