import React from 'react';
import { render } from '../../../../test/test-utils';
import Label from './label';

const intlMessage = { id: 'input-label', defaultMessage: 'translated-label' };

it('should be usable as the label for an element', () => {
  const { getByLabelText } = render(
    <div>
      <Label htmlFor="input-id">input-label</Label>
      <input id="input-id" type="text" defaultValue="" />
    </div>
  );
  expect(getByLabelText('input-label')).toBeInTheDocument();
});

it('should render the children', () => {
  const { container } = render(<Label>input-label</Label>);
  expect(container).toHaveTextContent('input-label');
});

it('should render a required indicator', () => {
  const { container } = render(
    <Label isRequiredIndicatorVisible={true}>input-label</Label>
  );
  expect(container).toHaveTextContent('*');
});

it('should render given text with react-intl', () => {
  const { container } = render(<Label intlMessage={intlMessage} />);
  expect(container).toHaveTextContent('translated-label');
});
