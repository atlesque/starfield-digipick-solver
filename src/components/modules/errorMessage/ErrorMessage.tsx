import { PropsWithChildren } from 'react';
import styles from './ErrorMessage.module.scss';

const ErrorMessage = ({ children }: PropsWithChildren) => (
  <div className={styles.error}>{children}</div>
);

export default ErrorMessage;
