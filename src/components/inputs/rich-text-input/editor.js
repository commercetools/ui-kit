// import React from 'react';
// import PropTypes from 'prop-types';
// import { css } from '@emotion/core';
// import StyleDropdown from './dropdown';
// import Types from 'slate-prop-types';
// import filterDataAttributes from '../../../utils/filter-data-attributes';
// import {
//   BoldIcon,
//   ItalicIcon,
//   UnorderedListIcon,
//   OrderedListIcon,
//   MoreStylesIcon,
//   UnderlineIcon,
//   SuperscriptIcon,
//   SubscriptIcon,
//   StrikethroughIcon,
//   RedoIcon,
// } from './icons';
// import Spacings from '../../spacings';
// import { RevertIcon, CaretDownIcon } from '../../icons';
// import Constraints from '../../constraints';
// import FlatButton from '../../buttons/flat-button';
// import MarkButton from './buttons/mark-button';
// import Collapsible from '../../collapsible';
// import { Toolbar, EditorContainer, Container } from './rich-text-input.styles';
// import Divider from './divider';
//
// const dropdownOptions = [
//   { label: 'Paragraph', value: 'paragraph' },
//   { label: 'Headline H1', value: 'heading-one' },
//   { label: 'Headline H2', value: 'heading-two' },
//   { label: 'Headline H3', value: 'heading-three' },
//   { label: 'Headline H4', value: 'heading-four' },
//   { label: 'Headline H5', value: 'heading-five' },
//   { label: 'Quote', value: 'block-quote' },
//   { label: 'Preformatted', value: 'code' },
// ];
//
// const markDropdownOptions = [
//   { label: 'Strikethrough', value: 'strikethrough' },
//   { label: 'Superscript', value: 'superscript' },
//   { label: 'Subscript', value: 'subscript' },
// ];
//
// const getDropdownItemStyles = value => {
//   switch (value) {
//     case 'heading-one':
//       return css`
//         font-size: 1.75rem;
//       `;
//     case 'heading-two':
//       return css`
//         font-size: 1.5rem;
//       `;
//     case 'heading-three':
//       return css`
//         font-size: 1.3rem;
//       `;
//     case 'heading-four':
//       return css`
//         font-size: 1.2rem;
//       `;
//     case 'heading-five':
//       return css`
//         font-size: 1.1rem;
//       `;
//
//     default:
//       return css``;
//   }
// };
//
// // eslint-disable-next-line
// const StyleDropdownItem = props => {
//   return (
//     <StyleDropdown.DropdownItem
//       {...props}
//       // eslint-disable-next-line react/prop-types
//       css={getDropdownItemStyles(props.value)}
//     />
//   );
// };
//
// // eslint-disable-next-line
// const StyleDropdownLabel = () => {
//   return (
//     <Spacings.Inline scale="xs" alignItems="center">
//       <span>Style</span>
//       <CaretDownIcon size="small" />
//     </Spacings.Inline>
//   );
// };
//
// // eslint-disable-next-line
// const MoreStylesLabel = () => {
//   return <MoreStylesIcon size="medium" />;
// };
//
// // eslint-disable-next-line
// const MoreStylesDropdownItem = props => {
//   // eslint-disable-next-line
//   const { children } = props;
//   let Icon;
//   // eslint-disable-next-line
//   switch (props.value) {
//     case 'subscript':
//       Icon = SubscriptIcon;
//       break;
//     case 'strikethrough':
//       Icon = StrikethroughIcon;
//       break;
//     default:
//       Icon = SuperscriptIcon;
//   }
//
//   return (
//     <StyleDropdown.DropdownItem {...props}>
//       <Spacings.Inline
//         scale="xs"
//         alignItems="center"
//         justifyContent="flex-start"
//       >
//         <Icon size="medium" />
//         <div>{children}</div>
//       </Spacings.Inline>
//     </StyleDropdown.DropdownItem>
//   );
// };
//
// const Editor = (props, editor, next) => {
//   const hasBlock = React.useCallback(
//     type => {
//       return props.value.blocks.some(node => node.type === type);
//     },
//     [props.value]
//   );
//
//
//   const onClickMark = type => {
//       thiseditor.toggleMark(type);
//     };
//
//
//
//   const children = next();
//
//   const passedProps = {
//     name: props.name,
//     id: props.id,
//     isDisabled: props.disabled,
//     hasError: props.hasError,
//     hasWarning: props.hasWarning,
//     isReadOnly: props.readOnly,
//     ...filterDataAttributes(props),
//   };
//
//   return (
//     <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
//       <Collapsible isDefaultClosed={false}>
//         {({ isOpen, toggle }) => {
//           return (
//             <div>
//               <Container
//                 {...passedProps}
//                 tabIndex={-1}
//                 isOpen={isOpen}
//                 onFocus={() => {
//                   if (!isOpen) {
//                     toggle();
//                   }
//                 }}
//               >
//                 <Toolbar {...passedProps} isOpen={isOpen}>
//                   <StyleDropdown
//                     label="Style"
//                     options={dropdownOptions}
//                     components={{
//                       DropdownLabel: StyleDropdownLabel,
//                       DropdownItem: StyleDropdownItem,
//                     }}
//                     value={(() => {
//                       if (hasBlock('heading-one')) return 'heading-one';
//                       if (hasBlock('heading-two')) return 'heading-two';
//                       if (hasBlock('heading-three')) return 'heading-three';
//                       if (hasBlock('heading-four')) return 'heading-four';
//                       if (hasBlock('heading-five')) return 'heading-five';
//                       if (hasBlock('block-quote')) return 'block-quote';
//                       if (hasBlock('code')) return 'code';
//                       if (hasBlock('paragraph')) return 'paragraph';
//                       return '';
//                     })()}
//                     onChange={this.onChangeStyleDropdown}
//                   />
//                   <MarkButton
//                     type="bold"
//                     icon={<BoldIcon size="medium" />}
//                     onClickMark={onClickMark}
//                   />
//                   {this.renderMarkButton('bold', <BoldIcon size="medium" />)}
//                   {this.renderMarkButton(
//                     'italic',
//                     <ItalicIcon size="medium" />
//                   )}
//                   {this.renderMarkButton(
//                     'underlined',
//                     <UnderlineIcon size="medium" />
//                   )}
//
//                   <StyleDropdown
//                     label="More styles"
//                     options={markDropdownOptions}
//                     components={{
//                       DropdownItem: MoreStylesDropdownItem,
//                       DropdownLabel: MoreStylesLabel,
//                     }}
//                     value={(() => {
//                       if (this.hasMark('subscript')) return 'subscript';
//                       if (this.hasMark('superscript')) return 'superscript';
//                       if (this.hasMark('strikethrough')) return 'strikethrough';
//                       return '';
//                     })()}
//                     onChange={this.onChangeMarkDropdown}
//                   />
//
//                   <Divider />
//
//                   {this.renderBlockButton(
//                     'numbered-list',
//                     <OrderedListIcon size="medium" />
//                   )}
//                   {this.renderBlockButton(
//                     'bulleted-list',
//                     <UnorderedListIcon size="medium" />
//                   )}
//
//                   <div
//                     css={css`
//                       display: flex;
//                       flex: 1;
//                       justify-content: flex-end;
//                     `}
//                   >
//                     {this.renderUndoButton()}
//                     {this.renderRedoButton()}
//                   </div>
//                 </Toolbar>
//                 <EditorContainer {...passedProps} isOpen={isOpen}>
//                   {children}
//                 </EditorContainer>
//               </Container>
//               <div
//                 css={css`
//                   display: flex;
//                   justify-content: flex-end;
//                 `}
//               >
//                 <FlatButton
//                   onClick={toggle}
//                   label={isOpen ? 'Collapse' : 'Expand'}
//                 />
//               </div>
//             </div>
//           );
//         }}
//       </Collapsible>
//     </Constraints.Horizontal>
//   );
// };
//
// Editor.displayName = 'Editor';
// Editor.propTypes = {
//   name: PropTypes.string,
//   id: PropTypes.string,
//   disabled: PropTypes.bool,
//   hasError: PropTypes.bool,
//   hasWarning: PropTypes.bool,
//   readOnly: PropTypes.bool,
//   value: Types.value.isRequired,
// };
//
// export default Editor;
