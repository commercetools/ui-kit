import React from 'react';
import { shallow } from 'enzyme';
import BaseTable from './base-table';
import Table from './table';

const FooterComponent = () => <div>{'Hello'}</div>;
const createTestProps = (custom) => ({
  columns: Array.from({ length: 10 }).map((_, index) => ({
    key: `ID-${index}`,
  })),
  itemRenderer: jest.fn(() => <div>{'foo'}</div>),
  rowCount: 20,
  items: Array.from({ length: 50 }, (_, index) => ({ id: index + 1 })),
  maxHeight: 500,
  width: 500,
  shouldFillRemainingVerticalSpace: true,
  ...custom,
});

describe('Table', () => {
  let props;
  let wrapper;
  let wrapperContent;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<Table {...props} />);
    wrapperContent = shallow(
      wrapper.instance().renderContent({ height: 100, width: 200 })
    );
  });

  it('should render AutoSizer', () => {
    expect(wrapper).toRender('AutoSizer');
  });

  it('should render BaseTable', () => {
    expect(wrapperContent).toRender(BaseTable);
  });

  describe('when component is mounted', () => {
    describe('if has footer', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Table {...props}>
            <FooterComponent />
          </Table>
        );
        wrapperContent = shallow(
          wrapper.instance().renderContent({ height: 100, width: 200 })
        );

        wrapper.instance().ref.current = { clientHeight: 10 };
        wrapper.instance().componentDidMount();
      });
      it('should set footerHeight', () => {
        expect(wrapper.instance().footerHeight).toBe(10);
      });
    });
    describe('if doesnt have a footer', () => {
      beforeEach(() => {
        wrapper = shallow(<Table {...props} />);
        wrapper.instance().componentDidMount();
      });
      it('should not set footerHeight', () => {
        expect(wrapper.instance().footerHeight).toBe(undefined);
      });
    });
  });

  describe("when the table shouldn't fill up the remaining vertical space", () => {
    describe('defaultHeight is not provided', () => {
      let wrapperWithFooter;
      beforeEach(() => {
        props = createTestProps({ shouldFillRemainingVerticalSpace: false });
        wrapperWithFooter = shallow(
          <Table {...props}>
            <FooterComponent />
          </Table>
        );
        wrapperWithFooter.instance().footerHeight = 50;
        wrapperContent = shallow(
          wrapperWithFooter
            .instance()
            .renderContent({ height: 100, width: 200 })
        );
      });
      it('should pass maxHeight of 768px and ignore the footer height', () => {
        expect(wrapperContent.find('BaseTable').prop('maxHeight')).toBe(768);
      });
      it('should render footer', () => {
        expect(wrapperContent).toRender(FooterComponent);
      });
    });
    describe('defaultHeight is provided', () => {
      let wrapperWithFooter;
      beforeEach(() => {
        props = createTestProps({
          shouldFillRemainingVerticalSpace: false,
          defaultHeight: 475,
        });
        wrapperWithFooter = shallow(
          <Table {...props}>
            <FooterComponent />
          </Table>
        );
        wrapperWithFooter.instance().footerHeight = 50;
        wrapperContent = shallow(
          wrapperWithFooter
            .instance()
            .renderContent({ height: 100, width: 200 })
        );
      });
      it('should pass maxHeight of 475px and ignore the footer height', () => {
        expect(wrapperContent.find('BaseTable')).toHaveProp('maxHeight', 475);
      });
      it('should render footer', () => {
        expect(wrapperContent).toRender(FooterComponent);
      });
    });
  });

  describe('if Autosizer height < defaultHeight (without footer)', () => {
    describe('defaultHeight is not provided', () => {
      beforeEach(() => {
        wrapper = shallow(<Table {...props} />);
        wrapperContent = shallow(
          wrapper.instance().renderContent({ height: 100, width: 200 })
        );
      });
      it('should pass maxHeight of 768px by default to BaseTable', () => {
        expect(wrapperContent.find('BaseTable')).toHaveProp('maxHeight', 768);
      });
      it('should not render footer', () => {
        expect(wrapperContent).not.toRender(FooterComponent);
      });
    });
    describe('defaultHeight is provided', () => {
      beforeEach(() => {
        wrapper = shallow(<Table defaultHeight={475} {...props} />);
        wrapperContent = shallow(
          wrapper.instance().renderContent({ height: 100, width: 200 })
        );
      });
      it('should pass maxHeight of 475px to BaseTable', () => {
        expect(wrapperContent.find('BaseTable')).toHaveProp('maxHeight', 475);
      });
      it('should not render footer', () => {
        expect(wrapperContent).not.toRender(FooterComponent);
      });
    });
  });
  describe('if Autosizer height < defaultHeight (with footer)', () => {
    describe('defaultHeight is not provided', () => {
      let wrapperWithFooter;
      beforeEach(() => {
        wrapperWithFooter = shallow(
          <Table {...props}>
            <FooterComponent />
          </Table>
        );
        wrapperWithFooter.instance().footerHeight = 50;
        wrapperContent = shallow(
          wrapperWithFooter
            .instance()
            .renderContent({ height: 100, width: 200 })
        );
      });
      it('should pass maxHeight of 768px - footerHeight to BaseTable', () => {
        expect(wrapperContent.find('BaseTable').prop('maxHeight')).toBe(
          768 - 50
        );
      });
      it('should render footer', () => {
        expect(wrapperContent).toRender(FooterComponent);
      });
    });
    describe('defaultHeight is provided', () => {
      let wrapperWithFooter;
      beforeEach(() => {
        wrapperWithFooter = shallow(
          <Table defaultHeight={475} {...props}>
            <FooterComponent />
          </Table>
        );
        wrapperWithFooter.instance().footerHeight = 50;
        wrapperContent = shallow(
          wrapperWithFooter
            .instance()
            .renderContent({ height: 100, width: 200 })
        );
      });
      it('should pass maxHeight of 475px - footerHeight to BaseTable', () => {
        expect(wrapperContent.find('BaseTable')).toHaveProp(
          'maxHeight',
          475 - 50
        );
      });
      it('should render footer', () => {
        expect(wrapperContent).toRender(FooterComponent);
      });
    });
  });
  describe('if Autosizer height > defaultHeight (without footer)', () => {
    describe('defaultHeight is not provided', () => {
      beforeEach(() => {
        wrapperContent = shallow(
          wrapper.instance().renderContent({ height: 800, width: 200 })
        );
      });
      it('Autosizer height should be bigger than default defaultHeight', () => {
        expect(
          wrapperContent.find('BaseTable').prop('maxHeight')
        ).toBeGreaterThan(768);
      });
      it('should pass maxHeight of 800px to BaseTable', () => {
        expect(wrapperContent.find('BaseTable')).toHaveProp('maxHeight', 800);
      });
      it('should not render footer', () => {
        expect(wrapperContent).not.toRender(FooterComponent);
      });
    });
    describe('defaultHeight is provided', () => {
      beforeEach(() => {
        wrapper = shallow(<Table defaultHeight={475} {...props} />);
        wrapperContent = shallow(
          wrapper.instance().renderContent({ height: 800, width: 200 })
        );
      });
      it('Autosizer height should be greater than provided defaultHeight', () => {
        expect(
          wrapperContent.find('BaseTable').prop('maxHeight')
        ).toBeGreaterThan(475);
      });
      it('should pass maxHeight of 800px to BaseTable', () => {
        expect(wrapperContent.find('BaseTable')).toHaveProp('maxHeight', 800);
      });
      it('should not render footer', () => {
        expect(wrapperContent).not.toRender(FooterComponent);
      });
    });
  });
  describe('if Autosizer height > defaultHeight (with footer)', () => {
    describe('defaultHeight is not provided', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Table {...props}>
            <FooterComponent />
          </Table>
        );
        wrapper.instance().footerHeight = 50;
        wrapperContent = shallow(
          wrapper.instance().renderContent({ height: 800, width: 200 })
        );
      });
      it('Autosizer height should be greater than default defaultHeight - footerHeight', () => {
        expect(
          wrapperContent.find('BaseTable').prop('maxHeight')
        ).toBeGreaterThan(768 - 50);
      });
      it('should pass maxHeight of 768px - footerHeight to BaseTable', () => {
        expect(wrapperContent.find('BaseTable')).toHaveProp(
          'maxHeight',
          800 - 50
        );
      });
      it('should render footer', () => {
        expect(wrapperContent).toRender(FooterComponent);
      });
    });
    describe('defaultHeight is provided', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Table defaultHeight={475} {...props}>
            <FooterComponent />
          </Table>
        );
        wrapper.instance().footerHeight = 50;
        wrapperContent = shallow(
          wrapper.instance().renderContent({ height: 800, width: 200 })
        );
      });
      it('Autosizer height should be greater than provided defaultHeight - footerHeight', () => {
        expect(
          wrapperContent.find('BaseTable').prop('maxHeight')
        ).toBeGreaterThan(475 - 50);
      });
      it('should pass maxHeight of 800px - footerHeight to BaseTable', () => {
        expect(wrapperContent.find('BaseTable')).toHaveProp(
          'maxHeight',
          800 - 50
        );
      });
      it('should render footer', () => {
        expect(wrapperContent).toRender(FooterComponent);
      });
    });
  });
});
