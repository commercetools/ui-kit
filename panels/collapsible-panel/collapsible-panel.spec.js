import { shallow } from 'enzyme';
import React from 'react';
import invariant from 'invariant';
import Text from '../../typography/text';
import CollapsiblePanelHeader from './collapsible-panel-header';
import CollapsiblePanel from './collapsible-panel';

jest.mock('invariant');

describe('CollapsiblePanel', () => {
  const createTestProps = props => ({
    className: 'custom-container',
    header: <CollapsiblePanelHeader>Header Title</CollapsiblePanelHeader>,
    isDisabled: false,
    ...props,
  });

  describe('rendering', () => {
    let props;
    let wrapper;
    let collapsibleMotionWrapper;
    describe('base elements', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(
          <CollapsiblePanel {...props}>
            <span id="foo">{'Foo'}</span>
          </CollapsiblePanel>
        );
        collapsibleMotionWrapper = shallow(
          wrapper.find('CollapsibleMotion').prop('children')({})
        );
      });

      it('should render CollapsibleMotion', () => {
        expect(wrapper).toRender('CollapsibleMotion');
      });

      it('should apply custom container class name', () => {
        expect(collapsibleMotionWrapper).toHaveClassName(props.className);
      });

      it('should render title in header container', () => {
        expect(collapsibleMotionWrapper).toRender(CollapsiblePanelHeader);
      });

      describe('when sticky mode is enabled', () => {
        beforeEach(() => {
          props = createTestProps({ isSticky: true });
          wrapper = shallow(
            <CollapsiblePanel {...props}>
              <span id="foo">{'Foo'}</span>
            </CollapsiblePanel>
          );
          collapsibleMotionWrapper = shallow(
            wrapper.find('CollapsibleMotion').prop('children')({
              isOpen: true,
            })
          );
        });

        it('should apply a sticky class name to the header container', () => {
          expect(collapsibleMotionWrapper).toRender('.sticky');
        });
      });

      it('should render `HeaderIcon`', () => {
        expect(collapsibleMotionWrapper).toRender('HeaderIcon');
      });

      it('should contain header title', () => {
        expect(
          collapsibleMotionWrapper
            .find(CollapsiblePanelHeader)
            .contains('Header Title')
        ).toBe(true);
      });

      it('children should contain text', () => {
        expect(collapsibleMotionWrapper.find('#foo')).toHaveText('Foo');
      });

      describe('when has dark `theme`', () => {
        beforeEach(() => {
          props = createTestProps({ theme: 'dark' });
          wrapper = shallow(
            <CollapsiblePanel {...props}>
              <span id="foo">{'Foo'}</span>
            </CollapsiblePanel>
          );
          collapsibleMotionWrapper = shallow(
            wrapper.find('CollapsibleMotion').prop('children')({
              isOpen: true,
            })
          );
        });

        it('should apply a dark class name to the container', () => {
          expect(collapsibleMotionWrapper).toRender('.container-theme-dark');
        });

        it('should apply a dark class name to the header container', () => {
          expect(collapsibleMotionWrapper).toRender(
            '.header-container-theme-dark'
          );
        });
      });

      describe('when has light `theme`', () => {
        beforeEach(() => {
          props = createTestProps({ theme: 'light' });
          wrapper = shallow(
            <CollapsiblePanel {...props}>
              <span id="foo">{'Foo'}</span>
            </CollapsiblePanel>
          );
          collapsibleMotionWrapper = shallow(
            wrapper.find('CollapsibleMotion').prop('children')({
              isOpen: true,
            })
          );
        });

        it('should apply a light class name to the container', () => {
          expect(collapsibleMotionWrapper).toRender('.container-theme-light');
        });

        it('should apply a light class name to the header container', () => {
          expect(collapsibleMotionWrapper).toRender(
            '.header-container-theme-light'
          );
        });
      });

      describe('when is condensed', () => {
        beforeEach(() => {
          props = createTestProps({ condensed: true });
          wrapper = shallow(
            <CollapsiblePanel {...props}>
              <span id="foo">{'Foo'}</span>
            </CollapsiblePanel>
          );
          collapsibleMotionWrapper = shallow(
            wrapper.find('CollapsibleMotion').prop('children')({
              isOpen: true,
            })
          );
        });

        it('should apply a condensed class name to the container', () => {
          expect(collapsibleMotionWrapper).toRender('.container-condensed');
        });

        it('should render <Text.Detail /> for the header', () => {
          expect(collapsibleMotionWrapper).toRender(Text.Detail);
        });
      });
    });

    describe('header controls', () => {
      beforeEach(() => {
        props = createTestProps({
          headerControls: <span id="controls" />,
        });
        wrapper = shallow(
          <CollapsiblePanel {...props}>
            <span id="foo">{'Foo'}</span>
          </CollapsiblePanel>
        );
        collapsibleMotionWrapper = shallow(
          wrapper.find('CollapsibleMotion').prop('children')({})
        );
      });

      it('should render controls container', () => {
        expect(collapsibleMotionWrapper).toRender('#controls');
      });
    });
  });

  describe('interacting', () => {
    describe('when controlled', () => {
      let props;
      let wrapper;
      let collapsibleMotionWrapper;
      beforeEach(() => {
        props = createTestProps({
          isDisabled: false,
          isClosed: true,
          onToggle: jest.fn(),
        });
        wrapper = shallow(
          <CollapsiblePanel {...props}>
            <span id="foo">{'Foo'}</span>
          </CollapsiblePanel>
        );
        collapsibleMotionWrapper = shallow(
          wrapper.find('CollapsibleMotion').prop('children')({
            toggle: props.onToggle,
          })
        );
        collapsibleMotionWrapper
          .find({ className: 'header' })
          .simulate('click');
      });

      it('should invoke `onToggle` from Collapsiblepanel props', () => {
        expect(props.onToggle).toHaveBeenCalled();
      });
    });

    describe('when uncontrolled', () => {
      let props;
      let wrapper;
      let collapsibleMotionWrapper;
      let collapsibleInternalToggleFunc;
      beforeEach(() => {
        props = createTestProps({
          isDisabled: false,
        });
        collapsibleInternalToggleFunc = jest.fn();
        wrapper = shallow(
          <CollapsiblePanel {...props}>
            <span id="foo">{'Foo'}</span>
          </CollapsiblePanel>
        );
        collapsibleMotionWrapper = shallow(
          wrapper.find('CollapsibleMotion').prop('children')({
            toggle: collapsibleInternalToggleFunc,
          })
        );
        collapsibleMotionWrapper
          .find({ className: 'header' })
          .simulate('click');
      });

      it('should invoke `onToggle` from Collapsible', () => {
        expect(collapsibleInternalToggleFunc).toHaveBeenCalled();
      });
    });

    describe('when disabled', () => {
      let props;
      let wrapper;
      beforeEach(() => {
        props = createTestProps({
          isDisabled: true,
          isClosed: false,
          onToggle: jest.fn(),
        });
        wrapper = shallow(
          <CollapsiblePanel {...props}>
            <span id="foo">{'Foo'}</span>
          </CollapsiblePanel>
        );

        wrapper.instance().createHandleToggle(jest.fn());
      });

      it('should not invoke `onToggle`', () => {
        expect(props.onToggle).not.toHaveBeenCalled();
      });
    });
  });

  describe('lifecycle', () => {
    let props;
    let wrapper;
    describe('componentDidMount', () => {
      describe('with `controls`', () => {
        describe('when `collapsed`', () => {
          beforeEach(() => {
            props = createTestProps({
              controls: <div />,
              condensed: true,
            });
            wrapper = shallow(
              <CollapsiblePanel {...props}>
                <span id="foo">{'Foo'}</span>
              </CollapsiblePanel>
            );

            wrapper.instance().componentDidMount();
          });

          it('should invoke `invariant` with `false`', () => {
            expect(invariant).toHaveBeenCalledWith(false, expect.any(String));
          });
        });

        describe('when not `collapsed`', () => {
          beforeEach(() => {
            props = createTestProps({
              controls: <div />,
              condensed: false,
            });
            wrapper = shallow(
              <CollapsiblePanel {...props}>
                <span id="foo">{'Foo'}</span>
              </CollapsiblePanel>
            );

            wrapper.instance().componentDidMount();
          });

          it('should invoke `invariant` with `true`', () => {
            expect(invariant).toHaveBeenCalledWith(true, expect.any(String));
          });
        });
      });
    });
  });
});
