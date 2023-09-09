import React, { ReactElement } from 'react';

import styles from './Notification.module.scss';
import CloseIcon from '../../icons/CloseIcon';
import clsx from 'clsx';
import InfoIcon from '../../icons/InfoIcon';
import ErrorIcon from '../../icons/ErrorIcon';
import CheckCircleIcon from '../../icons/CheckCircleIcon';
import AlertTriangleIcon from '../../icons/AlertTriangleIcon';

export type NotificationColor = 'info' | 'success' | 'warning' | 'error';

type NotificationColorIcons = {
  [key in NotificationColor]: ReactElement;
};

const NOTIFICATION_COLOR_ICONS: NotificationColorIcons = {
  error: <ErrorIcon />,
  info: <InfoIcon />,
  success: <CheckCircleIcon />,
  warning: <AlertTriangleIcon />,
};

interface NotificationClasses {
  root?: string;
}

interface NotificationProps extends React.ComponentPropsWithRef<'div'> {
  color?: NotificationColor;
  showIcon?: boolean;
  showCloseButton?: boolean;
  classes?: NotificationClasses;
  onClose: () => void;
}

const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  (
    {
      color = 'info',
      showIcon = true,
      showCloseButton = true,
      classes,
      onClose,
      children,
      ...divProps
    },
    ref
  ) => {
    const handleCloseButtonClick = () => {
      onClose();
    };

    return (
      <div
        {...divProps}
        className={clsx(styles.root, classes?.root, styles[color])}
        role="dialog"
        ref={ref}
      >
        {showIcon && <div className={styles.iconWrapper}>{NOTIFICATION_COLOR_ICONS[color]}</div>}
        <div>{children}</div>
        {showCloseButton && (
          <button onClick={handleCloseButtonClick}>
            <CloseIcon className={styles.closeIcon} />
          </button>
        )}
      </div>
    );
  }
);

Notification.displayName = 'Notification';

export default Notification;
