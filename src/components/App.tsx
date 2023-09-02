'use client';

import { appColorValueMap } from '@/colors';
import { useFullscreen } from '@/use-fullscreen';
import { useCallback, useId, useState } from 'react';
import styles from './App.module.css';
import AppFullscreen from './AppFullscreen';
import { Logo } from './Logo';
import { useAppController } from '@/use-app-controller';

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
    <div className="container my-10 mx-auto">
      <Logo />

      <AppFullscreen
        ref={fullscreenElement}
        color1={color1}
        color2={numColors > 1 ? color2 : null}
        brighten={brighten}
      />

      <div className="w-50">
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

      <div className="form-control">
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

      <div>
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
