type TFieldLabelProps = {
  title?: unknown;
  hint?: unknown;
  description?: unknown;
  onInfoButtonClick?: unknown;
  hintIcon?: unknown;
  badge?: unknown;
  hasRequiredIndicator?: unknown;
};

export const hasFieldLabel = (props: TFieldLabelProps) =>
  !!(
    props.title ||
    props.hint ||
    props.description ||
    props.onInfoButtonClick ||
    props.hintIcon ||
    props.badge ||
    props.hasRequiredIndicator
  );
