import { useCallback, useMemo, useRef } from 'react';
import { AppFullscreenHandle } from './components/AppFullscreen';

export const useFullscreen = () => {
  const ref = useRef<AppFullscreenHandle>(null);

  const show = useCallback(() => {
    ref.current?.show();
  }, []);

  return useMemo(() => ({
    ref,
    show,
  }), [ref, show]);
};
