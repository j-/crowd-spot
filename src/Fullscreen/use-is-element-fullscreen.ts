import { useEffect, useState } from 'react';

export const useIsElementFullscreen = <T extends Element>(ref: React.RefObject<T>) => {
  const isFullscreenInit = (): boolean => (
    ref.current != null && document.fullscreenElement === ref.current
  );

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
  }, []);

  return isFullscreen;
};
