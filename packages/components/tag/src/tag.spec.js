import React from 'react';
import { render } from '../../../../test/test-utils';
import Tag from './tag';

it('should render children', () => {
  const { container } = render(<Tag>Bread</Tag>);
  expect(container).toHaveTextContent('Bread');
});

it('should call onClick when clicked', () => {
  const onClick = jest.fn();
  const { getByText } = render(<Tag onClick={onClick}>Bread</Tag>);
  getByText('Bread').click();
  expect(onClick).toHaveBeenCalledTimes(1);
});

it('should call onRemove when remove icon is clicked', () => {
  const onRemove = jest.fn();
  const { getByLabelText } = render(<Tag onRemove={onRemove}>Bread</Tag>);
  getByLabelText('Remove').click();
  expect(onRemove).toHaveBeenCalledTimes(1);
});

it('should call the right handler when onClick and onRemove are provided', () => {
  const onClick = jest.fn();
  const onRemove = jest.fn();
  const { getByText, getByLabelText } = render(
    <Tag onRemove={onRemove} onClick={onClick}>
      Bread
    </Tag>
  );

  // clicking the Tag
  getByText('Bread').click();
  expect(onClick).toHaveBeenCalledTimes(1);
  expect(onRemove).not.toHaveBeenCalled();

  // clicking the remove button
  getByLabelText('Remove').click();
  expect(onRemove).toHaveBeenCalledTimes(1);
  expect(onClick).toHaveBeenCalledTimes(1);
});

describe('when disabled', () => {
  it('should not call onClick when clicked', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Tag onClick={onClick} isDisabled={true}>
        Bread
      </Tag>
    );
    getByText('Bread').click();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should not call onRemove when clicked', () => {
    const onRemove = jest.fn();
    const { getByLabelText } = render(
      <Tag onRemove={onRemove} isDisabled={true}>
        Bread
      </Tag>
    );
    getByLabelText('Remove').click();
    expect(onRemove).not.toHaveBeenCalled();
  });
});

describe('when linkTo is set', () => {
  it('should redirect when clicked', () => {
    const { getByText, history } = render(<Tag linkTo="/foo">Bread</Tag>);
    getByText('Bread').click();

    expect(history.location.pathname).toBe('/foo');
  });

  it('should still call onClick when clicked', () => {
    const onClick = jest.fn();
    const { getByText, history } = render(
      <Tag onClick={onClick} linkTo="/foo">
        Bread
      </Tag>
    );
    getByText('Bread').click();
    expect(onClick).toHaveBeenCalled();

    expect(history.location.pathname).toBe('/foo');
  });

  it('should not redirect when removed', () => {
    const onRemove = jest.fn();
    const { getByLabelText, history } = render(
      <Tag onRemove={onRemove} linkTo="/foo">
        Bread
      </Tag>
    );

    getByLabelText('Remove').click();

    // ensure "onRemove" is stil called
    expect(onRemove).toHaveBeenCalled();

    // ensure the pathname is not "/foo", otherwise a redirect would have
    // happend
    expect(history.location.pathname).toBe('/');
  });

  it('should not redirect when disabled', () => {
    const { getByText, history } = render(
      <Tag linkTo="/foo" isDisabled={true}>
        Bread
      </Tag>
    );

    getByText('Bread').click();

    // ensure the pathname is not "/foo", otherwise a redirect would have
    // happend
    expect(history.location.pathname).toBe('/');
  });
});
