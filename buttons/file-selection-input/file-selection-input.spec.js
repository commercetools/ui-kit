import React from 'react';
import { shallow } from 'enzyme';
import FileSelectionInput from './file-selection-input';

const createProps = custom => ({
  onChange: () => {},
  children: '',
  ...custom,
});

describe('rendering', () => {
  describe('structure', () => {
    let props;
    let wrapper;
    let wrapperFileSelectionInput;
    beforeEach(() => {
      props = createProps({ children: 'foo', name: 'bar' });
      wrapperFileSelectionInput = shallow(
        <div>
          <FileSelectionInput {...props} />
        </div>
      );
      wrapper = shallow(<FileSelectionInput {...props} />);
    });

    it('should render label wrapper', () => {
      expect(wrapper).toRender('label');
    });

    it('input should have correct `name` prop', () => {
      expect(wrapper.find('input')).toHaveProp('name', 'bar');
    });

    it('should have correct text', () => {
      expect(wrapper).toHaveText('foo');
    });

    it('should have `allowMultiple` prop defined as false', () => {
      expect(wrapperFileSelectionInput.find('FileSelectionInput')).toHaveProp(
        'allowMultiple',
        false
      );
    });
  });
});

describe('callbacks', () => {
  describe('of `<FileSelectionInput />`', () => {
    describe('onChange', () => {
      let props;
      let wrapper;

      beforeEach(() => {
        props = createProps({ onChange: jest.fn() });
        wrapper = shallow(<FileSelectionInput {...props} />);

        wrapper
          .find('input')
          .simulate('change', { target: { files: ['bar'] } });
      });

      it('should call the onChange callback', () => {
        expect(props.onChange).toHaveBeenCalledTimes(1);
      });
    });
  });
});
