import { FC } from 'react';

export type IconColorsProps = {
  color1: string;
  color2: string | null;
};

export const IconColors: FC<IconColorsProps> = ({ color1, color2 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <path fill="#000" d="M0 0H16V16H0z" />
    {!color2 ? (
      <>
        <path fill="#fff" d="M1 1H15V15H1z" />
        <path fill={color1} d="M2 2H14V14H2z" />
      </>
    ) : (
      <>
        <path fill="#fff" d="M1 1H15V8H1zM1 9H15V15H1z" />
        <path fill={color1} d="M2 2H14V7H2z" />
        <path fill={color2} d="M2 10H14V14H2z" />
      </>
    )}
  </svg>
);
