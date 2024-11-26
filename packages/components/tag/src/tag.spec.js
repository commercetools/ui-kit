import { screen, render } from '../../../../test/test-utils';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
    render(
      <Routes>
        <Route path="/" element={<Tag to="/foo">Bread</Tag>} />
        <Route path="/foo" element={<div>Redirected to Foo</div>} />
      </Routes>,
      { route: '/' }
    );

    screen.getByText('Bread').click();
    expect(screen.getByText('Redirected to Foo')).toBeInTheDocument(); // Assert on UI
  });

  it('should still call onClick when clicked', () => {
    const onClick = jest.fn();

    render(
      <Routes>
        <Route
          path="/"
          element={
            <Tag onClick={onClick} to="/foo">
              Bread
            </Tag>
          }
        />
        <Route path="/foo" element={<div>Redirected to Foo</div>} />
      </Routes>,
      { route: '/' }
    );

    screen.getByText('Bread').click();
    expect(onClick).toHaveBeenCalled(); // Assert click handler was called
    expect(screen.getByText('Redirected to Foo')).toBeInTheDocument(); // Assert redirect
  });

  it('should redirect on link click if text children proceed it', () => {
    const TagWithNavigation = () => {
      const navigate = useNavigate();

      return <span onClick={() => navigate('/honey')}>Honey</span>;
    };
    render(
      <Routes>
        <Route
          path="/"
          element={
            <Tag>
              <span>Bread</span>
              <span>Peanut Butter</span>
              <TagWithNavigation />
            </Tag>
          }
        />
        <Route path="/honey" element={<div>Redirected to Honey</div>} />
      </Routes>,
      { route: '/' }
    );

    expect(screen.getByText('Bread')).toBeInTheDocument();
    expect(screen.getByText('Peanut Butter')).toBeInTheDocument();
    expect(screen.getByText('Honey')).toBeInTheDocument();

    screen.getByText('Honey').click();
    expect(screen.getByText('Redirected to Honey')).toBeInTheDocument(); // Assert redirect
  });

  it('should not redirect when removed', () => {
    const onRemove = jest.fn();

    render(
      <Routes>
        <Route
          path="/"
          element={
            <Tag onRemove={onRemove} to="/foo">
              Bread
            </Tag>
          }
        />
        <Route path="/foo" element={<div>Redirected to Foo</div>} />
      </Routes>,
      { route: '/' }
    );

    screen.getByLabelText('Remove').click();

    // Ensure "onRemove" is still called
    expect(onRemove).toHaveBeenCalled();

    // Ensure no redirect occurred by checking the current content
    expect(screen.queryByText('Redirected to Foo')).not.toBeInTheDocument();
  });

  it('should not redirect when disabled', () => {
    render(
      <Routes>
        <Route
          path="/"
          element={
            <Tag to="/foo" isDisabled={true}>
              Bread
            </Tag>
          }
        />
        <Route path="/foo" element={<div>Redirected to Foo</div>} />
      </Routes>,
      { route: '/' }
    );

    screen.getByText('Bread').click();

    // ensure there is not text with `Redirected to Foo`, otherwise a redirect would have
    // happened
    expect(screen.queryByText('Redirected to Foo')).not.toBeInTheDocument();
  });
});
