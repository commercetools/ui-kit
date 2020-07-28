import React from 'react';
import { screen, render } from '../../../../test/test-utils';
import Link from './link';

const createTestProps = (custom) => ({
  to: 'https://facebook.com',
  ...custom,
});

const intlMessage = { id: 'link', defaultMessage: 'Link' };

describe('rendering', () => {
  let props;
  describe('when rendering a default (react-router) link', () => {
    beforeEach(() => {
      props = createTestProps();
    });
    it('should render a react router link', () => {
      render(<Link {...props}>Link</Link>);
      const link = screen.getByText('Link');
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
      render(<Link {...props}>Link</Link>);
      const link = screen.getByText('Link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveProperty('href', props.to);
    });
  });
  describe('when rendering a translated link', () => {
    beforeEach(() => {
      props = createTestProps({
        isExternal: true,
        to: 'https://www.omg.com/',
        intlMessage,
      });
    });
    it('should render link with react-intl', () => {
      render(<Link {...props} />);
      const link = screen.getByText('Link');
      expect(link).toBeInTheDocument();
    });
  });
});
