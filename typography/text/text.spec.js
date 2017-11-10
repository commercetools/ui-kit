import React from 'react';
import { shallow } from 'enzyme';
import Text from './text';

describe('exports', () => {
  it('should export 4 components', () => {
    expect(Object.keys(Text)).toHaveLength(4);
  });
  it('should export <Headline> component', () => {
    expect(Text).toHaveProperty('Headline');
  });
  it('should export <Subheadline> component', () => {
    expect(Text).toHaveProperty('Subheadline');
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
    expect(wrapper).not.toContainClass('bold');
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
    expect(wrapper).not.toContainClass('bold');
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
      expect(wrapper).toContainClass('bold');
    });
    it('should render given text', () => {
      expect(wrapper.text()).toMatch('Subtitle');
    });
  });
});

describe('<Body>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Text.Body>{'Body'}</Text.Body>);
  });
  it('should render element tag p', () => {
    expect(wrapper.type()).toBe('p');
  });
  it('should not have "bold" class', () => {
    expect(wrapper).not.toContainClass('bold');
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
      expect(wrapper).toContainClass('bold');
    });
    it('should render given text', () => {
      expect(wrapper.text()).toMatch('Body');
    });
  });
});

describe('<Detail>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Text.Detail>{'Detail'}</Text.Detail>);
  });
  it('should render element tag small', () => {
    expect(wrapper.type()).toBe('small');
  });
  it('should not have "bold" class', () => {
    expect(wrapper).not.toContainClass('bold');
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
      expect(wrapper).toContainClass('bold');
    });
    it('should render given text', () => {
      expect(wrapper).toHaveText('Detail');
    });
  });

  describe('with tone', () => {
    beforeEach(() => {
      wrapper = shallow(<Text.Detail tone="secondary">{'Detail'}</Text.Detail>);
    });
    it('should render element tag small', () => {
      expect(wrapper.type()).toBe('small');
    });
    it('should have "bold" class', () => {
      expect(wrapper).toContainClass('secondary');
    });
    it('should render given text', () => {
      expect(wrapper).toHaveText('Detail');
    });
  });
});
