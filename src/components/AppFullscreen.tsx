import { AppColor } from '@/colors';
import { useAppController } from '@/use-app-controller';
import { QRCodeSVG } from 'qrcode.react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import styles from './AppFullscreen.module.css';
import { Brightness } from './Brightness';
import { ColorBlock } from './ColorBlock';
import Fullscreen, { FullscreenHandle } from './Fullscreen';
import { Logo } from './Logo';

export type AppFullscreenProps = React.PropsWithChildren<{
  color1: AppColor;
  color2: AppColor | null;
  brighten?: boolean;
}>;

export type AppFullscreenHandle = {
  show: () => void;
  hide: () => void;
};

const AppFullscreen: React.ForwardRefRenderFunction<
  AppFullscreenHandle,
  AppFullscreenProps
> = ({ color1, color2, brighten }, ref) => {
  const lastScrollTop = useRef(0);
  const fullscreenElement = useRef<FullscreenHandle>(null);
  const { canonical } = useAppController();

  useImperativeHandle(ref, () => ({
    show() {
      fullscreenElement.current?.show();
    },
    hide() {
      fullscreenElement.current?.hide();
    },
  }));

  const handleClickClose = useCallback(() => {
    fullscreenElement.current?.hide();
  }, []);

  const handleShow = useCallback(() => {
    document.documentElement.classList.add("fullscreen");
    if (document.scrollingElement) {
      lastScrollTop.current = document.scrollingElement.scrollTop;
      document.scrollingElement.scrollTop = 0;
    }
  }, []);

  const handleHide = useCallback(() => {
    document.documentElement.classList.remove("fullscreen");
    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = lastScrollTop.current;
      lastScrollTop.current = 0;
    }
  }, []);

  const controls = (
    <div>
      <QRCodeSVG
        value={canonical}
        includeMargin
        // bgColor="transparent"
        className="rounded-md m-2"
      />
    </div>
  );

  return (
    <Fullscreen
      className={styles.fullscreen}
      ref={fullscreenElement}
      onShow={handleShow}
      onHide={handleHide}
    >
      {brighten && <Brightness />}
      <ColorBlock color={color1}>
        <Logo />
        <button
          className={styles.close}
          type="button"
          onClick={handleClickClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
              strokeWidth={6}
              stroke="white"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
              strokeWidth={3}
              stroke="currentColor"
            />
          </svg>
        </button>
        {color2 ? null : controls}
      </ColorBlock>
      {color2 && (
        <ColorBlock color={color2}>
          {controls}
        </ColorBlock>
      )}
    </Fullscreen>
  );
};

export default forwardRef(AppFullscreen);
