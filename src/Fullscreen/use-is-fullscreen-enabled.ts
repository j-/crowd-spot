import { useEffect, useState } from 'react';

const fullscreenEnabledInit = () => (
  document ? document.fullscreenEnabled : false
);

export const useIsFullscreenEnabled = () => {
  const [isFullscreenEnabled, setIsFullscreenEnabled] = useState(
    fullscreenEnabledInit
  );

  useEffect(() => {
    setIsFullscreenEnabled(fullscreenEnabledInit);

    const handleFullscreenError = () => {
      setIsFullscreenEnabled(false);
    };

    document.addEventListener('fullscreenerror', handleFullscreenError);

    return () => {
      document.removeEventListener('fullscreenerror', handleFullscreenError);
    }
  }, []);

  return isFullscreenEnabled;
};
