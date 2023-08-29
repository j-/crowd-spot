import { AppColor, appColorValueMap } from '@/colors';
import styles from './ColorBlock.module.css';

export type ColorBlockProps = React.HTMLAttributes<HTMLDivElement> & {
  color: AppColor;
};

export const ColorBlock: React.FC<ColorBlockProps> = ({
  color,
  children,
  ...props
}) => (
  <div
    className={styles.colorBlock}
    style={{ backgroundColor: appColorValueMap[color] }}
    {...props}
  >
    {children}
  </div>
);
