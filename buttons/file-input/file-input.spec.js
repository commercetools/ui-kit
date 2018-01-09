import React from 'react';
import { shallow } from 'enzyme';
import FileInput from './file-input';

const createProps = custom => ({
  onChange: jest.fn(),
  children: '',
  ...custom,
});

describe('rendering', () => {
  describe('structure', () => {
    let props;
    let wrapper;
    let wrapperFileInput;
    beforeEach(() => {
      props = createProps({ children: 'foo', name: 'bar' });
      wrapperFileInput = shallow(
        <div>
          <FileInput {...props} />
        </div>
      );
      wrapper = shallow(<FileInput {...props} />);
    });

    it('should render label wrapper', () => {
      expect(wrapper).toRender('label');
    });

    it('input should have correct `name` prop value', () => {
      expect(wrapper.find('input')).toHaveProp('name', 'bar');
    });

    it('should default `acceptTypes`', () => {
      expect(wrapper.find('input')).toHaveProp(
        'accept',
        FileInput.defaultProps.acceptTypes
      );
    });

    it('should default `allowMultiple` as false', () => {
      expect(wrapper.find('input')).toHaveProp('multiple', false);
    });

    it('should have correct text', () => {
      expect(wrapper).toHaveText('foo');
    });

    it('should have `allowMultiple` prop defined as false', () => {
      expect(wrapperFileInput.find('FileInput')).toHaveProp(
        'allowMultiple',
        false
      );
    });
  });
  describe('statics', () => {
    describe('defaultProps', () => {
      let wrapper;
      beforeEach(() => {
        const props = createProps({ children: 'foo', name: 'bar' });
        wrapper = shallow(<FileInput {...props} />);
      });
      it('should default `acceptTypes`', () => {
        expect(wrapper.find('input')).toHaveProp(
          'accept',
          'image/png,image/jpeg,image/gif'
        );
      });
    });
  });
});
describe('callbacks', () => {
  describe('of `<FileInput />`', () => {
    describe('onChange', () => {
      let props;
      let wrapper;

      beforeEach(() => {
        props = createProps({ onChange: jest.fn() });
        wrapper = shallow(<FileInput {...props} />);

        wrapper
          .find('input')
          .simulate('change', { target: { files: ['bar'] } });
      });

      it('should call the onChange callback', () => {
        expect(props.onChange).toHaveBeenCalledTimes(1);
      });

      it('should call the onChange callback with event', () => {
        expect(props.onChange).toHaveBeenCalledWith({
          target: { files: ['bar'] },
        });
      });
    });
  });
});
