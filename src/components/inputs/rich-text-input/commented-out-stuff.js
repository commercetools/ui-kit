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
// const markDropdownOptions = [
//   { label: 'Strikethrough', value: 'strikethrough' },
//   { label: 'Superscript', value: 'superscript' },
//   { label: 'Subscript', value: 'subscript' },
// ];
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

// <StyleDropdown
//   label="Style"
//   options={dropdownOptions}
//   components={{
//     DropdownLabel: StyleDropdownLabel,
//     DropdownItem: StyleDropdownItem,
//   }}
//   value={(() => {
//     if (hasBlock('heading-one')) return 'heading-one';
//     if (hasBlock('heading-two')) return 'heading-two';
//     if (hasBlock('heading-three')) return 'heading-three';
//     if (hasBlock('heading-four')) return 'heading-four';
//     if (hasBlock('heading-five')) return 'heading-five';
//     if (hasBlock('block-quote')) return 'block-quote';
//     if (hasBlock('code')) return 'code';
//     if (hasBlock('paragraph')) return 'paragraph';
//     return '';
//   })()}
//   onChange={this.onChangeStyleDropdown}
// />
//

// onChangeStyleDropdown = selectedValue => {
//   const selectedType = selectedValue.value;
//   const isActive = this.hasBlock(selectedType);
//
//   const { editor } = this;
//   editor.setBlocks(isActive ? DEFAULT_NODE : selectedType);
// };
//

// onChangeMarkDropdown = selectedValue => {
//   const selectedType = selectedValue.value;
//
//   if (selectedType === 'subscript') {
//     if (!this.hasMark('subscript') && this.hasMark('superscript'))
//       this.editor.toggleMark('superscript');
//   }
//
//   if (selectedType === 'superscript') {
//     if (!this.hasMark('superscript') && this.hasMark('subscript')) {
//       this.editor.toggleMark('subscript');
//     }
//   }
//
//   this.editor.toggleMark(selectedType);
// };

// <StyleDropdown
//   label="More styles"
//   options={markDropdownOptions}
//   components={{
//     DropdownItem: MoreStylesDropdownItem,
//     DropdownLabel: MoreStylesLabel,
//   }}
//   value={(() => {
//     if (hasMark('subscript')) return 'subscript';
//     if (hasMark('superscript')) return 'superscript';
//     if (hasMark('strikethrough')) return 'strikethrough';
//     return '';
//   })()}
//   onChange={this.onChangeMarkDropdown}
// />

// renderBlockButton = (type, icon) => {
//   let isActive = this.hasBlock(type);
//
//   if (['numbered-list', 'bulleted-list'].includes(type)) {
//     const {
//       value: { document, blocks },
//     } = this.props;
//
//     if (blocks.size > 0) {
//       const parent = document.getParent(blocks.first().key);
//       isActive = this.hasBlock('list-item') && parent && parent.type === type;
//     }
//   }
//
//   return (
//     <Button
//       active={isActive}
//       label={type}
//       onClick={() => this.onClickBlock(type)}
//       icon={icon}
//     ></Button>
//   );
// };
//
//

//
// hasBlock = type => this.props.value.blocks.some(node => node.type === type);
//
// onClickBlock = type => {
//   const { editor } = this;
//   const { value } = editor;
//   const { document } = value;
//
//   // Handle everything but list buttons.
//   if (type !== 'bulleted-list' && type !== 'numbered-list') {
//     const isActive = this.hasBlock(type);
//     const isList = this.hasBlock('list-item');
//
//     if (isList) {
//       editor
//         .setBlocks(isActive ? DEFAULT_NODE : type)
//         .unwrapBlock('bulleted-list')
//         .unwrapBlock('numbered-list');
//     } else {
//       editor.setBlocks(isActive ? DEFAULT_NODE : type);
//     }
//   } else {
//     // Handle the extra wrapping required for list buttons.
//     const isList = this.hasBlock('list-item');
//     const isType = value.blocks.some(block => {
//       return !!document.getClosest(block.key, parent => parent.type === type);
//     });
//
//     if (isList && isType) {
//       editor
//         .setBlocks(DEFAULT_NODE)
//         .unwrapBlock('bulleted-list')
//         .unwrapBlock('numbered-list');
//     } else if (isList) {
//       editor
//         .unwrapBlock(
//           type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
//         )
//         .wrapBlock(type);
//     } else {
//       editor.setBlocks('list-item').wrapBlock(type);
//     }
//   }
// };
