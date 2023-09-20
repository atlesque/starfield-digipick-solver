import { Link, useLocation } from 'react-router-dom';
import styles from './Footer.module.scss';
import { AppRoutes } from '../../routes';
import DiscordIcon from './icons/DiscordIcon';

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
      <a
        href="https://discord.gg/tE8rJYJ3ae"
        target="_blank"
        rel="noreferrer"
        className={styles.discordLink}
      >
        <DiscordIcon className={styles.discordIcon} />
        Join our Discord!
      </a>
      {location.pathname !== AppRoutes.Help && (
        <Link to={AppRoutes.Help} className={styles.helpLink}>
          Help
        </Link>
      )}
    </div>
  );
};

export default Footer;
