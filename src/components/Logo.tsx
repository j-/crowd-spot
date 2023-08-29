import logo from '@/assets/CrowdSpot.svg';

export type LogoProps = React.HTMLAttributes<HTMLImageElement>;

export const Logo: React.FC<LogoProps> = (props) => {
  return (
    <img
      src={logo.src}
      style={{
        margin: '1rem',
      }}
      {...props}
    />
  );
};
