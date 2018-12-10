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
      <Text.Headline elementType="h1" title="tooltip text">
        {'Title'}
      </Text.Headline>
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
  it('should has `title` prop', () => {
    expect(wrapper).toHaveProp('title', 'tooltip text');
  });

  describe('with truncated text', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Text.Headline elementType="h1" truncate={true}>
          {'Title'}
        </Text.Headline>
      );
    });
    it('should contain `truncate` class', () => {
      expect(wrapper).toContainClass(styles.truncate);
    });
  });

  describe('with dataTest', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Text.Headline elementType="h1" truncate={true} dataTest="prop-test">
          {'Title'}
        </Text.Headline>
      );
    });
    it('should contain `data-test` prop', () => {
      expect(wrapper).toHaveProp('data-test', 'prop-test');
    });
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
        <Text.Subheadline
          elementType="h4"
          isBold={true}
          tone="primary"
          title="tooltip text"
        >
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
    it('should has `title` prop', () => {
      expect(wrapper).toHaveProp('title', 'tooltip text');
    });
  });

  describe('with truncated text', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Text.Subheadline
          elementType="h4"
          isBold={true}
          tone="primary"
          truncate={true}
        >
          {'Subtitle'}
        </Text.Subheadline>
      );
    });
    it('should contain `truncate` class', () => {
      expect(wrapper).toContainClass(styles.truncate);
    });
  });

  describe('with dataTest', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Text.Subheadline
          elementType="h4"
          isBold={true}
          tone="primary"
          title="tooltip text"
          dataTest="prop-test"
        >
          {'Subtitle'}
        </Text.Subheadline>
      );
    });
    it('should contain `data-test` prop', () => {
      expect(wrapper).toHaveProp('data-test', 'prop-test');
    });
  });
});

describe('<Wrap>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Text.Wrap title={'tooltip text'}>{'Title'}</Text.Wrap>);
  });
  it('should have "wrap" class', () => {
    expect(wrapper).toContainClass(styles.wrap);
  });
  it('should render given text', () => {
    expect(wrapper.text()).toMatch('Title');
  });
  it('should has `title` prop', () => {
    expect(wrapper).toHaveProp('title', 'tooltip text');
  });
});

describe('<Body>', () => {
  let wrapper;
  describe('when used as block text', () => {
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
    describe('with italic text', () => {
      beforeEach(() => {
        wrapper = shallow(<Text.Body isItalic={true}>{'Body'}</Text.Body>);
      });
      it('should render element tag p', () => {
        expect(wrapper.type()).toBe('p');
      });
      it('should have "italic" class', () => {
        expect(wrapper).toContainClass(styles.italic);
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
    describe('with title', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Text.Body title="tooltip text">{'Detail'}</Text.Body>
        );
      });
      it('should has `title` prop', () => {
        expect(wrapper).toHaveProp('title', 'tooltip text');
      });
    });
    describe('with truncated text', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Text.Body tone="secondary" truncate={true}>
            {'Detail'}
          </Text.Body>
        );
      });
      it('should contain `truncate` class', () => {
        expect(wrapper).toContainClass(styles.truncate);
      });
    });
  });

  describe('when used as inline text', () => {
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
  describe('with dataTest', () => {
    beforeEach(() => {
      wrapper = shallow(<Text.Body dataTest="prop-test">{'Body'}</Text.Body>);
    });
    it('should contain `data-test` prop', () => {
      expect(wrapper).toHaveProp('data-test', 'prop-test');
    });
  });
});

describe('<Detail>', () => {
  let wrapper;
  describe('when used as block text', () => {
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
    describe('with italic text', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Text.Detail isItalic={true}>{'Detail'}</Text.Detail>
        );
      });
      it('should render element tag small', () => {
        expect(wrapper.type()).toBe('small');
      });
      it('should have "italic" class', () => {
        expect(wrapper).toContainClass(styles.italic);
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
    beforeEach(() => {
      wrapper = shallow(<Text.Detail isInline={true}>{'Detail'}</Text.Detail>);
    });
    it('should render element tag small', () => {
      expect(wrapper.type()).toBe('small');
    });
    it('should not have "bold" class', () => {
      expect(wrapper).not.toContainClass(styles.bold);
    });
    it('should have "inline-text" class', () => {
      expect(wrapper).toContainClass(styles['inline-text']);
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
      it('should have "inline-text" class', () => {
        expect(wrapper).toContainClass(styles['inline-text']);
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
      it('should have "inline-text" class', () => {
        expect(wrapper).toContainClass(styles['inline-text']);
      });
      it('should render given text', () => {
        expect(wrapper).toHaveText('Detail');
      });
    });

    describe('with title', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Text.Detail isInline={true} title="tooltip text">
            {'Detail'}
          </Text.Detail>
        );
      });
      it('should has `title` prop', () => {
        expect(wrapper).toHaveProp('title', 'tooltip text');
      });
    });

    describe('with truncated text', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Text.Detail isInline={true} tone="secondary" truncate={true}>
            {'Detail'}
          </Text.Detail>
        );
      });
      it('should contain `truncate` class', () => {
        expect(wrapper).toContainClass(styles.truncate);
      });
    });
  });
  describe('with dataTest', () => {
    beforeEach(() => {
      wrapper = shallow(<Text.Body dataTest="prop-test">{'Body'}</Text.Body>);
    });
    it('should contain `data-test` prop', () => {
      expect(wrapper).toHaveProp('data-test', 'prop-test');
    });
  });
});
