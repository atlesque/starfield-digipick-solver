import { Button } from "../../modules/button/Button";
import { ConfirmProps } from "./Confirm";
import styles from './ConfirmButtons.module.scss'

export const ConfirmButtons = ({
  onConfirm,
  onCancel
}: Pick<ConfirmProps, 'onCancel' | 'onConfirm'>) => {
  return (
    <div className={styles.root}>
      <Button onClick={onCancel}>No</Button>
      <Button primary onClick={onConfirm} autoFocus>Yes</Button>
    </div>
  )
}
