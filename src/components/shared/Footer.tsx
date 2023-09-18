import { Link, useLocation } from 'react-router-dom';
import styles from './Footer.module.scss';
import { AppRoutes } from '../../routes';
import { Button } from '../modules/button/Button';
import { Discord } from './icons/Discord';

export const Footer = () => {
  const location = useLocation();

  return (
    <div className={styles.root}>
      <span>
        Made with ✨ by{' '}
        <a href="https://atlesque.dev/" target="_blank">
          Atlesque
        </a>
      </span>
      <span className={styles.discord}>
        <a href="https://discord.gg/tE8rJYJ3ae" target="_blank">
          <Button>
            <Discord />
            Join our Discord!
          </Button>
        </a>
      </span>
      {location.pathname !== AppRoutes.Help && (
        <Link to={AppRoutes.Help} className={styles.helpLink}>
          Help
        </Link>
      )}
    </div>
  );
};
