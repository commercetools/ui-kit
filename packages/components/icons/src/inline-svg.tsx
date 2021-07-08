import type { Props } from './templates/icon.styles';

import React from 'react';
import { oneLine } from 'common-tags';
import { useTheme } from '@emotion/react';
import { getColor, getSizeDimensions } from './templates/icon.styles';

type InlineSvgProps = Props & {
  as: 'image' | 'iframe';
  data: string;
};

const defaultProps: Pick<InlineSvgProps, 'as'> = {
  as: 'image',
};

const fillColorRe = /\sfill="#[A-Fa-f0-9]+"/g;
const dimensionWidthRe = /\swidth="[\w]+"/g;
const dimensionHeightRe = /\sheight="[\w]+"/g;

const InlineSvgAsImage = (props: InlineSvgProps) => {
  const theme = useTheme();
  const fillColor = getColor(props.color, theme);
  const dimensions = getSizeDimensions(props.size);

  // Manually patch the SVG to apply color and sizes, as we can't use css styles.
  // NOTE the leading whitespace is on purpose, as we define the RegExp with `\s`.
  const styledSvg = props.data
    .replace(fillColorRe, ` fill="${fillColor}"`)
    .replace(dimensionWidthRe, ` width="${dimensions.width}"`)
    .replace(dimensionHeightRe, ` height="${dimensions.height}"`);

  // Render SVG as base64 data URI, to prevent any sort of embedded scripts to be executed.
  return (
    <img
      {...dimensions}
      src={`data:image/svg+xml;base64,${btoa(styledSvg)}`}
      alt=""
    />
  );
};
InlineSvgAsImage.displayName = 'InlineSvgAsImage';

const InlineSvgAsIFrame = (props: InlineSvgProps) => {
  const theme = useTheme();
  const fillColor = getColor(props.color, theme);
  const dimensions = getSizeDimensions(props.size);
  const iframeWidth = props.size === 'scale' ? '100%' : dimensions.width;
  const iframeHeight = props.size === 'scale' ? '100%' : dimensions.height;

  const iFrameStyles = oneLine`<style>
    html, body {
      margin: 0;
      padding: 0;
      display: flex;
      overflow: hidden;
      width: ${iframeWidth};
      height: ${iframeHeight};
    }
    svg {
      width: ${dimensions.width};
      height: ${dimensions.height};
    }
    * {
      fill: ${fillColor};
    }
  </style>`;

  // Render SVG within an sandboxed iframe, to prevent any sort of embedded scripts to be executed.
  return (
    // eslint-disable-next-line jsx-a11y/iframe-has-title
    <iframe
      sandbox=""
      srcDoc={`${iFrameStyles}${props.data}`}
      width={iframeWidth}
      height={iframeHeight}
      style={{ border: 0, margin: 0, padding: 0 }}
    />
  );
};
InlineSvgAsIFrame.displayName = 'InlineSvgAsIFrame';

const InlineSvg = (props: InlineSvgProps) => {
  switch (props.as) {
    case 'image':
      return <InlineSvgAsImage {...props} />;
    case 'iframe':
      return <InlineSvgAsIFrame {...props} />;
    default:
      throw new Error(
        `Wrong "as" value: "${props.as}". Expected one of "image" or "iframe".`
      );
  }
};
InlineSvg.defaultProps = defaultProps;

export default InlineSvg;
