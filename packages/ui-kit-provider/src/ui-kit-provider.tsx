import type { ReactNode } from 'react';
import {
  RouterProvider,
  type TRouterConfig,
} from '@commercetools-uikit/router-provider';

export type TUIKitProviderProps = {
  /**
   * Router configuration for client-side navigation.
   */
  router: TRouterConfig;
  children: ReactNode;
};

/**
 * Top-level provider for ui-kit.
 * Composes all required context providers (routing, and more in the future).
 */
export const UIKitProvider = (props: TUIKitProviderProps) => {
  return (
    <RouterProvider router={props.router}>{props.children}</RouterProvider>
  );
};
UIKitProvider.displayName = 'UIKitProvider';
