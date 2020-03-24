import React from 'react';
import { render } from '../../../../src/test-utils';
import Link from './link';

const createTestProps = (custom) => ({
  to: 'https://facebook.com',
  ...custom,
});

describe('rendering', () => {
  let props;
  describe('when rendering a default (react-router) link', () => {
    beforeEach(() => {
      props = createTestProps();
    });
    it('should render a react router link', () => {
      const { getByText } = render(<Link {...props}>Link</Link>);
      const link = getByText('Link');
      expect(link).toBeInTheDocument();
    });
  });
  describe('when rendering an external link', () => {
    beforeEach(() => {
      props = createTestProps({
        isExternal: true,
        to: 'https://www.kanyetothe.com/',
      });
    });
    it('should render a react router link', () => {
      const { getByText } = render(<Link {...props}>Link</Link>);
      const link = getByText('Link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveProperty('href', props.to);
    });
  });
});
