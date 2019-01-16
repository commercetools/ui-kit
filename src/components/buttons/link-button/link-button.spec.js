import React from 'react';
import { shallow } from 'enzyme';
import Text from '../../typography/text';
import { PlusThinIcon } from '../../icons';
import LinkButton from './link-button';

const createTestProps = props => ({
  label: 'Accessibility text',
  to: '/foo/bar',
  iconLeft: <PlusThinIcon size="medium" />,
  isDisabled: false,
  ...props,
});

const createEvent = props => ({
  preventDefault: jest.fn(),
  ...props,
});

describe('rendering', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<LinkButton {...props} />);
  });

  it('outputs correct tree', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Link>', () => {
    expect(wrapper).toRender('Link');
  });

  describe('onClick', () => {
    const testEvent = createEvent();
    beforeEach(() => {
      wrapper.find('Link').simulate('click', testEvent);
    });
    it('should have undefined onClick prop', () => {
      expect(wrapper.find('Link')).toHaveProp('onClick', undefined);
    });
    it('when `onClick` is fired, event default is not prevented', () => {
      expect(testEvent.preventDefault).not.toHaveBeenCalled();
    });
  });

  it('should pass the url to <Link>', () => {
    expect(wrapper.find('Link')).toHaveProp('to', '/foo/bar');
  });

  it('should render a <Text.Body>', () => {
    expect(
      wrapper.containsMatchingElement(
        <Text.Body>{'Accessibility text'}</Text.Body>
      )
    ).toBe(true);
  });

  it('should render the icon', () => {
    expect(wrapper).toRender(PlusThinIcon);
  });

  describe('with data-* props', () => {
    beforeEach(() => {
      props = createTestProps({
        'data-track-component': 'LinkButton',
        'data-track-label': 'LinkButton',
        'data-track-event': 'click',
        'data-test': 'link-button',
      });
      wrapper = shallow(<LinkButton {...props} />);
    });
    it('should apply given `data-track-component` to LinkButton', () => {
      expect(wrapper.find('Link')).toHaveProp(
        'data-track-component',
        expect.stringMatching('LinkButton')
      );
    });

    it('should apply given `data-track-event` to AccessibleButton', () => {
      expect(wrapper.find('Link')).toHaveProp(
        'data-track-event',
        expect.stringMatching('click')
      );
    });
    it('should apply given `data-track-label` to AccessibleButton', () => {
      expect(wrapper.find('Link')).toHaveProp(
        'data-track-label',
        expect.stringMatching('LinkButton')
      );
    });
    it('should apply given `data-test` to AccessibleButton', () => {
      expect(wrapper.find('Link')).toHaveProp(
        'data-test',
        expect.stringMatching('link-button')
      );
    });
  });

  describe('without data-* props', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<LinkButton {...props} />);
    });
    it('should apply default `data-track-component` to LinkButton', () => {
      expect(wrapper.find('Link')).toHaveProp(
        'data-track-component',
        expect.stringMatching('LinkButton')
      );
    });
  });

  describe('if disabled', () => {
    beforeEach(() => {
      props = createTestProps({ isDisabled: true });
      wrapper = shallow(<LinkButton {...props} />);
    });
    it('renders a <Link> with disabled class', () => {
      expect(wrapper.find('Link')).toHaveClassName('disabled');
    });

    describe('onClick', () => {
      const testEvent = createEvent();
      beforeEach(() => {
        wrapper.find('Link').simulate('click', testEvent);
      });
      it('renders with a onClick prop', () => {
        expect(wrapper.find('Link')).toHaveProp('onClick');
      });
      it('when `onClick` is fired, event default is prevented', () => {
        expect(testEvent.preventDefault).toHaveBeenCalled();
      });
    });

    it('renders the icon with "grey" theme', () => {
      expect(wrapper.find(PlusThinIcon)).toHaveProp('theme', 'grey');
    });
  });
});
