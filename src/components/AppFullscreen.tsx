import { AppColor } from '@/colors';
import { useAppController } from '@/use-app-controller';
import { useTorch } from '@/use-torch';
import classNames from 'classnames';
import { QRCodeSVG } from 'qrcode.react';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import styles from './AppFullscreen.module.css';
import { Brightness } from './Brightness';
import { ColorBlock } from './ColorBlock';
import Fullscreen, { FullscreenHandle } from './Fullscreen';
import { IconButton } from './IconButton';
import { Logo } from './Logo';
import { IconBolt } from './icons/IconBolt';
import { IconShare } from './icons/IconShare';
import { IconXMark } from './icons/IconXMark';

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
  const [canShare, setCanShare] = useState(false);
  const { canTorch, isDisabled, toggleTorch, destroyMedia } = useTorch();

  const shareData = useMemo<ShareData>(() => ({
    url: canonical,
    title: 'Crowd Spot',
    text: color2 == null ?
      `Look for the color ${color1}` :
      `Look for the colors ${color1} and ${color2}`,
  }), [canonical, color1, color2]);

  useImperativeHandle(ref, () => ({
    show() {
      fullscreenElement.current?.show();
    },
    hide() {
      fullscreenElement.current?.hide();
      destroyMedia();
    },
  }));

  const handleClickClose = useCallback(() => {
    fullscreenElement.current?.hide();
    destroyMedia();
  }, [destroyMedia]);

  const handleClickShare = useCallback(() => {
    navigator.share(shareData);
  }, [shareData]);

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
    destroyMedia();
  }, [destroyMedia]);

  useEffect(() => {
    setCanShare(
      typeof navigator.canShare === 'function'  && navigator.canShare(shareData)
    );
  }, [shareData]);

  const controls = (
    <div className={styles.controls}>
      <QRCodeSVG
        value={canonical}
        includeMargin
        className="rounded-md m-4 mr-auto"
      />
      {canShare && (
        <IconButton
          onClick={handleClickShare}
          className={classNames(styles.appButton, 'tooltip')}
          data-tip="Share"
        >
          <IconShare />
        </IconButton>
      )}
      {canTorch && (
        <IconButton
          onClick={toggleTorch}
          className={classNames(styles.appButton, 'tooltip')}
          disabled={isDisabled}
          data-tip={isDisabled ? undefined : 'Toggle torch'}
        >
          <IconBolt />
        </IconButton>
      )}
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
        <IconButton
          onClick={handleClickClose}
          className={classNames(styles.appButton, 'absolute top-0 right-0 tooltip tooltip-bottom')}
          data-tip="Close"
        >
          <IconXMark />
        </IconButton>
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
