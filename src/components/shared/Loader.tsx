import styles from './Loader.module.scss';

interface LoaderProps {
  width?: number;
  height?: number;
  showText?: boolean;
}

const Loader = ({ width, height, showText = false }: LoaderProps) => {
  if (showText) {
    return <div className={styles.textLoader}>Bezig met laden...</div>;
  }
  return (
    <div className={styles.animatedLoader} style={{ width: `${width}px`, height: `${height}px` }} />
  );
};

export default Loader;
