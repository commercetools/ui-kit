import React from 'react';
import { WarningIcon } from '@commercetools-uikit/icons';
import { render } from '../../../../src/test-utils';
import FieldLabel from './field-label';

jest.mock('tiny-invariant');

it('should accept a title', () => {
  const { container } = render(<FieldLabel title="Title" />);
  expect(container).toHaveTextContent('Title');
});

it('should accept a hint', () => {
  const { container } = render(<FieldLabel title="Title" hint="Hint" />);
  expect(container).toHaveTextContent('Hint');
});

it('should accept a hint icon', () => {
  const { container, getByTestId } = render(
    <FieldLabel
      title="Title"
      hint="Hint"
      hintIcon={<WarningIcon data-testid="warning-icon" />}
    />
  );
  expect(container).toHaveTextContent('Hint');
  expect(getByTestId('warning-icon')).toBeInTheDocument();
});

it('should accept display a required indicator', () => {
  const { container } = render(
    <FieldLabel title="Title" hasRequiredIndicator={true} />
  );
  expect(container).toHaveTextContent('*');
});

describe('when onInfoButtonClick is given', () => {
  it('should show an info button', () => {
    const onInfoButtonClick = jest.fn();
    const { getByLabelText } = render(
      <FieldLabel title="Title" onInfoButtonClick={onInfoButtonClick} />
    );
    expect(getByLabelText('More Info')).toBeInTheDocument();
    getByLabelText('More Info').click();
    expect(onInfoButtonClick).toHaveBeenCalledTimes(1);
  });
});

it('should accept a badge', () => {
  const { getByTestId } = render(
    <FieldLabel title="Title" badge={<div data-testid="badge" />} />
  );
  expect(getByTestId('badge')).toBeInTheDocument();
});
