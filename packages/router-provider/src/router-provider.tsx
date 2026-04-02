import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { TRouterConfig, TLocationDescriptor } from './types';

const RouterContext = createContext<TRouterConfig | null>(null);

export type TRouterProviderProps = {
  router: TRouterConfig;
  children: ReactNode;
};

/**
 * Provides router configuration (navigate function) to all ui-kit components.
 */
export const RouterProvider = (props: TRouterProviderProps) => {
  const value = useMemo(() => props.router, [props.router]);
  return (
    <RouterContext.Provider value={value}>
      {props.children}
    </RouterContext.Provider>
  );
};
RouterProvider.displayName = 'RouterProvider';

/**
 * Returns the navigate function from the nearest RouterProvider.
 * Returns `null` if no provider is found (links fall back to default browser navigation).
 */
export const useNavigate = (): ((to: TLocationDescriptor) => void) | null => {
  const context = useContext(RouterContext);
  return context?.navigate ?? null;
};
