import { JSDOM } from 'jsdom';
import html from './html';

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

describe('html', () => {
  describe('deserialize', () => {
    describe('with empty paragraph', () => {
      it('should return empty string', () => {
        const htmlValue = '<p></p>';
        expect(html.serialize(html.deserialize(htmlValue))).toEqual('');
      });
    });
    describe('with inline span styles', () => {
      describe('with no styles', () => {
        it('should properly serialize', () => {
          const htmlValue = '<span>hello</span>';

          expect(html.serialize(html.deserialize(htmlValue))).toEqual(
            '<p><span>hello</span></p>'
          );
        });
      });
      describe('with one known value', () => {
        it('should properly serialize', () => {
          const htmlValue = '<span style="font-weight: bold;">hello</span>';

          expect(html.serialize(html.deserialize(htmlValue))).toEqual(
            '<p><strong>hello</strong></p>'
          );
        });
      });
      describe('with one unknown value', () => {
        it('should properly serialize', () => {
          const htmlValue = '<span style="display: block;">hello</span>';

          expect(html.serialize(html.deserialize(htmlValue))).toEqual(
            '<p><span>hello</span></p>'
          );
        });
      });
      describe('with one unknown value and one known value', () => {
        it('should properly serialize', () => {
          const htmlValue =
            '<span style="display: block; text-decoration: underline;">hello</span>';

          expect(html.serialize(html.deserialize(htmlValue))).toEqual(
            '<p><u>hello</u></p>'
          );
        });
      });
      describe('with two known values', () => {
        it('should properly serialize', () => {
          const htmlValue =
            '<span style="font-weight: bold; text-decoration: underline;">hello</span>';

          expect(html.serialize(html.deserialize(htmlValue))).toEqual(
            '<p><u><strong>hello</strong></u></p>'
          );
        });
      });
      describe('with three known values', () => {
        it('should properly serialize', () => {
          const htmlValue =
            '<span style="font-weight: bold; font-style: italic; text-decoration: underline;">hello</span>';

          expect(html.serialize(html.deserialize(htmlValue))).toEqual(
            '<p><u><em><strong>hello</strong></em></u></p>'
          );
        });
      });
      describe('with four known values', () => {
        it('should properly serialize', () => {
          const htmlValue =
            '<span style="font-weight: bold; font-style: italic; text-decoration-line: underline line-through;">hello</span>';

          expect(html.serialize(html.deserialize(htmlValue))).toEqual(
            '<p><del><u><em><strong>hello</strong></em></u></del></p>'
          );
        });
      });
      describe('with line breaks', () => {
        it('should properly serialize', () => {
          const htmlValue =
            '<p><span style="text-decoration-line: underline;">Underline</span></p><p><span style="text-decoration-line: line-through;">Strikethrough</span></p>';
          expect(html.serialize(html.deserialize(htmlValue))).toEqual(
            '<p><u>Underline</u></p><p><del>Strikethrough</del></p>'
          );
        });
      });
      describe('mixed', () => {
        it('should properly serialize', () => {
          const htmlValue =
            '<span style="font-weight: bold"><span style="font-style: italic;">hello</span></span>';

          expect(html.serialize(html.deserialize(htmlValue))).toEqual(
            '<p><em><strong>hello</strong></em></p>'
          );
        });
      });
    });
  });
});
