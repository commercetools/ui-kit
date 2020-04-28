import React from 'react';
import { render } from '../../../../test/test-utils';
import AccessibleHidden from './accessible-hidden';

it('should find text inside AccessibleHidden', () => {
  const rendered = render(<AccessibleHidden>Spies!</AccessibleHidden>);

  expect(rendered.getByText('Spies!')).toBeInTheDocument();
});

it('should find the input of a label inside AccessibleHidden', () => {
  const rendered = render(
    <>
      <AccessibleHidden>
        <label htmlFor="maiden-name-input">Enter your Maiden Name</label>
      </AccessibleHidden>
      <input id="maiden-name-input" type="text"></input>
    </>
  );

  expect(rendered.getByLabelText('Enter your Maiden Name')).toBeInTheDocument();
});
