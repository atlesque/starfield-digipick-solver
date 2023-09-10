import clsx from 'clsx';
import styles from './KeyCircle.module.scss';

interface KeyCircleProps {
  activeLayerNumber: number;
  filteredLayer?: number;
  totalLayers: number;
  isHidden?: boolean;
  onActiveLayerChange: (layer: number) => void;
}

export const KeyCircle = ({
  activeLayerNumber,
  filteredLayer = 0,
  totalLayers,
  isHidden = false,
  onActiveLayerChange,
}: KeyCircleProps) => {
  const handleClick = () => {
    onActiveLayerChange((activeLayerNumber + 1) % (totalLayers + 1));
  };

  return (
    <button
      className={clsx(styles.root, {
        [styles.layerUnknown]: activeLayerNumber === 0,
        [styles.isOpaque]: filteredLayer !== activeLayerNumber && filteredLayer !== 0,
        [styles.isHidden]: isHidden,
      })}
      onClick={handleClick}
    >
      <span className={styles.activeLayerNumber}>
        {activeLayerNumber >= 1 ? activeLayerNumber : '-'}
      </span>
      {Array.from({ length: totalLayers }, (_, i) => (
        <div
          key={i}
          className={clsx(styles.layer, {
            [styles.layerActive]: activeLayerNumber === i + 1,
          })}
          style={{
            top: `${i * 0.5}rem`,
            right: `${i * 0.5}rem`,
            bottom: `${i * 0.5}rem`,
            left: `${i * 0.5}rem`,
          }}
        />
      ))}
    </button>
  );
};
