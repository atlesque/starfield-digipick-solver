import { PropsWithChildren } from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  primary?: boolean;
  disabled?: boolean;
}
export const Button = ({
  children,
  primary = false,
  disabled = false,
  onClick
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      onClick={onClick}
      className={clsx(styles.button, {
        [styles.green]: primary,
        [styles.disabled]: disabled
      })}
    >
      {children}
    </button>
  );
};
