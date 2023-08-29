import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { useIsElementFullscreen } from './use-is-element-fullscreen';

export type FullscreenRealProps = React.PropsWithChildren<{
  className?: string;
  onShow?: () => void;
  onHide?: () => void;
}>;

export type FullscreenRealHandle = {
  show: () => void;
  hide: () => void;
};

const FullscreenReal: React.ForwardRefRenderFunction<
  FullscreenRealHandle,
  FullscreenRealProps
> = ({ onShow, onHide, className, children }, ref) => {
  const fullscreenElementRef = useRef<HTMLDivElement>(null);
  const visible = useIsElementFullscreen(fullscreenElementRef);

  useImperativeHandle(ref, () => ({
    show() {
      fullscreenElementRef.current?.requestFullscreen();
      onShow?.();
    },
    hide() {
      document.exitFullscreen();
      onHide?.();
    },
  }));

  // Exit `fullscreen` state when pressing Escape key.
  useEffect(() => {
    const element = fullscreenElementRef.current;
    if (!element) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        document.exitFullscreen();
        onHide?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onHide]);

  return (
    <div
      className={`FullscreenReal ${className || ''}`}
      ref={fullscreenElementRef}
      hidden={!visible}
    >
      {children}
    </div>
  );
};

export default forwardRef(FullscreenReal);
