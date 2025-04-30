import {
  cloneElement,
  isValidElement,
  useMemo,
  type ReactElement,
  type HTMLAttributes,
} from 'react';
import DOMPurify from 'dompurify';
import convert from 'react-from-dom';
import { ClassNames } from '@emotion/react';
import { canUseDOM } from '@commercetools-uikit/utils';
import {
  getIconStyles,
  type TIconProps,
} from '@commercetools-uikit/design-system';

export type InlineSvgProps = TIconProps & {
  data: string;
};

type TSvgReactElement = ReactElement<HTMLAttributes<SVGElement>, 'svg'>;

const InlineSvg = (props: InlineSvgProps) => {
  const sanitized = useMemo(() => {
    if (!canUseDOM) {
      return props.data;
    }
    return DOMPurify.sanitize(props.data, {
      USE_PROFILES: { svg: true },
      FORBID_ATTR: [
        // To avoid injection by using `style="filter:url(\"data:image/svg+xml,<svg`
        'style',
      ],
    });
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
function useStringToReactElement(data: string): TSvgReactElement | null {
  return useMemo<TSvgReactElement | null>(() => {
    if (!canUseDOM) {
      return null;
    }

    try {
      const node = convert(data, { nodeOnly: true });

      if (!node || !(node instanceof SVGSVGElement)) {
        throw new Error('Could not convert the string to a DOM node');
      }

      const element = convert(node) as TSvgReactElement;

      if (!element || !isValidElement<HTMLAttributes<SVGElement>>(element)) {
        throw new Error('Could not convert the DOM node to a React element');
      }
      return element;
    } catch (error) {
      console.error(error);
      return null;
    }
  }, [data]);
}
