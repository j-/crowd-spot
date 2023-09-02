import classNames from 'classnames';
import { ButtonHTMLAttributes, FC } from 'react';
import styles from './IconButton.module.css';

export const IconButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => (
  <button className={classNames(styles.button, className)} type="button" {...props} />
);
