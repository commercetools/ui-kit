/**
 * An object describing a location, compatible with the `history` package's
 * LocationDescriptorObject. This allows ui-kit to accept the same location
 * shapes without depending on the `history` package.
 */
export type TLocationDescriptorObject = {
  pathname?: string;
  search?: string;
  hash?: string;
  state?: unknown;
  key?: string;
};

/**
 * A location can be either a URL string or a location descriptor object.
 * This replaces `LocationDescriptor` from the `history` package.
 */
export type TLocationDescriptor = string | TLocationDescriptorObject;

/**
 * Configuration for the router integration.
 */
export type TRouterConfig = {
  /**
   * Function to perform client-side navigation.
   * Typically `history.push` (react-router v5) or `navigate` (react-router v6+).
   */
  navigate: (to: TLocationDescriptor) => void;
};
