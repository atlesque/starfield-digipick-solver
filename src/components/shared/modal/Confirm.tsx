import { Button } from "../../modules/button/Button";
import { ConfirmButtons } from "./ConfirmButtons";
import { Modal, ModalProps } from "./Modal";
import styles from './Confirm.module.scss';

export interface ConfirmProps extends ModalProps {
  onConfirm: () => void
  onCancel: () => void
  prompt: string
  title: string
}
export const Confirm = ({
  onConfirm,
  onCancel,
  open,
  prompt,
  title
}: ConfirmProps) => {
  return (
    <Modal open={open} onClickOutside={onCancel}>
      <div>
        <h2 className={styles.title}>
          {title}
        </h2>
        <p className={styles.content}>
          {prompt}
        </p>
      </div>
      <ConfirmButtons
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </Modal>
  );
}
