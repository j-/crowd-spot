'use client';

import { appColorValueMap } from '@/colors';
import { useAppController } from '@/use-app-controller';
import { useFullscreen } from '@/use-fullscreen';
import Link from 'next/link';
import { useCallback, useId } from 'react';
import styles from './App.module.css';
import AppFullscreen from './AppFullscreen';
import { Logo } from './Logo';

const App: React.FC = () => {
  const id = useId();
  const { ref: fullscreenElement, show: fullscreenShow } = useFullscreen();
  const {
    brighten,
    color1,
    color2,
    numColors,
    randomize,
    setBrighten,
    setNumColors,
  } = useAppController();

  const handleClickRandom = useCallback(() => {
    randomize();
  }, [randomize]);

  const handleClickLaunch = useCallback(() => {
    fullscreenShow();
  }, [fullscreenShow]);

  return (
    <div className="max-w-[60ch] p-5 card bg-base-100 shadow-xl border border-primary my-10 mx-3 sm:mx-auto">
      <Link href="/">
        <Logo className="my-5" />
      </Link>

      <AppFullscreen
        ref={fullscreenElement}
        color1={color1}
        color2={numColors > 1 ? color2 : null}
        brighten={brighten}
      />

      <div className="my-3">
        <div className="form-control">
          <label htmlFor={`${id}-num-colors-1`} className="label gap-2 cursor-pointer">
            <div className={styles.swatch}>
              <div className={styles.split} style={{ backgroundColor: appColorValueMap[color1] }} />
            </div>
            <input
              id={`${id}-num-colors-1`}
              className="radio"
              type="radio"
              name={`${id}-num-colors`}
              value="1"
              checked={numColors === 1}
              onChange={(e) => {
                if (e.currentTarget.checked) setNumColors(1);
              }}
            />
            <span className="label-text flex-1">One color</span>
          </label>
        </div>

        <div className="form-control">
          <label htmlFor={`${id}-num-colors-2`} className="label gap-2 cursor-pointer">
            <div className={styles.swatch}>
              <div className={styles.split} style={{ backgroundColor: appColorValueMap[color1] }} />
              <div className={styles.split} style={{ backgroundColor: appColorValueMap[color2] }} />
            </div>
            <input
              id={`${id}-num-colors-2`}
              className="radio"
              type="radio"
              name={`${id}-num-colors`}
              value="2"
              checked={numColors === 2}
              onChange={(e) => {
                if (e.currentTarget.checked) setNumColors(2);
              }}
            />
            <span className="label-text flex-1">Two colors</span>
          </label>
        </div>
      </div>

      <div className="form-control my-3">
        <label htmlFor={`${id}-brighten`} className="label gap-2 cursor-pointer">
          <input
            id={`${id}-brighten`}
            className="checkbox"
            type="checkbox"
            name={`${id}-brighten`}
            value="1"
            checked={brighten}
            onChange={(e) => {
              setBrighten(e.currentTarget.checked);
            }}
          />
          <span className="label-text flex-1">Brighten screen (if supported)</span>
        </label>
      </div>

      <div className="my-5">
        <button className="btn" type="button" onClick={handleClickRandom}>
          Randomize
        </button>
        <button className="btn btn-primary" type="button" onClick={handleClickLaunch}>
          Launch
        </button>
      </div>
    </div>
  );
};

export default App;
