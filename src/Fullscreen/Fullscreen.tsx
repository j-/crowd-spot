import { forwardRef, useImperativeHandle, useRef } from 'react';
import FullscreenFake, { FullscreenFakeHandle } from './FullscreenFake';
import FullscreenReal, { FullscreenRealHandle } from './FullscreenReal';
import { useIsFullscreenEnabled } from './use-is-fullscreen-enabled';

export type FullscreenProps = React.PropsWithChildren<{
  className?: string;
  onShow?: () => void;
  onHide?: () => void;
}>;

export type FullscreenHandle = {
  show: () => void;
  hide: () => void;
};

const Fullscreen: React.ForwardRefRenderFunction<
  FullscreenHandle,
  FullscreenProps
> = ({ onShow, onHide, className, children }, ref) => {
  const fullscreenRealRef = useRef<FullscreenRealHandle>(null);
  const fullscreenFakeRef = useRef<FullscreenFakeHandle>(null);

  const isFullscreenEnabled = useIsFullscreenEnabled();

  useImperativeHandle(ref, () => ({
    show() {
      fullscreenRealRef.current?.show();
      fullscreenFakeRef.current?.show();
      onShow?.();
    },
    hide() {
      fullscreenRealRef.current?.hide();
      fullscreenFakeRef.current?.hide();
      onHide?.();
    },
  }));

  return isFullscreenEnabled ? (
    <FullscreenReal
      ref={fullscreenRealRef}
      onShow={onShow}
      onHide={onHide}
      className={className}
    >
      {children}
    </FullscreenReal>
  ) : (
    <FullscreenFake
      ref={fullscreenFakeRef}
      onShow={onShow}
      onHide={onHide}
      className={className}
    >
      {children}
    </FullscreenFake>
  );
};

export default forwardRef(Fullscreen);
