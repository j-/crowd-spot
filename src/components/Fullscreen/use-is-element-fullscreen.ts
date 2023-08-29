import { useCallback, useEffect, useState } from 'react';

export const useIsElementFullscreen = <T extends Element>(ref: React.RefObject<T>) => {
  const isFullscreenInit = useCallback((): boolean => (
    ref.current != null && document.fullscreenElement === ref.current
  ), [ref]);

  const [isFullscreen, setIsFullscreen] = useState(isFullscreenInit);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    setIsFullscreen(isFullscreenInit);

    const handleFullScreenChange = () => {
      setIsFullscreen(isFullscreenInit);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, [isFullscreenInit, ref]);

  return isFullscreen;
};
