import { FC } from 'react';

export type IconColorsProps = {
  color1: string;
  color2: string | null;
};

export const IconColors: FC<IconColorsProps> = ({ color1, color2 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <path fill="#000" d="M0 0H16V16H0z" />
    {!color2 ? (
      <path fill={color1} d="M1 1H15V15H1z" stroke="white" strokeWidth={0.5} />
    ) : (
      <>
        <path fill={color1} d="M1 1H15V7.5H1z" stroke="white" strokeWidth={0.5} />
        <path fill={color2} d="M1 9H15V15H1z" stroke="white" strokeWidth={0.5} />
      </>
    )}
  </svg>
);
