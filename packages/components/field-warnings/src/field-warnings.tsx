import { ReactNode } from 'react';
import { WarningMessage } from '@commercetools-uikit/messages';

const isObject = (obj: unknown): boolean => typeof obj === 'object';

type TWarningRenderer = (key: string, warning?: boolean) => ReactNode;

export type TFieldWarnings = Record<string, boolean>;
export type TFieldWarningsProps = {
  /**
   * ID of the warning field.
   */
  id?: string;
  /**
   * List of warnings. Only entries with truthy values will count as active warnings.
   */
  warnings?: TFieldWarnings;
  /**
   * `true` when the warning messages should be rendered. Usually you'd pass in a `touched` state of fields.
   */
  isVisible?: boolean;
  /**
   * Function which gets called with each warning key (from the `warnings` prop) and may render a warning message or return `null` to hand the warning handling off to `renderDefaultWarning`.
   */
  renderWarning?: TWarningRenderer;
  /**
   * Function which gets called with each warning key (from the `warnings` prop) for which `renderWarning` returned `null`.
   * It may render a warning message or return `null` to hand the warning handling off to `FieldWarning`s built-in warning handling.
   */
  renderDefaultWarning?: TWarningRenderer;
};

const FieldWarnings = (props: TFieldWarningsProps) => {
  if (!props.isVisible) return null;
  if (!props.warnings || !isObject(props.warnings)) return null;

  return (
    <>
      {Object.entries(props.warnings)
        // Only render warnings which have truthy values, to avoid
        // rendering a warning that has falsy values.
        .filter(([, warning]) => warning)
        .map(([key, warning]) => {
          // We might not use a custom warning renderer, so we fall back to null
          // to enable the default warnings to kick in
          const warningElement = props.renderWarning
            ? props.renderWarning(key, warning)
            : null;
          // Render a custom warning if one was provided.
          // Custom warnings take precedence over the default warnings
          if (warningElement)
            return (
              <WarningMessage key={key} id={props.id}>
                {warningElement}
              </WarningMessage>
            );

          const defaultWarningElement = props.renderDefaultWarning
            ? props.renderDefaultWarning(key, warning)
            : null;
          // Render a default warning if one was provided.
          // Default warnings take precedence over the known warnings
          if (defaultWarningElement)
            return (
              <WarningMessage key={key} id={props.id}>
                {defaultWarningElement}
              </WarningMessage>
            );
          // Render nothing in case the warning is not known and no custom warning
          // was returned
          return null;
        })}
    </>
  );
};

FieldWarnings.displayName = 'FieldWarnings';

export default FieldWarnings;
