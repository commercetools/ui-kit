import React from 'react';
import { shallow } from 'enzyme';
import Text from '../../typography/text';
import { AddIcon } from '../../icons';
import { FlatButton } from './flat-button';

const createTestProps = props => ({
  tone: 'primary',
  label: 'Accessibility text',
  onClick: jest.fn(),
  icon: <AddIcon size="medium" />,
  isDisabled: false,

  isMouseOver: false,
  handleMouseOver: jest.fn(),
  handleMouseOut: jest.fn(),

  ...props,
});

describe('rendering', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<FlatButton {...props} />);
  });

  it('outputs correct tree', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <AccessibleButton>', () => {
    expect(wrapper).toRender('AccessibleButton');
  });

  it('should pass the button tone to <AccessibleButton>', () => {
    expect(wrapper.find('AccessibleButton')).toHaveClassName(props.tone);
  });

  it('should render a <Text.Body>', () => {
    expect(
      wrapper.containsMatchingElement(
        <Text.Body>{'Accessibility text'}</Text.Body>
      )
    ).toBe(true);
  });

  it('should render the icon', () => {
    expect(wrapper).toRender(AddIcon);
  });

  describe('icon position', () => {
    describe('default position (left)', () => {
      it('should render the icon left to the text', () => {
        /* eslint-disable react/jsx-key */
        expect(
          wrapper.containsMatchingElement([
            <AddIcon size="medium" />,
            <Text.Body>{'Accessibility text'}</Text.Body>,
          ])
        ).toBe(true);
        /* eslint-enable react/jsx-key */
      });
    });
    describe('default position (right)', () => {
      beforeEach(() => {
        props = createTestProps({ iconPosition: 'right' });
        wrapper = shallow(<FlatButton {...props} />);
      });
      it('should render the icon right to the text', () => {
        /* eslint-disable react/jsx-key */
        expect(
          wrapper.containsMatchingElement([
            <Text.Body>{'Accessibility text'}</Text.Body>,
            <AddIcon size="medium" />,
          ])
        ).toBe(true);
        /* eslint-enable react/jsx-key */
      });
    });
  });

  describe('if disabled', () => {
    beforeEach(() => {
      props = createTestProps({ isDisabled: true });
      wrapper = shallow(<FlatButton {...props} />);
    });
    it('renders a <AccessibleButton> with disabled class', () => {
      expect(wrapper.find('AccessibleButton')).toHaveClassName('disabled');
    });
    it('renders a <AccessibleButton> with disabled prop', () => {
      expect(wrapper.find('AccessibleButton')).toHaveProp('isDisabled', true);
    });
  });
});

describe('callbacks', () => {
  let wrapper;
  let props;
  describe('onClick', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<FlatButton {...props} />);
      wrapper.find('AccessibleButton').prop('onClick')();
    });

    it('should invoke onClick', () => {
      expect(props.onClick).toHaveBeenCalledTimes(1);
    });
  });
});
