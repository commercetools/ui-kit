import type { TLocationDescriptor, TLocationDescriptorObject } from './types';

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
