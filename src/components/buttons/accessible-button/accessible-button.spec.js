import React from 'react';
import { shallow } from 'enzyme';
import AccessibleButton from './accessible-button';

const createProps = custom => ({
  label: '',
  onClick: () => {},
  children: <div />,
  className: '',
  ...custom,
});

describe('rendering', () => {
  describe('button', () => {
    let props;
    let wrapper;
    beforeEach(() => {
      props = createProps({ className: 'foo' });
      wrapper = shallow(<AccessibleButton {...props} />);
    });
    it('should render a <button/> tag', () => {
      expect(wrapper).toRender('button');
    });
    it('should apply the className prop to the button', () => {
      expect(wrapper.find('button')).toContainClass(props.className);
    });
    it('should have the type button', () => {
      expect(wrapper.find('button').prop('type')).toBe('button');
    });
    it('should have no aria-pressed attribute', () => {
      expect(wrapper.find('button').prop('aria-pressed')).toBeUndefined();
    });
    it('should add the button class to the button', () => {
      expect(wrapper.find('button')).toContainClass('button');
    });
  });
  describe('label', () => {
    const props = createProps({ label: 'Login' });
    const wrapper = shallow(<AccessibleButton {...props} />);
    it('set the aria-label attribute of the button to the label', () => {
      expect(wrapper.find('button').prop('aria-label')).toBe('Login');
    });
  });
  describe('as a toggle button', () => {
    describe('when setting the button as active', () => {
      const props = createProps({ isToggleButton: true, isToggled: true });
      const wrapper = shallow(<AccessibleButton {...props} />);
      it('should set the aria-pressed attribute to true', () => {
        expect(wrapper.find('button').prop('aria-pressed')).toBe(true);
      });
    });
    describe('when setting the button as not active', () => {
      const props = createProps({ isToggleButton: true, isToggled: false });
      const wrapper = shallow(<AccessibleButton {...props} />);
      it('should set the aria-pressed attribute to false', () => {
        expect(wrapper.find('button').prop('aria-pressed')).toBe(false);
      });
    });
  });
  describe('setting the button as disabled', () => {
    const props = createProps({ isDisabled: true });
    const wrapper = shallow(<AccessibleButton {...props} />);
    it('should set the aria-disabled attribute to true', () => {
      expect(wrapper.find('button').prop('aria-disabled')).toBe(true);
    });
    it('should set the disabled attribute on the button', () => {
      expect(wrapper.find('button').prop('disabled')).toBe(true);
    });
    it('should add the disabled class to the button', () => {
      expect(wrapper.find('button')).toContainClass('disabled');
    });
  });
  describe('children', () => {
    const props = createProps({ children: <div className="foo" /> });
    const wrapper = shallow(<AccessibleButton {...props} />);
    it('should render children', () => {
      expect(wrapper.find('button').contains(<div className="foo" />)).toBe(
        true
      );
    });
  });
});

describe('interaction', () => {
  describe('clicking the button', () => {
    const props = createProps({ onClick: jest.fn() });
    const wrapper = shallow(<AccessibleButton {...props} />);
    wrapper.find('button').simulate('click');
    it('should call the onClick callback', () => {
      expect(props.onClick).toHaveBeenCalledTimes(1);
    });
  });
});
