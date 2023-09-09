import classNames from 'classnames/bind';
import React from 'react';
import styles from './Button.module.scss';

export type ButtonVariant = 'outlined' | 'contained' | 'text';

export type ButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error';

const cx = classNames.bind(styles);

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  isFullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'outlined',
  color = 'primary',
  isFullWidth = false,
  className,
  ...htmlProps
}: ButtonProps) => {
  const props = {
    ...htmlProps,
    className: cx(
      styles.root,
      variant,
      color,
      {
        [styles.fullWidth]: isFullWidth,
      },
      className
    ),
  };

  return React.createElement('button', props, props.children);
};

export default Button;
