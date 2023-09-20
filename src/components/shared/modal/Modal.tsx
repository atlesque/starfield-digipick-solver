import { PropsWithChildren, useCallback, MouseEvent } from "react";
import { createPortal } from "react-dom";
import styles from './Modal.module.scss';

export interface ModalProps extends PropsWithChildren {
  open?: boolean
  onClickOutside?: () => void
}
export const Modal = ({
  children,
  onClickOutside,
  open
}: ModalProps) => {
  const onClickWithin = useCallback((e: MouseEvent) => {
    e.stopPropagation();
  }, []);

  if (typeof open === 'boolean' && !open) {
    return;
  }

  return createPortal((
    <div className={styles.modalOverlay} onClick={onClickOutside}>
      <div className={styles.modalCard} onClick={onClickWithin}>
        {children}
      </div>
    </div>
  ), document.body)
}
