import React from 'react';
import { shallow } from 'enzyme';
import UploadFileButton from './upload-file-button';

const createProps = custom => ({
  onChange: () => {},
  children: '',
  ...custom,
});

describe('rendering', () => {
  describe('structure', () => {
    let props;
    let wrapper;
    let wrapperUploadFileButton;
    beforeEach(() => {
      props = createProps({ children: 'foo' });
      wrapperUploadFileButton = shallow(
        <div>
          <UploadFileButton {...props} />
        </div>
      );
      wrapper = shallow(<UploadFileButton {...props} />);
    });

    it('should render label wrapper', () => {
      expect(wrapper).toRender('label');
    });

    it('should have correct text', () => {
      expect(wrapper).toHaveText('foo');
    });

    it('should have `isMultiple` prop defined as false', () => {
      expect(wrapperUploadFileButton.find('UploadFileButton')).toHaveProp(
        'isMultiple',
        false
      );
    });
  });
});

describe('callbacks', () => {
  describe('of `<UploadFileButton />`', () => {
    describe('onChange', () => {
      let props;
      let wrapper;

      beforeEach(() => {
        props = createProps({ onChange: jest.fn() });
        wrapper = shallow(<UploadFileButton {...props} />);

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
