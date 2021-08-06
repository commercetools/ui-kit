import { render, screen } from '../../../../test/test-utils';
import AccessibleHidden from './accessible-hidden';

it('should find text inside AccessibleHidden', () => {
  render(<AccessibleHidden>Spies!</AccessibleHidden>);

  expect(screen.getByText('Spies!')).toBeInTheDocument();
});

it('should find the input of a label inside AccessibleHidden', () => {
  render(
    <>
      <AccessibleHidden>
        <label htmlFor="maiden-name-input">Enter your Maiden Name</label>
      </AccessibleHidden>
      <input id="maiden-name-input" type="text"></input>
    </>
  );

  expect(screen.getByLabelText('Enter your Maiden Name')).toBeInTheDocument();
});
