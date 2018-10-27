import React from 'react';
import { generateImage } from 'jsdom-screenshot';
import { render } from 'react-testing-library';
import { PrimaryButton } from 'ui-kit';

it('has no visual regressions', async () => {
  render(<PrimaryButton label="Submit" onClick={() => {}} />);
  expect(
    await generateImage({
      launch: {
        args: ['--no-sandbox'],
      },
    })
  ).toMatchImageSnapshot();
});
