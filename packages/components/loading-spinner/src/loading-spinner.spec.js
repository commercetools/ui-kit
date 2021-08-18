import { act } from '@testing-library/react';
import { render } from '../../../../test/test-utils';
import LoadingSpinner from './loading-spinner';

const delay = (byMs) => new Promise((resolve) => setTimeout(resolve, byMs));

const renderSpinner = () => {
  const props = {
    scale: 'l',
    maxDelayDuration: 100,
  };
  const rendered = render(
    <LoadingSpinner
      maxDelayDuration={props.maxDelayDuration}
      scale={props.scale}
    >
      <div data-testid="loading-spinner-child" />
    </LoadingSpinner>
  );

  const waitUntilMaxDuration = () => act(() => delay(props.maxDelayDuration));

  return { ...rendered, waitUntilMaxDuration };
};

it('should show loading spinner and render children when the maximum delay duration has passed', async () => {
  const rendered = renderSpinner();

  await rendered.waitUntilMaxDuration();

  expect(rendered.getByTestId('loading-spinner-child')).toBeInTheDocument();
});

it('should not show loading spinner before maximum delay duration has passed', async () => {
  const rendered = renderSpinner();

  expect(
    rendered.queryByTestId('loading-spinner-child')
  ).not.toBeInTheDocument();

  await rendered.waitUntilMaxDuration();
});
