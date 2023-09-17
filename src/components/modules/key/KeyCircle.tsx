import clsx from 'clsx';
import { useLongPress } from 'use-long-press';
import styles from './KeyCircle.module.scss';

interface KeyCircleProps {
  activeLayerNumber: number;
  filteredLayer?: number;
  totalLayers: number;
  isHidden?: boolean;
  isVerified?: boolean;
  onActiveLayerChange: (layer: number) => void;
  onVerifyChange: (isVerified: boolean) => void;
}

const KeyCircle = ({
  activeLayerNumber,
  filteredLayer = 0,
  totalLayers,
  isHidden = false,
  isVerified = false,
  onActiveLayerChange,
  onVerifyChange,
}: KeyCircleProps) => {
  const handleLongPress = useLongPress(
    () => {
      onVerifyChange(!isVerified);
    },
    {
      onCancel: () => {
        onActiveLayerChange((activeLayerNumber + 1) % (totalLayers + 1));
      },
    }
  );

  return (
    <button
      type="button"
      className={clsx(styles.root, {
        [styles.layerUnknown]: activeLayerNumber === 0,
        [styles.isOpaque]: filteredLayer !== activeLayerNumber && filteredLayer !== 0,
        [styles.isHidden]: isHidden,
        [styles.isVerified]: isVerified,
      })}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...handleLongPress()}
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

export default KeyCircle;
