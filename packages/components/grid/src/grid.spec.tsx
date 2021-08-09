import { render } from '../../../../test/test-utils';
import Grid from './grid';

describe('data-attributes', () => {
  it('should pass data-attributes all way to the DOM', () => {
    const { container } = render(
      <Grid data-foo="bar">
        <Grid.Item />
        <Grid.Item />
      </Grid>
    );
    expect(container.querySelector("[data-foo='bar']")).toBeInTheDocument();
  });
});
