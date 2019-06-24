import postcss from 'postcss';
import path from 'path';
import plugin from '..';

const processor = postcss([
  plugin({ file: path.resolve(__dirname, '../variable-mapping.json') }),
]);

const process = input => processor.process(input).css;

describe('custom-property-replacer', () => {
  describe('with nested selectors', () => {
    expect(process('a { span { color: var(--color-green) }}')).toEqual(
      'a { span { color: var(--color-primary) }}'
    );
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
    const badProcessor = postcss(plugin());
    const badProcess = input => badProcessor.process(input).css;

    expect(() => {
      badProcess('a { color: var(--color-green-40) }');
    }).toThrow(
      'postcss-var-replacer must be configured with the JSON file to use'
    );
  });
});
