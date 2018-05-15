import React from 'react';
import { shallow } from 'enzyme';
import styles from './text.mod.css';
import Text from './text';

describe('exports', () => {
  it('should export 5 components', () => {
    expect(Object.keys(Text)).toHaveLength(5);
  });
  it('should export <Headline> component', () => {
    expect(Text).toHaveProperty('Headline');
  });
  it('should export <Subheadline> component', () => {
    expect(Text).toHaveProperty('Subheadline');
  });
  it('should export <Wrap> component', () => {
    expect(Text).toHaveProperty('Wrap');
  });
  it('should export <Body> component', () => {
    expect(Text).toHaveProperty('Body');
  });
  it('should export <Detail> component', () => {
    expect(Text).toHaveProperty('Detail');
  });
});

describe('<Headline>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Text.Headline elementType="h1">{'Title'}</Text.Headline>
    );
  });
  it('should render element tag h1', () => {
    expect(wrapper.type()).toBe('h1');
  });
  it('should not have "bold" class', () => {
    expect(wrapper).not.toContainClass(styles.bold);
  });
  it('should render given text', () => {
    expect(wrapper.text()).toMatch('Title');
  });
});

describe('<Subheadline>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Text.Subheadline elementType="h4">{'Subtitle'}</Text.Subheadline>
    );
  });
  it('should render element tag h4', () => {
    expect(wrapper.type()).toBe('h4');
  });
  it('should not have "bold" class', () => {
    expect(wrapper).not.toContainClass(styles.bold);
  });
  it('should render given text', () => {
    expect(wrapper.text()).toMatch('Subtitle');
  });
  describe('with bold text', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Text.Subheadline elementType="h4" isBold={true}>
          {'Subtitle'}
        </Text.Subheadline>
      );
    });
    it('should render element tag h4', () => {
      expect(wrapper.type()).toBe('h4');
    });
    it('should have "bold" class', () => {
      expect(wrapper).toContainClass(styles.bold);
    });
    it('should render given text', () => {
      expect(wrapper.text()).toMatch('Subtitle');
    });
  });
  describe('with tone', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Text.Subheadline elementType="h4" isBold={true} tone="primary">
          {'Subtitle'}
        </Text.Subheadline>
      );
    });
    it('should render element tag h4', () => {
      expect(wrapper.type()).toBe('h4');
    });
    it('should have "bold" class', () => {
      expect(wrapper).toContainClass(styles.bold);
    });
    it('should render given text', () => {
      expect(wrapper.text()).toMatch('Subtitle');
    });
    it('should have "primary" class', () => {
      expect(wrapper).toContainClass(styles.primary);
    });
  });
});

describe('<Wrap>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Text.Wrap>{'Title'}</Text.Wrap>);
  });
  it('should have "wrap" class', () => {
    expect(wrapper).toContainClass(styles.wrap);
  });
  it('should render given text', () => {
    expect(wrapper.text()).toMatch('Title');
  });
});

describe('<Body>', () => {
  describe('when used as block text', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Text.Body>{'Body'}</Text.Body>);
    });
    it('should render element tag p', () => {
      expect(wrapper.type()).toBe('p');
    });
    it('should not have "bold" class', () => {
      expect(wrapper).not.toContainClass(styles.bold);
    });
    it('should render given text', () => {
      expect(wrapper.text()).toMatch('Body');
    });
    describe('with bold text', () => {
      beforeEach(() => {
        wrapper = shallow(<Text.Body isBold={true}>{'Body'}</Text.Body>);
      });
      it('should render element tag p', () => {
        expect(wrapper.type()).toBe('p');
      });
      it('should have "bold" class', () => {
        expect(wrapper).toContainClass(styles.bold);
      });
      it('should render given text', () => {
        expect(wrapper.text()).toMatch('Body');
      });
    });
    describe('with tone', () => {
      beforeEach(() => {
        wrapper = shallow(<Text.Body tone="secondary">{'Detail'}</Text.Body>);
      });
      it('should render element tag p', () => {
        expect(wrapper.type()).toBe('p');
      });
      it('should have "secondary" class', () => {
        expect(wrapper).toContainClass(styles.secondary);
      });
      it('should render given text', () => {
        expect(wrapper).toHaveText('Detail');
      });
    });
  });

  describe('when used as inline text', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Text.Body isInline={true}>{'Body'}</Text.Body>);
    });
    it('should render element tag span', () => {
      expect(wrapper.type()).toBe('span');
    });
    it('should not have "bold" class', () => {
      expect(wrapper).not.toContainClass(styles.bold);
    });
    it('should render given text', () => {
      expect(wrapper.text()).toMatch('Body');
    });
    describe('with bold text', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Text.Body isInline={true} isBold={true}>
            {'Body'}
          </Text.Body>
        );
      });
      it('should render element tag span', () => {
        expect(wrapper.type()).toBe('span');
      });
      it('should have "bold" class', () => {
        expect(wrapper).toContainClass(styles.bold);
      });
      it('should render given text', () => {
        expect(wrapper.text()).toMatch('Body');
      });
    });
    describe('with tone', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Text.Body isInline={true} tone="secondary">
            {'Detail'}
          </Text.Body>
        );
      });
      it('should render element tag span', () => {
        expect(wrapper.type()).toBe('span');
      });
      it('should have "secondary" class', () => {
        expect(wrapper).toContainClass(styles.secondary);
      });
      it('should render given text', () => {
        expect(wrapper).toHaveText('Detail');
      });
    });
  });
});

describe('<Detail>', () => {
  describe('when used as block text', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Text.Detail>{'Detail'}</Text.Detail>);
    });
    it('should render element tag small', () => {
      expect(wrapper.type()).toBe('small');
    });
    it('should not have "bold" class', () => {
      expect(wrapper).not.toContainClass(styles.bold);
    });
    it('should render given text', () => {
      expect(wrapper.text()).toMatch('Detail');
    });
    describe('with bold text', () => {
      beforeEach(() => {
        wrapper = shallow(<Text.Detail isBold={true}>{'Detail'}</Text.Detail>);
      });
      it('should render element tag small', () => {
        expect(wrapper.type()).toBe('small');
      });
      it('should have "bold" class', () => {
        expect(wrapper).toContainClass(styles.bold);
      });
      it('should render given text', () => {
        expect(wrapper).toHaveText('Detail');
      });
    });

    describe('with tone', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Text.Detail tone="secondary">{'Detail'}</Text.Detail>
        );
      });
      it('should render element tag small', () => {
        expect(wrapper.type()).toBe('small');
      });
      it('should have "secondary" class', () => {
        expect(wrapper).toContainClass(styles.secondary);
      });
      it('should render given text', () => {
        expect(wrapper).toHaveText('Detail');
      });
    });
  });
  describe('when used as inline text', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Text.Detail isInline={true}>{'Detail'}</Text.Detail>);
    });
    it('should render element tag small', () => {
      expect(wrapper.type()).toBe('small');
    });
    it('should not have "bold" class', () => {
      expect(wrapper).not.toContainClass(styles.bold);
    });
    it('should have "inline" class', () => {
      expect(wrapper).toContainClass(styles.inline);
    });
    it('should render given text', () => {
      expect(wrapper.text()).toMatch('Detail');
    });
    describe('with bold text', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Text.Detail isInline={true} isBold={true}>
            {'Detail'}
          </Text.Detail>
        );
      });
      it('should render element tag small', () => {
        expect(wrapper.type()).toBe('small');
      });
      it('should have "bold" class', () => {
        expect(wrapper).toContainClass(styles.bold);
      });
      it('should have "inline" class', () => {
        expect(wrapper).toContainClass(styles.inline);
      });
      it('should render given text', () => {
        expect(wrapper).toHaveText('Detail');
      });
    });

    describe('with tone', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Text.Detail isInline={true} tone="secondary">
            {'Detail'}
          </Text.Detail>
        );
      });
      it('should render element tag small', () => {
        expect(wrapper.type()).toBe('small');
      });
      it('should have "secondary" class', () => {
        expect(wrapper).toContainClass(styles.secondary);
      });
      it('should have "inline" class', () => {
        expect(wrapper).toContainClass(styles.inline);
      });
      it('should render given text', () => {
        expect(wrapper).toHaveText('Detail');
      });
    });
  });
});
