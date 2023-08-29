import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import styles from './FullscreenFake.module.css';

export type FullscreenFakeProps = React.PropsWithChildren<{
  className?: string;
  onShow?: () => void;
  onHide?: () => void;
}>;

export type FullscreenFakeHandle = {
  show: () => void;
  hide: () => void;
};

const FullscreenFake: React.ForwardRefRenderFunction<
  FullscreenFakeHandle,
  FullscreenFakeProps
> = ({ onShow, onHide, className, children }, ref) => {
  const [fullscreen, setFullscreen] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setFullscreen(true);
      onShow?.();
    },
    hide() {
      setFullscreen(false);
      onHide?.();
    },
  }));

  // Exit `fullscreen` state when pressing Escape key.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setFullscreen(false);
        onHide?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onHide]);

  return (
    <div className={`${styles.fullscreen} ${className || ''}`} hidden={!fullscreen}>
      {children}
    </div>
  );
};

export default forwardRef(FullscreenFake);
