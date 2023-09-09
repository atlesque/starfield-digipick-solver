import clsx from 'clsx';
import React from 'react';
import CloseIcon from '../../icons/CloseIcon';
import styles from './Modal.module.scss';

interface ModalClasses {
  root?: string;
  background?: string;
  modal?: string;
  header?: string;
  content?: string;
}

interface ModalProps extends React.ComponentPropsWithRef<'div'> {
  title?: string;
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  classes?: ModalClasses;
  onClose: () => void;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      title,
      showCloseButton = true,
      closeOnBackdropClick = true,
      classes,
      onClose,
      children,
      ...divProps
    },
    ref
  ) => {
    const handleBackgroundClick = () => {
      if (closeOnBackdropClick) {
        onClose();
      }
    };

    const handleCloseButtonClick = () => {
      onClose();
    };

    return (
      <div {...divProps} className={clsx(styles.root, classes?.root)} role="dialog" ref={ref}>
        <div
          className={clsx(styles.background, classes?.background)}
          onClick={handleBackgroundClick}
        ></div>
        <div className={clsx(styles.modal, classes?.modal)}>
          <div className={clsx(styles.header, classes?.header)}>
            <span className={styles.title}>{title}</span>
            {showCloseButton && (
              <button onClick={handleCloseButtonClick}>
                <CloseIcon className={styles.closeIcon} />
              </button>
            )}
          </div>
          <div className={classes?.content}>{children}</div>
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';

export default Modal;
