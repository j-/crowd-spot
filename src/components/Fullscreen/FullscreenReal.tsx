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
      if (document.fullscreenElement) {
        document.exitFullscreen();
        onHide?.();
      }
    },
  }));

  // Exit `fullscreen` state when pressing Escape key.
  useEffect(() => {
    const element = fullscreenElementRef.current;
    if (!element) return;

    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        onShow?.();
      } else {
        onHide?.();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [onHide, onShow]);

  return (
    <div
      className={className}
      ref={fullscreenElementRef}
      hidden={!visible}
    >
      {children}
    </div>
  );
};

export default forwardRef(FullscreenReal);
