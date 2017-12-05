import { shallow, mount } from 'enzyme';
import React from 'react';
import Collapsible from '../../collapsible';
import CollapsiblePanel, {
  ControlledCollapsiblePanel,
  UncontrolledCollapsiblePanel,
} from './collapsible-panel';

describe('CollapsiblePanel', () => {
  describe('when used as a controlled component', () => {
    it('should render ControlledCollapsiblePanel', () => {
      const wrapper = shallow(
        <CollapsiblePanel label="hi" onToggle={() => {}} isClosed={true}>
          foo
        </CollapsiblePanel>
      );
      expect(wrapper).toRender(ControlledCollapsiblePanel);
    });
  });
  describe('when used as an uncontrolled component', () => {
    it('should render UncontrolledCollapsiblePanel', () => {
      const wrapper = shallow(
        <CollapsiblePanel label="hi" isDefaultClosed={false}>
          foo
        </CollapsiblePanel>
      );
      expect(wrapper).toRender(UncontrolledCollapsiblePanel);
    });
  });
});

describe('ControlledCollapsiblePanel', () => {
  const createTestProps = props => ({
    className: 'custom-container',
    label: 'Header Title',
    isClosed: false,
    isDisabled: false,
    onToggle: jest.fn(),
    ...props,
  });

  describe('rendering', () => {
    let props;
    let wrapper;
    describe('base elements', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(
          <ControlledCollapsiblePanel {...props}>
            <span id="foo">{'Foo'}</span>
          </ControlledCollapsiblePanel>
        );
      });

      it('should apply custom container class name', () => {
        expect(wrapper).toHaveClassName('custom-container');
      });

      it('should render title in header container', () => {
        expect(wrapper).toRender('TextHeadline');
      });

      describe('when sticky mode is enabled', () => {
        beforeEach(() => {
          props = createTestProps({ isSticky: true });
          wrapper = shallow(
            <ControlledCollapsiblePanel {...props}>
              <span id="foo">{'Foo'}</span>
            </ControlledCollapsiblePanel>
          );
        });

        it('should apply a sticky class name to the header container', () => {
          expect(wrapper).toRender('.sticky');
        });
      });

      it('should render tracking info', () => {
        expect(
          wrapper
            .find('TextHeadline')
            .map(node => node.props()['data-track-component'])
        ).toEqual(['CollapsiblePanel']);
      });

      it('should render `HeaderIcon`', () => {
        expect(wrapper).toRender('HeaderIcon');
      });

      it('should render header title', () => {
        expect(wrapper.find('TextHeadline').contains('Header Title')).toBe(
          true
        );
      });

      it('should render children', () => {
        expect(wrapper.find('#foo').text()).toBe('Foo');
      });
    });

    describe('header controls', () => {
      beforeEach(() => {
        props = createTestProps({
          headerControls: <span id="controls" />,
        });
        wrapper = shallow(
          <ControlledCollapsiblePanel {...props}>
            <span id="foo">{'Foo'}</span>
          </ControlledCollapsiblePanel>
        );
      });

      it('should render controls container', () => {
        expect(wrapper.find('#controls')).toHaveLength(1);
      });
    });
  });

  describe('interacting', () => {
    describe('when enabled', () => {
      let props;
      let wrapper;
      beforeEach(() => {
        props = createTestProps({
          isDisabled: false,
          onToggle: jest.fn(),
        });
        wrapper = shallow(
          <ControlledCollapsiblePanel {...props}>
            <span id="foo">{'Foo'}</span>
          </ControlledCollapsiblePanel>
        );

        wrapper.instance().handleToggle();
      });

      it('should invoke `onToggle`', () => {
        expect(props.onToggle).toHaveBeenCalled();
      });
    });

    describe('when disabled', () => {
      let props;
      let wrapper;
      beforeEach(() => {
        props = createTestProps({
          isDisabled: true,
          onToggle: jest.fn(),
        });
        wrapper = shallow(
          <ControlledCollapsiblePanel {...props}>
            <span id="foo">{'Foo'}</span>
          </ControlledCollapsiblePanel>
        );

        wrapper.instance().handleToggle();
      });

      it('should not invoke `onToggle`', () => {
        expect(props.onToggle).not.toHaveBeenCalled();
      });
    });
  });

  describe('callbacks', () => {
    describe('when toggling', () => {
      describe('when enabled', () => {
        let props;
        let wrapper;
        beforeEach(() => {
          props = createTestProps({ onToggle: jest.fn() });
          wrapper = shallow(
            <ControlledCollapsiblePanel {...props}>
              <span id="foo">{'Foo'}</span>
            </ControlledCollapsiblePanel>
          );
          wrapper.find('.header').simulate('click');
        });

        it('should invoke `onToggle`', () => {
          expect(props.onToggle).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('when disabled', () => {
      describe('toggle panel (disabled)', () => {
        let props;
        let wrapper;
        beforeEach(() => {
          props = createTestProps({ isDisabled: true });
          wrapper = shallow(
            <ControlledCollapsiblePanel {...props}>
              <span id="foo">{'Foo'}</span>
            </ControlledCollapsiblePanel>
          );

          wrapper.find('.header').prop('onClick')();
        });

        it('should not invoke `onToggle`', () => {
          expect(props.onToggle).not.toHaveBeenCalled();
        });
      });
    });
  });
});

describe('UncontrolledCollapsiblePanel', () => {
  describe('rendering', () => {
    const wrapper = mount(
      <UncontrolledCollapsiblePanel label="foo">
        <div id="child" />
      </UncontrolledCollapsiblePanel>
    );

    it('should render Collapsible', () => {
      expect(wrapper).toRender(Collapsible);
    });

    it('should render ControlledCollapsiblePanel', () => {
      expect(wrapper).toRender(ControlledCollapsiblePanel);
    });

    it('should render children', () => {
      expect(wrapper).toRender('#child');
    });
  });

  describe('when closed by default', () => {
    const wrapper = shallow(
      <UncontrolledCollapsiblePanel label="foo" isDefaultClosed={true}>
        <div />
      </UncontrolledCollapsiblePanel>
    );

    it('should render a closed `Collapsible`', () => {
      expect(wrapper).toRender(Collapsible);
    });

    it('should pass through `isDefaultClosed` prop``', () => {
      expect(wrapper.find(Collapsible)).toHaveProp('isDefaultClosed', true);
    });
  });
});
