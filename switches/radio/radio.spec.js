import React from 'react';
import invariant from 'invariant';
import { shallow } from 'enzyme';
import Radio from './radio';

jest.mock('invariant');

const createOptionTestProps = custom => ({
  value: 'foo',
  isDisabled: false,
  isChecked: false,
  name: 'bar',
  onClick: jest.fn(),
  ...custom,
});
const createGroupTestProps = custom => ({
  name: 'bar',
  value: 'bar',
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

      describe('when disabled', () => {
        beforeEach(() => {
          props = createOptionTestProps({ isDisabled: true });

          wrapper = shallow(<Radio.Option {...props} />);
        });

        it('should disable the `input`', () => {
          expect(wrapper.find('input')).toHaveProp(
            'disabled',
            props.isDisabled
          );
        });
      });

      describe('when checked', () => {
        beforeEach(() => {
          props = createOptionTestProps({ isDisabled: true });

          wrapper = shallow(<Radio.Option {...props} />);
        });

        it('should check the `input`', () => {
          expect(wrapper.find('input')).toHaveProp('checked', props.isChecked);
        });
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
          <Radio.Option {...optionProps}>{'foo'}</Radio.Option>
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
            <Radio.Option {...optionProps}>{'foo'}</Radio.Option>
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

    describe('<Radio.Option>', () => {
      let firstOptionProps;
      let secondOptionProps;
      let optionWrapper;

      beforeEach(() => {
        props = createGroupTestProps();
        firstOptionProps = createOptionTestProps();
        secondOptionProps = createOptionTestProps({ value: 'bar' });

        wrapper = shallow(
          <Radio.Group {...props}>
            <Radio.Option {...firstOptionProps}>{'foo'}</Radio.Option>
            <Radio.Option {...secondOptionProps}>{'bar'}</Radio.Option>
          </Radio.Group>
        );

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

      describe('when checked', () => {
        it('should receive `isChecked` as `false`', () => {
          expect(optionWrapper).toHaveProp('isChecked', false);
        });
      });

      describe('when unchecked', () => {
        it('should receive `isChecked` as `true`', () => {
          expect(wrapper.find(Radio.Option).at(1)).toHaveProp(
            'isChecked',
            true
          );
        });
      });
    });
  });

  describe('lifecycle', () => {
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
