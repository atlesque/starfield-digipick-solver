import clsx from 'clsx';
import React from 'react';
import styles from './Select.module.scss';

interface SelectProps extends React.ComponentPropsWithRef<'select'> {
  label?: string;
  error?: string;
  isFullWidth?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, isFullWidth = false, children, className, ...selectProps }, ref) => (
    <div className={styles.root}>
      <label htmlFor={selectProps.name} className={styles.label}>
        {label}
      </label>
      <select
        id={selectProps.id ?? selectProps.name}
        {...selectProps}
        className={clsx(
          styles.select,
          {
            [styles.fullWidth]: isFullWidth,
          },
          className
        )}
        ref={ref}
      >
        {children}
      </select>
      {error !== undefined && <span className={styles.error}>{error}</span>}
    </div>
  )
);

Select.displayName = 'Select';

export default Select;
