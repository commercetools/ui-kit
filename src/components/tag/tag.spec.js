import React from 'react';
import { Link } from 'react-router-dom';
import { shallow } from 'enzyme';
import Icons from '../icons';
import Tag, { TagNormalBody, TagLinkBody } from './tag';

describe('`<TagLinkBody />`', () => {
  const createTestProps = custom => ({
    type: 'normal',
    onClick: jest.fn(),
    linkTo: 'foo-too',
    isDisabled: false,
    children: 'Icecream we scream!',
    ...custom,
  });
  let props;
  let wrapper;

  describe('rendering', () => {
    beforeEach(() => {
      props = createTestProps();

      wrapper = shallow(<TagLinkBody {...props} />);
    });

    describe('when enabled (`isDisabled`)', () => {
      it('should match the recoreded snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should supply `to` to `Link`', () => {
        expect(wrapper.find(Link)).toHaveProp('to', props.linkTo);
      });

      it('should apply clickable class name', () => {
        expect(wrapper.find('div')).toHaveClassName('clickableContentWrapper');
      });

      it('should apply link class name', () => {
        expect(wrapper.find('div')).toHaveClassName('plainLink');
      });
    });

    describe('when disabled (`isDisabled`)', () => {
      beforeEach(() => {
        props = createTestProps({ isDisabled: true });

        wrapper = shallow(<TagLinkBody {...props} />);
      });

      it('should match the recoreded snapshot', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should render a `Link`', () => {
        expect(wrapper).not.toRender('Link');
      });
    });

    describe('when removeable (`onRemove`)', () => {
      beforeEach(() => {
        props = createTestProps({ onRemove: jest.fn() });

        wrapper = shallow(<TagLinkBody {...props} />);
      });

      it('should apply removeable class name', () => {
        expect(wrapper.find('div')).toHaveClassName('removableContent');
      });
    });
  });

  describe('callbacks', () => {
    beforeEach(() => {
      props = createTestProps();

      wrapper = shallow(<TagLinkBody {...props} />);
    });

    describe('when enabled (`isDisabled`)', () => {
      describe('of `<Link />`', () => {
        describe('`onClick`', () => {
          beforeEach(() => {
            wrapper.find('Link').prop('onClick')();
          });

          it('should invoke `onClick`', () => {
            expect(props.onClick).toHaveBeenCalled();
          });
        });
      });
    });
  });
});

describe('`<TagNormalBody />`', () => {
  const createTestProps = custom => ({
    type: 'normal',
    onClick: jest.fn(),
    isDisabled: false,
    children: 'Icecream we scream!',
    ...custom,
  });
  let props;
  let wrapper;

  describe('rendering', () => {
    beforeEach(() => {
      props = createTestProps();

      wrapper = shallow(<TagNormalBody {...props} />);
    });

    it('should output correct tree', () => {
      expect(wrapper).toMatchSnapshot();
    });

    describe('when enabled (`isDisabled`)', () => {
      it('should supply `onClick` to the main div', () => {
        expect(wrapper.find('div')).toHaveProp('onClick', props.onClick);
      });

      describe('when clickable (`onClick`)', () => {
        beforeEach(() => {
          props = createTestProps({ onClick: jest.fn() });

          wrapper = shallow(<TagNormalBody {...props} />);
        });

        it('should apply clickable class name', () => {
          expect(wrapper.find('div')).toHaveClassName(
            'clickableContentWrapper'
          );
        });
      });
    });

    describe('when disabled (`isDisabled`)', () => {
      beforeEach(() => {
        props = createTestProps({ isDisabled: true });

        wrapper = shallow(<TagNormalBody {...props} />);
      });

      it('should apply disabled class name', () => {
        expect(wrapper.find('div')).toHaveClassName('disabledContent');
      });
    });

    describe('when removable (`onRemove`)', () => {
      beforeEach(() => {
        props = createTestProps({ onRemove: jest.fn() });

        wrapper = shallow(<TagNormalBody {...props} />);
      });

      it('should apply removable class name', () => {
        expect(wrapper.find('div')).toHaveClassName('removableContent');
      });
    });
  });

  describe('callbacks', () => {
    beforeEach(() => {
      props = createTestProps();

      wrapper = shallow(<TagNormalBody {...props} />);
    });

    describe('when enabled (`isDisabled`)', () => {
      describe('of `<div />`', () => {
        describe('`onClick`', () => {
          beforeEach(() => {
            wrapper.find('div').prop('onClick')();
          });

          it('should invoke `onClick`', () => {
            expect(props.onClick).toHaveBeenCalled();
          });
        });
      });
    });
  });
});

describe('<Tag />', () => {
  const createTestProps = custom => ({
    children: 'Icecream we scream!',
    ...custom,
  });

  describe('rendering', () => {
    let props;
    let wrapper;
    let tagWrapper;

    describe('when of type `normal` (default)', () => {
      beforeEach(() => {
        props = createTestProps();

        wrapper = shallow(<Tag {...props} />);
        tagWrapper = wrapper.find('.wrapper');
      });

      it('should output correct tree', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should apply `wrapperTypeNormal` class name', () => {
        expect(tagWrapper).toHaveClassName('wrapperTypeNormal');
      });
    });

    describe('when of type `warning`', () => {
      beforeEach(() => {
        props = createTestProps({ type: 'warning' });

        wrapper = shallow(<Tag {...props} />);
        tagWrapper = wrapper.find('.wrapper');
      });

      it('should output correct tree', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should apply `wrapperTypeWarning` class name', () => {
        expect(tagWrapper).toHaveClassName('wrapperTypeWarning');
      });
    });

    describe('when disabled', () => {
      beforeEach(() => {
        props = createTestProps({
          isDisabled: true,
        });

        wrapper = shallow(<Tag {...props} />);
        tagWrapper = wrapper.find('.wrapper');
      });

      it('should output correct tree', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should apply `disabledWrapper` class name', () => {
        expect(tagWrapper).toHaveClassName('disabledWrapper');
      });
    });

    describe('when removable (`onRemove`)', () => {
      beforeEach(() => {
        props = createTestProps({
          onRemove: jest.fn(),
        });

        wrapper = shallow(<Tag {...props} />);
      });

      it('should output correct tree', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should render `CloseBoldIcon`', () => {
        expect(wrapper).toRender(Icons.CloseBold);
      });
    });

    describe('when `linkTo` is set', () => {
      beforeEach(() => {
        props = createTestProps({
          linkTo: '/foo',
          onClick: jest.fn(),
          isDisabled: false,
        });

        wrapper = shallow(<Tag {...props} />);
      });

      it('should output correct tree', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should render a `<TagLinkBody />`', () => {
        expect(wrapper).toRender(TagLinkBody);
      });

      it('should supply `linkTo` to `<TagLinkBody />`', () => {
        expect(wrapper.find(TagLinkBody)).toHaveProp('linkTo', props.linkTo);
      });

      it('should supply `onClick` to `<TagLinkBody />`', () => {
        expect(wrapper.find(TagLinkBody)).toHaveProp('onClick', props.onClick);
      });

      it('should supply `onRemove` to `<TagLinkBody />`', () => {
        expect(wrapper.find(TagLinkBody)).toHaveProp(
          'onRemove',
          props.onRemove
        );
      });

      it('should supply `isDisabled` to `<TagLinkBody />`', () => {
        expect(wrapper.find(TagLinkBody)).toHaveProp(
          'isDisabled',
          props.isDisabled
        );
      });
    });

    describe('when `linkTo` is not set', () => {
      beforeEach(() => {
        props = createTestProps({
          onClick: jest.fn(),
          onRemove: jest.fn(),
          isDisabled: false,
        });

        wrapper = shallow(<Tag {...props} />);
      });

      it('should output correct tree', () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should render a `<TagNormalBody />`', () => {
        expect(wrapper).toRender(TagNormalBody);
      });

      it('should supply `onRemove` to `<TagNormalBody />`', () => {
        expect(wrapper.find(TagNormalBody)).toHaveProp(
          'onRemove',
          props.onRemove
        );
      });

      it('should supply `onClick` to `<TagNormalBody />`', () => {
        expect(wrapper.find(TagNormalBody)).toHaveProp(
          'onClick',
          props.onClick
        );
      });

      it('should supply `isDisabled` to `<TagNormalBody />`', () => {
        expect(wrapper.find(TagNormalBody)).toHaveProp(
          'isDisabled',
          props.isDisabled
        );
      });
    });
  });

  describe('callbacks', () => {
    let props;
    let wrapper;

    describe('of <AccessibleButton />', () => {
      describe('when enabled (`isDisabled`)', () => {
        describe('onClick', () => {
          beforeEach(() => {
            props = createTestProps({ onRemove: jest.fn() });

            wrapper = shallow(<Tag {...props} />);

            wrapper.find('AccessibleButton').prop('onClick')();
          });

          it('should invoke `onRemove`', () => {
            expect(props.onRemove).toHaveBeenCalled();
          });
        });
      });
    });
  });
});
