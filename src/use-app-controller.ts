import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useSessionStorageState from 'use-session-storage-state';
import {
  AppColor,
  appColorValueMap,
  appColorVarMap,
  combinations,
  getRandomValidColor2,
  isKnownAppColor,
  isValidColor2,
} from './colors';
import {
  STORAGE_BRIGHTEN,
  STORAGE_COLORS,
  STORAGE_NUM_COLORS,
} from './constants';
import { rand } from './rand';

export type AppState = {
  appColor1: string;
  appColor2: string;
  brighten: boolean;
  canonical: string;
  color1: AppColor;
  color2: AppColor;
  initialize: (slug: string) => void;
  numColors: 1 | 2;
  randomize: () => void;
  setBrighten: (brighten: boolean) => void;
  setNumColors: (numColors: 1 | 2) => void;
};

export type UseAppController = {
  (): AppState;
};

const getDefaultColors = () => rand(combinations) as [AppColor, AppColor];

export const useAppController: UseAppController = () => {
  const { push } = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const [[color1, color2], setColors] = useSessionStorageState<[AppColor, AppColor]>(STORAGE_COLORS, {
    defaultValue: getDefaultColors,
  });

  const appColor1 = useMemo(() => {
    if (!isMounted) return color1;
    const appColor1 = appColorVarMap[color1];
    const style = window.getComputedStyle(document.documentElement);
    return style.getPropertyValue(appColor1);
  }, [color1, isMounted]);

  const appColor2 = useMemo(() => {
    if (!isMounted) return color2;
    const appColor2 = appColorVarMap[color2];
    const style = window.getComputedStyle(document.documentElement);
    return style.getPropertyValue(appColor2);
  }, [color2, isMounted]);

  const [numColors, setNumColors] = useSessionStorageState<1 | 2>(STORAGE_NUM_COLORS, {
    defaultValue: 1,
  });

  const setNumColorsCallback = useCallback((numColors: 1 | 2) => {
    const slug = numColors === 1 ? color1 : `${color1}-${color2}`;
    setNumColors(numColors);
    push(`/${slug}`);
  }, [color1, color2, push, setNumColors]);

  const [brighten, setBrighten] = useSessionStorageState<boolean>(STORAGE_BRIGHTEN, {
    defaultValue: true,
  });

  const initialize = useCallback((slug: string) => {
    const [slugColor1, slugColor2] = slug.split('-') as [string, string | undefined];
    if (!isKnownAppColor(slugColor1) || (slugColor2 != null && !isKnownAppColor(slugColor2))) {
      push('/');
      return;
    }
    setNumColors(slugColor2 == null ? 1 : 2);
    setColors(([_, oldColor2]) => {
      const newColor1 = slugColor1;
      let newColor2 = slugColor2;
      if (!newColor2) {
        // New slug did not contain color 2 (e.g. it was just `red` and not
        // `red-purple`). We gotta figure out the best color to use for color 2.
        newColor2 = isValidColor2(newColor1, oldColor2) ?
          // The old color 2 is a valid color to pair with this color 1.
          oldColor2 :
          // The old color 2 was not a valid color, pick a new one.
          getRandomValidColor2(newColor1);
      }
      return [newColor1, newColor2];
    });
  }, [push, setColors, setNumColors]);

  const randomize = useCallback(() => {
    const validCombinations = combinations.filter(([newColor1, newColor2]) => (
      newColor1 !== color1 && newColor1 !== color2 &&
      newColor2 !== color1 && newColor2 !== color2
    ));
    const [newColor1, newColor2] = rand(validCombinations) as [AppColor, AppColor];
    setColors([newColor1, newColor2]);
    push(numColors === 1 ? newColor1 : `${newColor1}-${newColor2}`);
  }, [color1, color2, numColors, push, setColors]);

  const canonical = useMemo(() => {
    const slug = numColors === 1 ? color1 : `${color1}-${color2}`;
    return typeof window === 'undefined' ? slug : `${window.location.origin}/${slug}`;
  }, [color1, color2, numColors]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return {
    appColor1,
    appColor2,
    brighten,
    canonical,
    color1,
    color2,
    initialize,
    numColors,
    randomize,
    setBrighten,
    setNumColors: setNumColorsCallback,
  } as AppState;
};
