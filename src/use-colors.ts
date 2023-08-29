import { useCallback, useState } from 'react';
import { AppColor, combinations } from './colors';
import { shuffle } from './shuffle';

// function rand<T>(arr: readonly T[]): T {
//   const i = Math.floor(Math.random() * arr.length);
//   return arr[i];
// };

// const getRandomCombination = () => {
//   return rand(combinations);
// };

export const useColors = () => {
  const [[color1, color2], setColors] = useState<[AppColor, AppColor]>([
    combinations[0][0],
    combinations[0][1],
  ]);

  const randomize = useCallback(() => {
    setColors(([color1, color2]) => {
      const validCombinations = combinations.filter(([newColor1, newColor2]) => (
        newColor1 !== color1 && newColor1 !== color2 &&
        newColor2 !== color1 && newColor2 !== color2
      ));
      return shuffle(validCombinations)[0] as [AppColor, AppColor];
    });
  }, []);

  return { color1, color2, randomize };
};
