import { rand } from './rand';

export enum AppColor {
  RED = 'red',
  ORANGE = 'orange',
  YELLOW = 'yellow',
  GREEN = 'green',
  BLUE = 'blue',
  PURPLE = 'purple',
  PINK = 'pink',
};

export const isKnownAppColor = (maybeAppColor: string): maybeAppColor is AppColor => {
  switch (maybeAppColor) {
    case AppColor.RED:
    case AppColor.ORANGE:
    case AppColor.YELLOW:
    case AppColor.GREEN:
    case AppColor.BLUE:
    case AppColor.PURPLE:
    case AppColor.PINK:
      return true;
    default:
      return false;
  }
};

export const appColorVarMap = {
  [AppColor.RED]: `--app-color-${AppColor.RED}`,
  [AppColor.ORANGE]: `--app-color-${AppColor.ORANGE}`,
  [AppColor.YELLOW]: `--app-color-${AppColor.YELLOW}`,
  [AppColor.GREEN]: `--app-color-${AppColor.GREEN}`,
  [AppColor.BLUE]: `--app-color-${AppColor.BLUE}`,
  [AppColor.PURPLE]: `--app-color-${AppColor.PURPLE}`,
  [AppColor.PINK]: `--app-color-${AppColor.PINK}`,
} as const;

export const appColorValueMap = {
  [AppColor.RED]: `var(${appColorVarMap[AppColor.RED]})`,
  [AppColor.ORANGE]: `var(${appColorVarMap[AppColor.ORANGE]})`,
  [AppColor.YELLOW]: `var(${appColorVarMap[AppColor.YELLOW]})`,
  [AppColor.GREEN]: `var(${appColorVarMap[AppColor.GREEN]})`,
  [AppColor.BLUE]: `var(${appColorVarMap[AppColor.BLUE]})`,
  [AppColor.PURPLE]: `var(${appColorVarMap[AppColor.PURPLE]})`,
  [AppColor.PINK]: `var(${appColorVarMap[AppColor.PINK]})`,
} as const;

export const colors = [
  AppColor.RED,
  AppColor.ORANGE,
  AppColor.YELLOW,
  AppColor.GREEN,
  AppColor.BLUE,
  AppColor.PURPLE,
  AppColor.PINK,
] as const;

export const combinations = [
  [AppColor.RED, AppColor.GREEN],
  [AppColor.RED, AppColor.ORANGE],
  [AppColor.RED, AppColor.YELLOW],
  [AppColor.ORANGE, AppColor.BLUE],
  [AppColor.ORANGE, AppColor.GREEN],
  [AppColor.ORANGE, AppColor.YELLOW],
  [AppColor.YELLOW, AppColor.BLUE],
  [AppColor.YELLOW, AppColor.GREEN],
  [AppColor.YELLOW, AppColor.PURPLE],
  [AppColor.GREEN, AppColor.BLUE],
  [AppColor.GREEN, AppColor.PINK],
  [AppColor.GREEN, AppColor.PURPLE],
  [AppColor.BLUE, AppColor.PINK],
  [AppColor.BLUE, AppColor.PURPLE],
  [AppColor.BLUE, AppColor.RED],
  [AppColor.PURPLE, AppColor.ORANGE],
  [AppColor.PURPLE, AppColor.PINK],
  [AppColor.PURPLE, AppColor.RED],
  [AppColor.PINK, AppColor.ORANGE],
  [AppColor.PINK, AppColor.RED],
  [AppColor.PINK, AppColor.YELLOW],
] as const;

export const isValidColor2 = (color1: AppColor, maybeColor2: AppColor) => {
  return combinations
    .filter((combination) => combination[0] === color1)
    .some((combination) => combination[1] === maybeColor2);
};

export const getRandomValidColor2 = (color1: AppColor) => {
  const validCombinations = combinations
    .filter((combination) => combination[0] === color1);
  const randomCombination = rand(validCombinations);
  return randomCombination[1];
};
