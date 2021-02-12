import React from 'react';
import { warning } from '@commercetools-uikit/utils';
import { WarningIcon } from '@commercetools-uikit/icons';
import { screen, render } from '../../../../test/test-utils';
import FieldLabel from './field-label';

it('should accept a title', () => {
  render(<FieldLabel title="Title" />);
  expect(screen.getByText('Title')).toBeInTheDocument();
});

it('should accept a hint', () => {
  const { container } = render(<FieldLabel title="Title" hint="Hint" />);
  expect(container).toHaveTextContent('Hint');
});

it('should accept a hint icon', () => {
  render(
    <FieldLabel
      title="Title"
      hint="Hint"
      hintIcon={<WarningIcon data-testid="warning-icon" />}
    />
  );
  expect(screen.getByText('Hint')).toBeInTheDocument();
  expect(screen.getByTestId('warning-icon')).toBeInTheDocument();
});

it('should accept display a required indicator', () => {
  render(<FieldLabel title="Title" hasRequiredIndicator={true} />);
  expect(screen.getByText('*')).toBeInTheDocument();
});

describe('when onInfoButtonClick is given', () => {
  it('should show an info button', () => {
    const onInfoButtonClick = jest.fn();
    render(<FieldLabel title="Title" onInfoButtonClick={onInfoButtonClick} />);
    expect(screen.getByLabelText('More Info')).toBeInTheDocument();
    screen.getByLabelText('More Info').click();
    expect(onInfoButtonClick).toHaveBeenCalledTimes(1);
  });
});

it('should accept a badge', () => {
  render(<FieldLabel title="Title" badge={<div data-testid="badge" />} />);
  expect(screen.getByTestId('badge')).toBeInTheDocument();
});
