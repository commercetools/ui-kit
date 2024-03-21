import type { Props } from '../templates/icon.styles';

import {
  cloneElement,
  isValidElement,
  useMemo,
  type ReactElement,
} from 'react';
import DOMPurify from 'dompurify';
import convert from 'react-from-dom';
import { ClassNames } from '@emotion/react';
import { canUseDOM } from '@commercetools-uikit/utils';
import { getIconStyles } from '../templates/icon.styles';

export type InlineSvgProps = Props & {
  data: string;
};

const InlineSvg = (props: InlineSvgProps) => {
  const sanitized = useMemo(() => {
    if (!canUseDOM) {
      return props.data;
    }
    return DOMPurify.sanitize(props.data, {
      USE_PROFILES: { svg: true },
      RETURN_DOM: true,
      FORBID_ATTR: [
        // To avoid injection by using `style="filter:url(\"data:image/svg+xml,<svg`
        'style',
      ],
    }).innerHTML;
  }, [props.data]);
  const svgElement = useStringToReactElement(sanitized);

  if (svgElement) {
    return (
      <ClassNames>
        {({ css }) =>
          cloneElement(svgElement, {
            className: css(getIconStyles(props)),
          })
        }
      </ClassNames>
    );
  }

  return null;
};

export default InlineSvg;

// Inspired by https://github.com/gilbarbara/react-inlinesvg
function useStringToReactElement(data: string): ReactElement | null {
  return useMemo(() => {
    if (!canUseDOM) {
      return null;
    }

    try {
      const node = convert(data, { nodeOnly: true });

      if (!node || !(node instanceof SVGSVGElement)) {
        throw new Error('Could not convert the string to a DOM node');
      }

      const element = convert(node);

      if (!element || !isValidElement(element)) {
        throw new Error('Could not convert the DOM node to a React element');
      }
      return element;
    } catch (error) {
      console.error(error);
      return null;
    }
  }, [data]);
}
