import { Link } from 'react-router-dom';
import styles from './HelpPage.module.scss';
import { AppRoutes } from '../routes';

const HelpPage = () => (
  <div className={styles.root}>
    <header className={styles.header}>
      <Link to={AppRoutes.Home}>Back</Link>
    </header>
    <article className={styles.howToGuide}>
      <h1>Help Guide</h1>
      <h2>Install the App!</h2>
      <p>
        Starfield Digipick Solver is built using &nbsp;
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps"
          target="_blank"
          rel="noreferrer"
          className="link"
        >
          Progressive Web App
        </a>
        &nbsp; technology! This means you can install the app from the browser directly to your
        homescreen for easy access any time of the day.
      </p>
      <h3>iOS Instructions</h3>
      <p>
        * Installing <abbr title="Progressive Web Apps">PWA</abbr>'s on an iPhone require you to use
        Safari
      </p>
      <ol>
        <li>Open the website on Safari</li>
        <li>Click the "Share" button at the bottom</li>
        <li>Find the "Add to Homescreen" button</li>
      </ol>
      <h3>Android Instructions</h3>
      <ol>
        <li>Open the app in Chrome</li>
        <li>Click the 3 dots menu at the top right of your browser</li>
        <li>Select Install App</li>
      </ol>
      <h3>Desktop Instructions</h3>
      <ol>
        <li>
          At the right side of the URL Address Bar you will see a button that appears to be a
          monitor with a down arrow
        </li>
        <li>Click this button titled "Install Starfield Digipick Solver"</li>
        <li>
          You will now have an application installed on your computer that you can search for like
          other apps.
        </li>
      </ol>
      <h2>Using the Manual Solver</h2>
      <ol>
        <li>Choose the SECURITY LEVEL</li>
        <li>
          The circles correspond to the keys. Click on a circle to change its layer number (1, 2 or
          3)
        </li>
        <li>
          Begin with the outer layer (1) and look for keys that fit.
          <ul className={styles.tips}>
            <li>
              Tip: It helps if you level up lockpicking, then you'll start seeing the compatible
              layers in blue
            </li>
          </ul>
        </li>
        <li>
          When you find a key that fits a single layer only, or you're sure about the layer, set
          that layer's number by clicking the keys.
          <ul className={styles.tips}>
            <li>Tip: Hold the key to mark is as verified (green)</li>
          </ul>
        </li>
        <li>Leave keys that don't fit in any layer as default (-)</li>
        <li>
          Once you think you can clear all layers, start by highlighting the active layer under
          LAYER
        </li>
        <li>Work your way through the keys, highlighting layers until you finish all of them</li>
        <li>Click RESET to start anew</li>
      </ol>
      <h2>Use the Auto-solver</h2>
      <Link to={AppRoutes.AutoSolver} className="link">
        Try the new auto solver!
      </Link>
      <p>
        Made by{' '}
        <a href="https://github.com/Andrew1431" target="_blank" className="link" rel="noreferrer">
          @Andrew1431
        </a>
      </p>
      <ol>
        <li>
          Key in the puzzle exactly as it is shown in game.
          <ul className={styles.tips}>
            <li>Tips:</li>
            <ul>
              <li>
                Use the "Show Guidelines" button to show the clickable areas. The puzzles always
                fall on every other prong
              </li>
              <li>
                If on mobile, use the "Enable Mobile Offset" button and click & drag your pieces
                into place for better accuracy. The offset will allow you to see the prongs while
                dragging without your finger covering it. It takes some getting used to.
              </li>
              <li>
                If you're still finding it difficult, you can use the arrow keys next to the "Solve
                Puzzle" button to individually select layers you wish to modify.
              </li>
            </ul>
          </ul>
        </li>
        <li>
          Begin entering the keys of your puzzle by clicking on one of the keys with a{' '}
          <span style={{ color: 'var(--error-dark)' }}>!</span>
          <ul>
            <li>
              Starting at the top left will make your life a breeze, as they will automatically go
              across left to right as you pick the keys.
            </li>
            <li>The BASIC tab has a few common keys</li>
            <li>The other tabs ask you for the quantity of prongs</li>
            <li>Selecting 2 prongs will show all possible keys with 2 prongs</li>
            <li>
              Selecting 3 prongs will ask you to select the gap size between prongs. Choose the
              smallest gap between two keys you can find, and it will present you with all options
              of that key configuration.
            </li>
            <li>
              Selecting 4 prongs will ask you to select the gap size between 2 SEPARATE pairs of
              prongs. Doing so will then present you with all key options based on those two gaps.
            </li>
            <ul className={styles.tips}>
              <li>Tips:</li>
              <ul>
                <li>
                  Using the gap illustrations can help you understand how the keys are being
                  generated to choose.
                </li>
                <li>
                  This might be confusing at first, but once you've done a few puzzles you will get
                  really fast at it.
                </li>
              </ul>
            </ul>
            <li>
              Any mistakes can be fixed by pressing on the key that was entered incorrectly. This
              will highlight that key.
            </li>
            <ul className={styles.tips}>
              <li>
                Be careful, you will still be filling keys left-to-right from that new position,
                make sure you select back to where you left off!
              </li>
            </ul>
          </ul>
          <li>Click the green "Solve Puzzle" button when your puzzle is entered correctly!</li>
          <li>
            Your puzzle will be solved, and you can click on the keys at this point to highlight
            each phase of the layers for easier usability.
            <ul className={styles.tips}>
              <li>
                If your puzzle says it is not solvable, double check everything, we have yet to find
                a solution that is unsolvable when entered correctly!
              </li>
            </ul>
          </li>
          <li>Click reset to do it all over again!</li>
        </li>
      </ol>
    </article>
  </div>
);

export default HelpPage;
