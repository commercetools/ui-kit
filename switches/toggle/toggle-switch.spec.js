import React from 'react';
import { shallow } from 'enzyme';
import ToggleSwitch, { ToggleButton, ToggleBar } from './toggle-switch';

const createTestProps = custom => ({
  isDisabled: false,
  isChecked: false,
  isMouseOver: false,
  size: 'big',
  ...custom,
});

describe('<ToggleSwitch>', () => {
  describe('rendering', () => {
    describe('structure', () => {
      let props;
      let wrapper;

      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<ToggleSwitch {...props} />);
      });

      it('outputs correct tree', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should render <ToggleBar>', () => {
        expect(wrapper).toRender(ToggleBar);
      });

      it('should render <ToggleButton>', () => {
        expect(wrapper).toRender(ToggleButton);
      });

      it('should supply `isChecked` to <ToggleBar>', () => {
        expect(wrapper.find(ToggleBar)).toHaveProp(
          'isChecked',
          props.isChecked
        );
      });

      it('should supply `isChecked` to <ToggleButton>', () => {
        expect(wrapper.find(ToggleButton)).toHaveProp(
          'isChecked',
          props.isChecked
        );
      });

      it('should supply `isDisabled` to <ToggleBar>', () => {
        expect(wrapper.find(ToggleBar)).toHaveProp(
          'isDisabled',
          props.isDisabled
        );
      });

      it('should supply `isDisabled` to <ToggleButton>', () => {
        expect(wrapper.find(ToggleButton)).toHaveProp(
          'isDisabled',
          props.isDisabled
        );
      });

      it('should supply `isMouseOver` to <ToggleBar>', () => {
        expect(wrapper.find(ToggleBar)).toHaveProp(
          'isMouseOver',
          props.isMouseOver
        );
      });

      it('should supply `isMouseOver` to <ToggleButton>', () => {
        expect(wrapper.find(ToggleButton)).toHaveProp(
          'isMouseOver',
          props.isMouseOver
        );
      });

      it('should supply `size` to <ToggleBar>', () => {
        expect(wrapper.find(ToggleBar)).toHaveProp('size', props.size);
      });

      it('should supply `size` to <ToggleButton>', () => {
        expect(wrapper.find(ToggleButton)).toHaveProp('size', props.size);
      });
    });

    describe('sizes', () => {
      describe('when small', () => {
        let wrapper;
        beforeEach(() => {
          const props = createTestProps({ size: 'small' });
          wrapper = shallow(<ToggleSwitch {...props} />);
        });

        it('should add the small class to the container', () => {
          expect(wrapper).toHaveClassName('toggle-container-small');
        });
      });

      describe('when big', () => {
        let wrapper;
        beforeEach(() => {
          const props = createTestProps({ size: 'big' });
          wrapper = shallow(<ToggleSwitch {...props} />);
        });

        it('should add the big class to the container', () => {
          expect(wrapper).toHaveClassName('toggle-container-big');
        });
      });
    });
  });
});

describe('<ToggleButton>', () => {
  describe('rendering', () => {
    describe('structure', () => {
      let props;
      let wrapper;

      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<ToggleButton {...props} />);
      });

      it('outputs correct tree', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('states', () => {
      describe('when is checked', () => {
        let wrapper;

        beforeEach(() => {
          const props = createTestProps({ isChecked: true });
          wrapper = shallow(<ToggleButton {...props} />);
        });

        it('should apply the `active` class to <ToggleButton>', () => {
          expect(wrapper).toHaveClassName('toggle-button-big active');
        });
      });

      describe('when is not checked', () => {
        let wrapper;

        beforeEach(() => {
          const props = createTestProps({ isChecked: false });
          wrapper = shallow(<ToggleButton {...props} />);
        });

        it('should not apply the `active` class to <ToggleButton>', () => {
          expect(wrapper).not.toHaveClassName('active');
        });
      });

      describe('when is disabled', () => {
        let wrapper;

        beforeEach(() => {
          const props = createTestProps({ isDisabled: true });
          wrapper = shallow(<ToggleButton {...props} />);
        });

        it('should apply the `disabled` class to <ToggleButton>', () => {
          expect(wrapper).toHaveClassName('toggle-button-big disabled');
        });
      });

      describe('when is not disabled', () => {
        let wrapper;

        beforeEach(() => {
          const props = createTestProps({ isDisabled: false });
          wrapper = shallow(<ToggleButton {...props} />);
        });

        it('should not apply the `disabled` class to <ToggleButton>', () => {
          expect(wrapper).not.toHaveClassName('disabled');
        });
      });
    });

    describe('sizes', () => {
      describe('when small', () => {
        let wrapper;
        beforeEach(() => {
          const props = createTestProps({ size: 'small' });
          wrapper = shallow(<ToggleButton {...props} />);
        });

        it('should add the `small` suffix to the base class', () => {
          expect(wrapper).toHaveClassName('toggle-button-small');
        });
      });

      describe('when big', () => {
        let wrapper;
        beforeEach(() => {
          const props = createTestProps({ size: 'big' });
          wrapper = shallow(<ToggleButton {...props} />);
        });

        it('should add the `big` suffix to the base class', () => {
          expect(wrapper).toHaveClassName('toggle-button-big');
        });
      });
    });
  });
});

describe('<ToggleBar>', () => {
  describe('rendering', () => {
    describe('structure', () => {
      let props;
      let wrapper;

      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<ToggleBar {...props} />);
      });

      it('outputs correct tree', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('states', () => {
      describe('when is checked', () => {
        let wrapper;

        beforeEach(() => {
          const props = createTestProps({ isChecked: true });
          wrapper = shallow(<ToggleBar {...props} />);
        });

        it('should apply the `active` class to the <ToggleBar>', () => {
          expect(wrapper).toHaveClassName('toggle-bar-big active');
        });
      });

      describe('when is not checked', () => {
        let wrapper;

        beforeEach(() => {
          const props = createTestProps({ isChecked: false });
          wrapper = shallow(<ToggleBar {...props} />);
        });

        it('should not apply the `active` class to <ToggleBar>', () => {
          expect(wrapper).not.toHaveClassName('active');
        });
      });

      describe('when is disabled', () => {
        let wrapper;

        beforeEach(() => {
          const props = createTestProps({ isDisabled: true });
          wrapper = shallow(<ToggleBar {...props} />);
        });

        it('should apply the `disabled` class to <ToggleBar>', () => {
          expect(wrapper).toHaveClassName('toggle-bar-big disabled');
        });
      });

      describe('when is not disabled', () => {
        let wrapper;

        beforeEach(() => {
          const props = createTestProps({ isDisabled: false });
          wrapper = shallow(<ToggleBar {...props} />);
        });

        it('should not apply the `disabled` class to <ToggleBar>', () => {
          expect(wrapper).not.toHaveClassName('disabled');
        });
      });
    });

    describe('sizes', () => {
      describe('when small', () => {
        let wrapper;
        beforeEach(() => {
          const props = createTestProps({ size: 'small' });
          wrapper = shallow(<ToggleBar {...props} />);
        });

        it('should add the `small` suffix to the base class', () => {
          expect(wrapper).toHaveClassName('toggle-bar-small');
        });
      });

      describe('when big', () => {
        let wrapper;
        beforeEach(() => {
          const props = createTestProps({ size: 'big' });
          wrapper = shallow(<ToggleBar {...props} />);
        });

        it('should add the `big` suffix to the base class', () => {
          expect(wrapper).toHaveClassName('toggle-bar-big');
        });
      });
    });
  });
});
