import classNames from 'classnames';
import { FC, HTMLAttributes } from 'react';
import styles from './IconButton.module.css';

export const IconButton: FC<HTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => (
  <button className={classNames(styles.button, className)} type="button" {...props} />
);
