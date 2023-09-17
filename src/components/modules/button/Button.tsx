import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  primary?: boolean;
  disabled?: boolean;
}
const Button = ({
  children,
  primary = false,
  disabled = false,
  onClick,
}: PropsWithChildren<ButtonProps>) => (
  <button
    type="button"
    onClick={onClick}
    className={clsx(styles.button, {
      [styles.green]: primary,
      [styles.disabled]: disabled,
    })}
  >
    {children}
  </button>
);

export default Button;
