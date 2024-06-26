import { screen, render } from '../../../../test/test-utils';
import Tag from './tag';

it('should render text as children', () => {
  render(<Tag>Bread</Tag>);
  expect(screen.getByText('Bread')).toBeInTheDocument();
});

it('should render multiple text children', () => {
  render(
    <Tag>
      <span>Bread</span>
      <span>Peanut Butter</span>
      <span>Honey</span>
    </Tag>
  );
  expect(screen.getByText('Bread')).toBeInTheDocument();
  expect(screen.getByText('Peanut Butter')).toBeInTheDocument();
  expect(screen.getByText('Honey')).toBeInTheDocument();
});

it('should render html markup as children', () => {
  const error = jest.spyOn(console, 'error').mockImplementation(() => {});
  render(
    <Tag>
      <div>👋</div>
    </Tag>
  );

  // ensure is renders correctly without validateDOMNesting warning
  expect(screen.getByText('👋')).toBeInTheDocument();
  expect(error).not.toHaveBeenCalled();
});

it('should call onClick when clicked', () => {
  const onClick = jest.fn();
  render(<Tag onClick={onClick}>Bread</Tag>);
  screen.getByText('Bread').click();
  expect(onClick).toHaveBeenCalledTimes(1);
});

it('should call onRemove when remove icon is clicked', () => {
  const onRemove = jest.fn();
  render(<Tag onRemove={onRemove}>Bread</Tag>);
  screen.getByLabelText('Remove').click();
  expect(onRemove).toHaveBeenCalledTimes(1);
});

it('should call the right handler when onClick and onRemove are provided', () => {
  const onClick = jest.fn();
  const onRemove = jest.fn();
  render(
    <Tag onRemove={onRemove} onClick={onClick}>
      Bread
    </Tag>
  );

  // clicking the Tag
  screen.getByText('Bread').click();
  expect(onClick).toHaveBeenCalledTimes(1);
  expect(onRemove).not.toHaveBeenCalled();

  // clicking the remove button
  screen.getByLabelText('Remove').click();
  expect(onRemove).toHaveBeenCalledTimes(1);
  expect(onClick).toHaveBeenCalledTimes(1);
});

describe('when disabled', () => {
  it('should not call onClick when clicked', () => {
    const onClick = jest.fn();
    render(
      <Tag onClick={onClick} isDisabled={true}>
        Bread
      </Tag>
    );
    screen.getByText('Bread').click();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should not render the remove icon', () => {
    const onRemove = jest.fn();
    render(
      <Tag onRemove={onRemove} isDisabled={true}>
        Bread
      </Tag>
    );
    const removeIcon = screen.queryByLabelText('Remove');
    expect(removeIcon).not.toBeInTheDocument();
  });
});

describe('when draggable', () => {
  it('should render drag icon', () => {
    render(<Tag isDraggable>Bread</Tag>);
    expect(screen.getByTestId('drag-icon')).toBeInTheDocument();
  });
  it('should not render drag icon when disabled', () => {
    render(
      <Tag isDraggable isDisabled>
        Bread
      </Tag>
    );
    expect(screen.queryByTestId('drag-icon')).not.toBeInTheDocument();
  });
});

describe('when `to` is set', () => {
  it('should redirect when clicked', () => {
    const { history } = render(<Tag to="/foo">Bread</Tag>);
    screen.getByText('Bread').click();

    expect(history.location.pathname).toBe('/foo');
  });

  it('should still call onClick when clicked', () => {
    const onClick = jest.fn();
    const { history } = render(
      <Tag onClick={onClick} to="/foo">
        Bread
      </Tag>
    );
    screen.getByText('Bread').click();
    expect(onClick).toHaveBeenCalled();
    expect(history.location.pathname).toBe('/foo');
  });

  it('should redirect on link click if text children proceed it', () => {
    const { history } = render(
      <Tag>
        <span>Bread</span>
        <span>Peanut Butter</span>
        <span onClick={() => history.push('/honey')}>Honey</span>
      </Tag>
    );

    expect(screen.getByText('Bread')).toBeInTheDocument();
    expect(screen.getByText('Peanut Butter')).toBeInTheDocument();
    expect(screen.getByText('Honey')).toBeInTheDocument();

    screen.getByText('Honey').click();
    expect(history.location.pathname).toBe('/honey');
  });

  it('should not redirect when removed', () => {
    const onRemove = jest.fn();
    const { history } = render(
      <Tag onRemove={onRemove} to="/foo">
        Bread
      </Tag>
    );

    screen.getByLabelText('Remove').click();

    // ensure "onRemove" is stil called
    expect(onRemove).toHaveBeenCalled();

    // ensure the pathname is not "/foo", otherwise a redirect would have
    // happened
    expect(history.location.pathname).toBe('/');
  });

  it('should not redirect when disabled', () => {
    const { history } = render(
      <Tag to="/foo" isDisabled={true}>
        Bread
      </Tag>
    );

    screen.getByText('Bread').click();

    // ensure the pathname is not "/foo", otherwise a redirect would have
    // happened
    expect(history.location.pathname).toBe('/');
  });
});
