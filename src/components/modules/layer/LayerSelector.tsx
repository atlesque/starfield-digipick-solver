import clsx from 'clsx';
import styles from './LayerSelector.module.scss';

interface LayerSelectorProps {
  activeLayer: number;
  totalLayers: number;
  onChange: (layer: number) => void;
}

export const LayerSelector = ({ activeLayer, totalLayers, onChange }: LayerSelectorProps) => {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Layer</h1>
      <div className={styles.layerList}>
        {Array.from({ length: totalLayers + 1 }, (_, i) => (
          <button
            key={i}
            className={clsx(styles.layer, {
              [styles.activeLayer]: i === activeLayer,
            })}
            onClick={() => onChange(i)}
          >
            {i === 0 ? 'All' : i}
          </button>
        ))}
      </div>
    </div>
  );
};
