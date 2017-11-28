import React from 'react';
import invariant from 'invariant';
import { shallow } from 'enzyme';
import Radio from './radio';

jest.mock('invariant');

const createOptionTestProps = custom => ({
  value: 'foo!',
  isDisabled: false,
  isChecked: false,
  name: 'bar',
  onClick: jest.fn(),
  ...custom,
});
const createGroupTestProps = custom => ({
  value: 'bar',
  name: 'bar',
  onChange: jest.fn(),
  ...custom,
});

describe('<Radio.Option>', () => {
  describe('rendering', () => {
    let props;
    let wrapper;
    describe('without children', () => {
      beforeEach(() => {
        props = createOptionTestProps();

        wrapper = shallow(<Radio.Option {...props} />);
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('with children', () => {
      beforeEach(() => {
        props = createOptionTestProps();

        wrapper = shallow(
          <Radio.Option {...props}>{'Some label'}</Radio.Option>
        );
      });

      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should render `Text.Detail`', () => {
        expect(wrapper).toRender('TextDetail');
      });
    });
  });

  describe('interacting', () => {
    let props;
    let wrapper;

    describe('handleChange', () => {
      beforeEach(() => {
        props = createOptionTestProps();

        wrapper = shallow(<Radio.Option {...props} />);

        wrapper.instance().handleChange();
      });

      it('should invoke `onClick`', () => {
        expect(props.onClick).toHaveBeenCalled();
      });

      it('should invoke `onClick` with the `value`', () => {
        expect(props.onClick).toHaveBeenCalledWith(props.value);
      });
    });
  });
});

describe('<Radio.Group>', () => {
  describe('rendering', () => {
    let props;
    let optionProps;
    let wrapper;

    beforeEach(() => {
      props = createGroupTestProps();
      optionProps = createOptionTestProps();

      wrapper = shallow(
        <Radio.Group {...props}>
          <Radio.Option {...optionProps} value="bar">
            {'foo'}
          </Radio.Option>
          <Radio.Option {...optionProps}>{'bar'}</Radio.Option>
        </Radio.Group>
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    describe('when `direction is `inline``', () => {
      beforeEach(() => {
        props = createGroupTestProps({ direction: 'inline' });
        optionProps = createOptionTestProps();

        wrapper = shallow(
          <Radio.Group {...props}>
            <Radio.Option {...optionProps} value="bar">
              {'foo'}
            </Radio.Option>
            <Radio.Option {...optionProps}>{'bar'}</Radio.Option>
          </Radio.Group>
        );

        it('should match snapshot', () => {
          expect(wrapper).toMatchSnapshot();
        });
      });
    });

    it('should render two `<Radio.Option>s', () => {
      expect(wrapper).toRenderElementTimes(Radio.Option, 2);
    });

    describe('<Radio.Option', () => {
      let optionWrapper;

      beforeEach(() => {
        optionWrapper = wrapper.find(Radio.Option).at(0);
      });

      it('should receive `name`', () => {
        expect(optionWrapper).toHaveProp('name', props.name);
      });

      it('should receive `onClick`', () => {
        expect(optionWrapper).toHaveProp(
          'onClick',
          wrapper.instance().handleChange
        );
      });

      describe('when value is selected', () => {
        it('should receive `isChecked` as `true`', () => {
          expect(wrapper.find(Radio.Option).at(0)).toHaveProp(
            'isChecked',
            true
          );
        });
      });

      describe('when value is not selected', () => {
        it('should receive `isChecked` as `false`', () => {
          expect(wrapper.find(Radio.Option).at(1)).toHaveProp(
            'isChecked',
            false
          );
        });
      });
    });
  });

  describe('interacting', () => {
    describe('handleChange', () => {
      const nextValue = 'baz';
      let props;
      let optionProps;
      let wrapper;

      beforeEach(() => {
        props = createGroupTestProps();
        optionProps = createOptionTestProps();

        wrapper = shallow(
          <Radio.Group {...props}>
            <Radio.Option {...optionProps}>{'bar'}</Radio.Option>
          </Radio.Group>
        );

        wrapper.instance().handleChange(nextValue);
      });

      it('should update the state of `value`', () => {
        expect(wrapper).toHaveState('value', nextValue);
      });
    });
  });

  describe('lifecycle', () => {
    describe('componentWillReceiveProps', () => {
      describe('when value changes', () => {
        let props;
        let nextProps;
        let optionProps;
        let wrapper;

        beforeEach(() => {
          props = createGroupTestProps();
          nextProps = createGroupTestProps({ value: 'barrr' });
          optionProps = createOptionTestProps();

          wrapper = shallow(
            <Radio.Group {...props}>
              <Radio.Option {...optionProps}>{'bar'}</Radio.Option>
            </Radio.Group>
          );

          wrapper.instance().componentWillReceiveProps(nextProps);
        });

        it('should update the state of `value`', () => {
          expect(wrapper).toHaveState('value', nextProps.value);
        });
      });
    });

    describe('componentWillMount', () => {
      describe('without any `<Radio.Option>`', () => {
        let props;

        beforeEach(() => {
          props = createGroupTestProps();

          shallow(
            <Radio.Group {...props}>
              <div />
            </Radio.Group>
          );
        });

        it('should invoke `invariant`', () => {
          expect(invariant).toHaveBeenCalled();
        });
      });
    });
  });
});
