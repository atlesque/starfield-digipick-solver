import clsx from 'clsx';
import { TOTAL_LAYERS } from '../../../constants';
import styles from './LayerSelector.module.scss';

interface LayerSelectorProps {
  activeLayer: number;
  onChange: (layer: number) => void;
}

export const LayerSelector = ({ activeLayer, onChange }: LayerSelectorProps) => {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Layer</h1>
      <div className={styles.layerList}>
        {Array.from({ length: TOTAL_LAYERS + 1 }, (_, i) => (
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
