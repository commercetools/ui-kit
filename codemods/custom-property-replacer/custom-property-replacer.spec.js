import path from 'path';
import postcss from 'postcss';
import plugin from '.';

const processor = postcss([
  plugin({ file: path.resolve(__dirname, './v10/variable-mapping.json') }),
]);

const process = (input) => processor.process(input).css;

describe('custom-property-replacer', () => {
  describe('with nested selectors', () => {
    it('should replace known variables', () => {
      expect(process('a { span { color: var(--color-green) }}')).toEqual(
        'a { span { color: var(--color-primary) }}'
      );
    });
  });
  it('should replace known variables', () => {
    expect(process('a { color: var(--color-green) }')).toEqual(
      'a { color: var(--color-primary) }'
    );
  });
  it('should ignore unknown variables', () => {
    expect(process('a { color: var(--color-green-99) }')).toEqual(
      'a { color: var(--color-green-99) }'
    );
  });

  it('throws an error if the file option is not defined', () => {
    expect(() => {
      postcss(plugin());
    }).toThrow(
      'postcss-var-replacer must be configured with the JSON file to use'
    );
  });
});
