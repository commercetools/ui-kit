import { screen, render } from '../../../../test/test-utils';
import Label from './label';

jest.mock('@commercetools-uikit/utils');

const intlMessage = { id: 'input-label', defaultMessage: 'translated-label' };

it('should be usable as the label for an element', () => {
  render(
    <div>
      <Label htmlFor="input-id">input-label</Label>
      <input id="input-id" type="text" defaultValue="" />
    </div>
  );
  expect(screen.getByLabelText('input-label')).toBeInTheDocument();
});

it('should render the children', () => {
  render(<Label>input-label</Label>);
  expect(screen.getByText('input-label')).toBeInTheDocument();
});

it('should render a required indicator', () => {
  render(<Label isRequiredIndicatorVisible={true}>input-label</Label>);
  expect(screen.getByText('*')).toBeInTheDocument();
});

it('should render given text with react-intl', () => {
  render(<Label intlMessage={intlMessage} />);
  expect(screen.getByText('translated-label')).toBeInTheDocument();
});
