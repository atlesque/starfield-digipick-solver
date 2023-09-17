import { Link, useLocation } from 'react-router-dom';
import styles from './Footer.module.scss';
import AppRoutes from '../../routes';

const Footer = () => {
  const location = useLocation();

  return (
    <div className={styles.root}>
      <span>
        Made with ✨ by{' '}
        <a href="https://atlesque.dev/" target="_blank" rel="noreferrer">
          Atlesque
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

export default Footer;
