import React from 'react';
import { shallow } from 'enzyme';
import Avatar, { Initials, GravatarImg } from './avatar';
import styles from './avatar.mod.css';

const createTestProps = customProps => ({
  firstName: '',
  lastName: '',
  gravatarHash: '20c9c1b252b46ab49d6f7a4cee9c3e68',
  isHighlighted: false,
  size: 'l',
  ...customProps,
});

describe('render', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<Avatar {...props} />);
  });

  it('should have base style', () => {
    expect(wrapper).toHaveClassName(styles['avatar-base']);
  });

  it('should render <GravatarImg>', () => {
    expect(wrapper).toRender(GravatarImg);
  });

  it('should render <Initials>', () => {
    expect(wrapper).toRender(Initials);
  });

  describe('<GravatarImg />', () => {
    describe('with regular email', () => {
      beforeEach(() => {
        wrapper = shallow(
          <GravatarImg size="s" hash="20c9c1b252b46ab49d6f7a4cee9c3e68" />
        );
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe('when large size', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<Avatar {...props} />);
    });

    it('should contain style for large size', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('when medium size', () => {
    beforeEach(() => {
      props = createTestProps({ size: 'm' });
      wrapper = shallow(<Avatar {...props} />);
    });
    it('should contain style for medium size', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('when small size', () => {
    beforeEach(() => {
      props = createTestProps({ size: 's' });
      wrapper = shallow(<Avatar {...props} />);
    });
    it('should contain style for small size', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('when highlighted', () => {
    beforeEach(() => {
      props = createTestProps({ isHighlighted: true });
      wrapper = shallow(<Avatar {...props} />);
    });
    it('should contain style for small size', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
