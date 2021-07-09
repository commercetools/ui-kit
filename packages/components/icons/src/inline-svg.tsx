import type { Props } from './templates/icon.styles';

import React, { useMemo } from 'react';
import DOMPurify from 'dompurify';
import SVG from 'react-inlinesvg';
import { useTheme } from '@emotion/react';
import { getIconStyles } from './templates/icon.styles';

type InlineSvgProps = Props & {
  data: string;
};

const InlineSvg = (props: InlineSvgProps) => {
  const theme = useTheme();
  const sanitized = useMemo(
    () =>
      DOMPurify.sanitize(props.data, {
        USE_PROFILES: { svg: true },
        FORBID_ATTR: [
          // To avoid injection by using `style="filter:url(\"data:image/svg+xml,<svg`
          'style',
        ],
      }),
    [props.data]
  );
  return <SVG src={sanitized} css={getIconStyles(props, theme)} />;
};

export default InlineSvg;
