import clsx from 'clsx';
import React from 'react';
import styles from './Input.module.scss';

interface InputProps extends React.ComponentPropsWithRef<'input'> {
  error?: string;
  isFullWidth?: boolean;
  showLabel?: boolean;
  showPlaceholder?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      isFullWidth = false,
      showLabel = true,
      showPlaceholder = true,
      className,
      ...inputProps
    },
    ref
  ) => (
    <div className={styles.root}>
      {showLabel && (
        <label htmlFor={inputProps.name} className={styles.label}>
          {inputProps.placeholder}
        </label>
      )}
      <input
        id={inputProps.id ?? inputProps.name}
        {...inputProps}
        placeholder={showPlaceholder ? inputProps.placeholder : undefined}
        className={clsx(
          styles.input,
          {
            [styles.isFullWidth]: isFullWidth,
            [styles.isCheckbox]: inputProps.type === 'checkbox',
          },
          className
        )}
        ref={ref}
      />
      {error !== undefined && <span className={styles.error}>{error}</span>}
    </div>
  )
);

Input.displayName = 'Input';

export default Input;
