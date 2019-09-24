import React from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import Html from 'slate-html-serializer';
import Types from 'slate-prop-types';
import omit from 'lodash/omit';
import { Editor } from 'slate-react';
import PlaceholderPlugin from './plugins/placeholder';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import { RenderMarkPlugin, RenderBlockPlugin } from './plugins';
import UndoPlugin from './plugins/undo';
import RedoPlugin from './plugins/redo';
import ListPlugin from './plugins/list';
import MarkPlugin from './plugins/mark';
import renderEditor from './editor';
import rules from './utils/rules';

// Create a new serializer instance with our `rules` from above.
const html = new Html({ rules });

const propsToOmit = ['value'];

const isEmpty = value => value.document.text === '';

const plugins = [
  {
    queries: {
      // used for the placeholder plugin
      shouldUsePlaceholder: editor => {
        const isEditorEmpty = isEmpty(editor.value);
        const hasOneNode =
          editor.value.document.nodes.map(node => node.text).toArray()
            .length === 1;
        const blocks = editor.value.blocks.map(block => block.type).toArray();
        const hasOneBlock = blocks.length === 1;
        const isParagraph = blocks[0] && blocks[0] === 'paragraph';

        const shouldUsePlaceholder =
          isEditorEmpty && hasOneNode && hasOneBlock && isParagraph;

        return shouldUsePlaceholder;
      },
    },
  },
  PlaceholderPlugin({
    when: 'shouldUsePlaceholder',
    style: {
      verticalAlign: 'inherit',
      fontSize: '1rem',
      fontWeight: 'normal',
    },
  }),
  MarkPlugin({
    typeName: 'bold',
    hotkey: 'mod+b',
    command: 'toggleBoldMark',
    query: 'hasBoldMark',
    // eslint-disable-next-line react/display-name
    RenderMark: props => <strong {...props} />,
  }),
  MarkPlugin({
    typeName: 'italic',
    hotkey: 'mod+i',
    command: 'toggleItalicMark',
    query: 'hasItalicMark',
    // eslint-disable-next-line react/display-name
    RenderMark: props => <em {...props} />,
  }),
  MarkPlugin({
    typeName: 'underlined',
    hotkey: 'mod+u',
    command: 'toggleUnderlinedMark',
    query: 'hasUnderlinedMark',
    // eslint-disable-next-line react/display-name
    RenderMark: props => <u {...props} />,
  }),
  RenderMarkPlugin(),
  RenderBlockPlugin(),
  UndoPlugin(),
  RedoPlugin(),
  ListPlugin(),
];

class RichTextInput extends React.Component {
  onValueChange = ({ value }) => {
    const event = {
      target: {
        id: this.props.id,
        name: this.props.name,
        value,
      },
    };
    this.props.onChange(event);
  };

  shouldComponentUpdate(nextProps) {
    let remainingPropsHaveChanged = false;
    const remainingProps = omit(this.props, propsToOmit);

    // check remaining props normally using !==
    Object.entries(remainingProps).forEach(([key, val]) => {
      if (nextProps[key] !== val) remainingPropsHaveChanged = true;
    });

    if (remainingPropsHaveChanged) return true;

    // since value uses immutableJS, we should use .equals
    if (nextProps.value.equals(this.props.value)) {
      return false;
    }

    return false;
  }

  render() {
    return (
      <Editor
        {...filterDataAttributes(this.props)}
        id={this.props.id}
        name={this.props.name}
        disabled={this.props.isDisabled}
        readOnly={this.props.isReadOnly}
        value={this.props.value}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        // we can only pass this.props to the Editor that Slate understands without getting
        // warning in the console,
        // so instead we pass our extra this.props through this `options` prop.
        options={{
          horizontalConstraint: this.props.horizontalConstraint,
          defaultExpandMultilineText: this.props.defaultExpandMultilineText,
          hasWarning: this.props.hasWarning,
          hasError: this.props.hasError,
          placeholder: this.props.placeholder,
        }}
        onChange={this.onValueChange}
        plugins={plugins}
        renderEditor={renderEditor}
      />
    );
  }
}

RichTextInput.defaultProps = {
  defaultExpandMultilineText: false,
  horizontalConstraint: 'scale',
  placeholder: '',
};

RichTextInput.displayName = 'RichTextInput';

RichTextInput.serialize = html.serialize;
RichTextInput.deserialize = html.deserialize;
RichTextInput.isEmpty = isEmpty;

RichTextInput.propTypes = {
  defaultExpandMultilineText: PropTypes.bool,
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  horizontalConstraint: PropTypes.oneOf(['m', 'l', 'xl', 'scale']),
  onChange: requiredIf(PropTypes.func, props => !props.isReadOnly),
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  value: Types.value.isRequired,
};

export default RichTextInput;
