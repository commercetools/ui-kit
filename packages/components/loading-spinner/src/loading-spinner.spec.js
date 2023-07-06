import { act } from '@testing-library/react';
import { render } from '../../../../test/test-utils';
import LoadingSpinner from './loading-spinner';

const delay = (byMs) => new Promise((resolve) => setTimeout(resolve, byMs));

const renderSpinner = (customProps = { maxDelayDuration: 100 }) => {
  const props = {
    scale: 'l',
    ...customProps,
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

// TODO: refactor to prevent `An update to %s inside a test was not wrapped in act(...)` error
beforeEach(() => {
  const consoleWarnMock = jest.fn();
  consoleWarnMock.mockClear();
  console.error = consoleWarnMock;
});
it('should show loading spinner and render children when the maximum delay duration has passed', async () => {
  const rendered = renderSpinner();

  await rendered.waitUntilMaxDuration();

  expect(rendered.getByTestId('loading-spinner-child')).toBeInTheDocument();
});

it('should show loading spinner right away when using 0 delay', () => {
  const rendered = renderSpinner({ maxDelayDuration: 0 });
  expect(rendered.getByTestId('loading-spinner-child')).toBeInTheDocument();
});

it('should not show loading spinner before maximum delay duration has passed', async () => {
  const rendered = renderSpinner();

  expect(
    rendered.queryByTestId('loading-spinner-child')
  ).not.toBeInTheDocument();

  await rendered.waitUntilMaxDuration();

  expect(rendered.getByTestId('loading-spinner-child')).toBeInTheDocument();
});
