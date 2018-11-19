import React from 'react';
import { shallow } from 'enzyme';
import Avatar, { Initials, GravatarImg } from './avatar';
import styles from './avatar.mod.css';

const createTestProps = customProps => ({
  firstName: '',
  lastName: '',
  gravatarHash: '20c9c1b252b46ab49d6f7a4cee9c3e68',
  isHighlighted: false,
  scale: 'l',
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
          <GravatarImg scale="s" hash="20c9c1b252b46ab49d6f7a4cee9c3e68" />
        );
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe('when large scale', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<Avatar {...props} />);
    });

    it('should contain style for large scale', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('when medium scale', () => {
    beforeEach(() => {
      props = createTestProps({ scale: 'm' });
      wrapper = shallow(<Avatar {...props} />);
    });
    it('should contain style for medium scale', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('when small scale', () => {
    beforeEach(() => {
      props = createTestProps({ scale: 's' });
      wrapper = shallow(<Avatar {...props} />);
    });
    it('should contain style for small scale', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('when highlighted', () => {
    beforeEach(() => {
      props = createTestProps({ isHighlighted: true });
      wrapper = shallow(<Avatar {...props} />);
    });
    it('should contain style for highligting component', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
