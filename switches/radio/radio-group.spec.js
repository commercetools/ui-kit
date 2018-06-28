import React from 'react';
import invariant from 'invariant';
import { shallow } from 'enzyme';
import Option from './radio-option';
import Group from './radio-group';

jest.mock('invariant');

const createOptionTestProps = custom => ({
  value: 'foo',
  isDisabled: false,
  isChecked: false,
  name: 'bar',
  onChange: jest.fn(),
  ...custom,
});
const createGroupTestProps = custom => ({
  name: 'bar',
  value: 'bar',
  onChange: jest.fn(),
  ...custom,
});

describe('<Group>', () => {
  describe('rendering', () => {
    let props;
    let optionProps;
    let wrapper;

    beforeEach(() => {
      props = createGroupTestProps();
      optionProps = createOptionTestProps();

      wrapper = shallow(
        <Group {...props}>
          <Option {...optionProps}>{'foo'}</Option>
          <Option {...optionProps}>{'bar'}</Option>
        </Group>
      );
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render two `<Option>s', () => {
      expect(wrapper).toRenderElementTimes(Option, 2);
    });

    describe('with `data-test`', () => {
      beforeEach(() => {
        props = createGroupTestProps({
          direction: 'inline',
          'data-test': 'attribute-definition-constraint',
        });
        optionProps = createOptionTestProps();

        wrapper = shallow(
          <Group {...props}>
            <Option {...optionProps}>{'foo'}</Option>
            <Option {...optionProps}>{'bar'}</Option>
          </Group>
        );
      });
      it('should match snpshot', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('when `direction is `inline``', () => {
      beforeEach(() => {
        props = createGroupTestProps({ direction: 'inline' });
        optionProps = createOptionTestProps();

        wrapper = shallow(
          <Group {...props}>
            <Option {...optionProps}>{'foo'}</Option>
            <Option {...optionProps}>{'bar'}</Option>
          </Group>
        );
      });
      it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('<Option>', () => {
      let firstOptionProps;
      let secondOptionProps;
      let optionWrapper;

      beforeEach(() => {
        props = createGroupTestProps();
        firstOptionProps = createOptionTestProps();
        secondOptionProps = createOptionTestProps({ value: 'bar' });

        wrapper = shallow(
          <Group {...props}>
            <Option {...firstOptionProps}>{'foo'}</Option>
            <Option {...secondOptionProps}>{'bar'}</Option>
          </Group>
        );

        optionWrapper = wrapper.find(Option).at(0);
      });

      it('should receive `name`', () => {
        expect(optionWrapper).toHaveProp('name', props.name);
      });

      it('should receive `onChange`', () => {
        expect(optionWrapper).toHaveProp('onChange', props.onChange);
      });

      describe('when checked', () => {
        it('should receive `isChecked` as `false`', () => {
          expect(optionWrapper).toHaveProp('isChecked', false);
        });
      });

      describe('when unchecked', () => {
        it('should receive `isChecked` as `true`', () => {
          expect(wrapper.find(Option).at(1)).toHaveProp('isChecked', true);
        });
      });
    });
  });

  describe('lifecycle', () => {
    describe('componentWillMount', () => {
      describe('without any `<Option>`', () => {
        let props;

        beforeEach(() => {
          props = createGroupTestProps();

          shallow(
            <Group {...props}>
              <div />
            </Group>
          );
        });

        it('should invoke `invariant`', () => {
          expect(invariant).toHaveBeenCalled();
        });
      });
    });
  });

  describe('callbacks', () => {
    const createEvent = ({ value }) => ({
      target: { value },
    });
    const event = createEvent({ value: 'baz-value' });
    let props;
    let wrapper;

    beforeEach(() => {
      props = createGroupTestProps();
      const optionProps = createOptionTestProps();

      wrapper = shallow(
        <Group {...props}>
          <Option {...optionProps}>{'foo'}</Option>
        </Group>
      );

      wrapper.find(Option).prop('onChange')(event);
    });

    describe('handling change', () => {
      it('should invoke `onChange`', () => {
        expect(props.onChange).toHaveBeenCalled();
      });

      it('should invoke `onChange` with the event', () => {
        expect(props.onChange).toHaveBeenCalledWith(event);
      });
    });
  });
});
