import {
  transformTokensToCssVarsValues,
  transformTokensToCssVarsReferences,
} from './utils';

describe('Utils', () => {
  const tokens = {
    colorPrimary: '#00b39e',
    borderRadius4: '4px',
    borderForButtonAsSecondary: '1px solid var(--color-neutral)',
    paddingForCard: `var(--spacing-m, 16px) var(--spacing-xl, 32px)`,
  };

  describe('transformTokensToCssVarsValues', () => {
    it('should transform tokens to css var values', () => {
      const transformed = transformTokensToCssVarsValues(tokens);

      expect(transformed).toMatchInlineSnapshot(`
        {
          "--border-for-button-as-secondary": "1px solid var(--color-neutral)",
          "--border-radius-4": "4px",
          "--color-primary": "#00b39e",
          "--padding-for-card": "var(--spacing-m, 16px) var(--spacing-xl, 32px)",
        }
      `);
    });
  });

  describe('transformTokensToCssVarsReferences', () => {
    describe('with includeDefaultValue default value (true)', () => {
      it('should transform tokens to css var definitions', () => {
        const transformed = transformTokensToCssVarsReferences(tokens);

        expect(transformed).toMatchInlineSnapshot(`
          {
            "borderForButtonAsSecondary": "var(--border-for-button-as-secondary, 1px solid var(--color-neutral))",
            "borderRadius4": "var(--border-radius-4, 4px)",
            "colorPrimary": "var(--color-primary, #00b39e)",
            "paddingForCard": "var(--padding-for-card, var(--spacing-m, 16px) var(--spacing-xl, 32px))",
          }
        `);
      });
    });

    describe('with includeDefaultValue default value set to false', () => {
      it('should transform tokens to css var definitions', () => {
        const transformed = transformTokensToCssVarsReferences(tokens, {
          includeDefaultValue: false,
        });

        expect(transformed).toMatchInlineSnapshot(`
          {
            "borderForButtonAsSecondary": "var(--border-for-button-as-secondary)",
            "borderRadius4": "var(--border-radius-4)",
            "colorPrimary": "var(--color-primary)",
            "paddingForCard": "var(--padding-for-card)",
          }
        `);
      });
    });
  });
});
