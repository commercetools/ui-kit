import React from 'react';
import { shallow } from 'enzyme';
import { FilterIcon } from '../../icons';
import { SecondaryIconButton } from './secondary-icon-button';

const createTestProps = custom => ({
  label: 'Accessible button',
  onClick: jest.fn(),
  icon: <FilterIcon />,

  // HoC
  isMouseOver: false,
  handleMouseOver: jest.fn(),
  handleMouseOut: jest.fn(),

  ...custom,
});

describe('rendering', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<SecondaryIconButton {...props} />);
  });

  it('outputs correct tree', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a <AccessibleButton>', () => {
    expect(wrapper).toRender('AccessibleButton');
  });

  it('should render the icon', () => {
    expect(wrapper).toRender('FilterIcon');
  });

  it('renders an icon with black theme', () => {
    expect(wrapper.find('FilterIcon')).toHaveProp('theme', 'black');
  });

  describe('if mouse is over', () => {
    beforeEach(() => {
      props = createTestProps({ isMouseOver: true });
      wrapper = shallow(<SecondaryIconButton {...props} />);
    });
    it('renders an icon with green theme', () => {
      expect(wrapper.find('FilterIcon')).toHaveProp('theme', 'green');
    });
  });

  describe('if disabled', () => {
    beforeEach(() => {
      props = createTestProps({ isDisabled: true });
      wrapper = shallow(<SecondaryIconButton {...props} />);
    });
    it('renders a <AccessibleButton> with disabled prop', () => {
      expect(wrapper.find('AccessibleButton')).toHaveProp('isDisabled', true);
    });
    it('renders an icon with grey theme', () => {
      expect(wrapper.find('FilterIcon')).toHaveProp('theme', 'grey');
    });
  });
});

describe('callbacks', () => {
  let wrapper;
  let props;
  describe('onClick', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<SecondaryIconButton {...props} />);
      wrapper.find('AccessibleButton').prop('onClick')();
    });

    it('should invoke onClick', () => {
      expect(props.onClick).toHaveBeenCalledTimes(1);
    });
  });
});
