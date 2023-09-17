import { Link } from 'react-router-dom';
import styles from './HelpPage.module.scss';
import { AppRoutes } from '../routes';

export const HelpPage = () => {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <Link to={AppRoutes.Home}>Back</Link>
      </header>
      <article className={styles.howToGuide}>
        <h1>How to use</h1>
        <h2>Manual solver</h2>
        <ul>
          <li>Choose the SECURITY LEVEL</li>
          <li>
            The circles correspond to the keys. Click on a circle to change its layer number (1, 2
            or 3)
          </li>
          <li>
            Begin with the outer layer (1) and look for keys that fit.
            <br />
            Tip: It helps if you level up lockpicking, then you'll start seeing the compatible
            layers in blue
          </li>
          <li>
            When you find a key that fits a single layer only, or you're sure about the layer, set
            that layer's number by clicking the keys.
            <br />
            Tip: Hold the key to mark is as verified (green)
          </li>
          <li>Leave keys that don't fit in any layer as default (-)</li>
          <li>
            Once you think you can clear all layers, start by highlighting the active layer under
            LAYER
          </li>
          <li>Work your way through the keys, highlighting layers until you finish all of them</li>
          <li>Click RESET to start anew</li>
        </ul>
        <h2>Auto-solver</h2>
        <Link to={AppRoutes.AutoSolver} className="link">
          Try the new auto solver!
        </Link>
        <p>
          Made by{' '}
          <a href="https://github.com/Andrew1431" target="_blank" className="link">
            @Andrew1431
          </a>
        </p>
      </article>
    </div>
  );
};
