import kebabCase from 'lodash/kebabCase';

/*
  This will transform a map of tokens names/values to
  a map of css var names/values

  Example input:
  {
    borderRadius4: '4px',
  }
  Example output:
  {
     '--border-radius-4': '4px',
  }
*/
function transformTokensToCssVarsValues(
  tokens: Record<string, string>
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(tokens).map(([key, value]) => [`--${kebabCase(key)}`, value])
  );
}

/*
  This will transform a map of tokens names/values to
  a map of token names/css var definitions.
  Including default css value in the definition is optional (true by default)

  Example input:
  {
    borderRadius4: '4px',
  }
  Example output:
  {
    borderRadius4: 'var(--border-radius-4, 4px)',
  }
*/
function transformTokensToCssVarsReferences(
  tokens: Record<string, string>,
  { includeDefaultValue } = { includeDefaultValue: true }
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(tokens).map(([key, value]) => [
      key,
      `var(--${kebabCase(key)}${includeDefaultValue ? ', ' + value : ''})`,
    ])
  );
}

export { transformTokensToCssVarsValues, transformTokensToCssVarsReferences };
