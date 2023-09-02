import { useEffect, useRef } from 'react';
import { useAppController } from './use-app-controller';

export const useInitializeRoute = (slug: string) => {
  const { initialize } = useAppController();
  const didInitializeRef = useRef(false);

  useEffect(() => {
    if (!didInitializeRef.current) {
      initialize(slug);
      didInitializeRef.current = true;
    }
  }, [initialize, slug]);
};
