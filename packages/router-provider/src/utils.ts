import type { TLocationDescriptor, TLocationDescriptorObject } from './types';

/**
 * Returns true if the click event should be handled by navigate()
 * rather than the browser's default <a> behavior.
 * Mirrors the guard react-router's <Link> uses internally.
 */
export function shouldNavigate(
  event: Pick<
    MouseEvent,
    | 'button'
    | 'metaKey'
    | 'altKey'
    | 'ctrlKey'
    | 'shiftKey'
    | 'defaultPrevented'
  >
): boolean {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.defaultPrevented
  );
}

/**
 * Converts a TLocationDescriptor (string or object) to a URL string.
 * Used to set the `href` attribute on `<a>` tags.
 */
export function locationDescriptorToString(to: TLocationDescriptor): string {
  if (typeof to === 'string') return to;

  const obj = to as TLocationDescriptorObject;
  let url = obj.pathname || '';
  if (obj.search) {
    url += obj.search.startsWith('?') ? obj.search : `?${obj.search}`;
  }
  if (obj.hash) {
    url += obj.hash.startsWith('#') ? obj.hash : `#${obj.hash}`;
  }
  return url;
}
