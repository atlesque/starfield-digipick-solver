import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <div className={styles.root}>
      Made with ✨ by{' '}
      <a href="https://atlesque.dev/" target="_blank">
        Atlesque
      </a>
    </div>
  );
};
