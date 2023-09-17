import { PropsWithChildren } from 'react';
import styles from './ErrorMessage.module.scss';

export const ErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.error}>
      {children}
    </div>
  )
};
