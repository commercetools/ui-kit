import type { ReactNode } from 'react';
import { useSlate } from 'slate-react';
import Button from './rich-text-body-button';
import {
  isMarkActive,
  isBlockActive,
  toggleMark,
  toggleBlock,
} from '../slate-helpers';

type TButtonProps = {
  format: string;
  isDisabled?: boolean;
  label: string;
  isReadOnly?: boolean;
  children: ReactNode;
};

const MarkButton = (props: TButtonProps) => {
  const editor = useSlate();
  return (
    <Button
      isDisabled={props.isDisabled}
      isReadOnly={props.isReadOnly}
      isActive={isMarkActive(editor, props.format)}
      onClick={(event) => {
        event.preventDefault();
        toggleMark(editor, props.format);
      }}
      label={props.label}
    >
      {props.children}
    </Button>
  );
};

const BlockButton = (props: TButtonProps) => {
  const editor = useSlate();
  return (
    <Button
      isDisabled={props.isDisabled}
      isReadOnly={props.isReadOnly}
      isActive={isBlockActive(editor, props.format)}
      onClick={(event) => {
        event.preventDefault();
        toggleBlock(editor, props.format);
      }}
      label={props.label}
    >
      {props.children}
    </Button>
  );
};

export { MarkButton, BlockButton };
