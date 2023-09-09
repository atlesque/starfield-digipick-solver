import clsx from 'clsx';
import React from 'react';
import styles from './TextArea.module.scss';
import TextareaAutosize from 'react-textarea-autosize';

interface TextAreaProps extends React.ComponentPropsWithRef<'textarea'> {
  error?: string;
  isFullWidth?: boolean;
  showLabel?: boolean;
  showPlaceholder?: boolean;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      error,
      isFullWidth = false,
      showLabel = true,
      showPlaceholder = true,
      className,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      style, // HACK: style is incompatible with TextareaAutosizeProps style
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
      <TextareaAutosize
        id={inputProps.id ?? inputProps.name}
        {...inputProps}
        placeholder={showPlaceholder ? inputProps.placeholder : undefined}
        className={clsx(
          styles.input,
          {
            [styles.isFullWidth]: isFullWidth,
          },
          className
        )}
        ref={ref}
      />
      {error !== undefined && <span className={styles.error}>{error}</span>}
    </div>
  )
);

TextArea.displayName = 'TextArea';

export default TextArea;
