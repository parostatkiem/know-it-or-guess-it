import './background.scss';
import './app.scss';
import ColorTile from './components/ColorTile/ColorTile';
import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { mulberry32, shuffle } from './math';

const bubbles = Array.from(Array(200).keys()).map((n) => (
  <i key={n} className="bubble" />
));

const toHex = (n) => parseInt(n).toString(16).padStart(2, '0');

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [level, setLevel] = useState(1);
  const [lifes, setLifes] = useState(5);
  const [isRevealing, setRevealing] = useState(false);
  const [isFinished, setFinished] = useState(false);

  const finalDialog = useRef(null);
  const revealTimer = useRef(null);

  const getRandForLevel = useCallback(
    (seed = 0) => mulberry32(seed + level)(),
    [level]
  );

  const getHexColorFromNumber = useCallback(
    (offset) =>
      [0, 1, 2].reduce(
        (curr, _, index) =>
          (curr += toHex(
            ((level + 100 * offset) % getRandForLevel(index + 1)) * 255
          )),
        ''
      ),
    [getRandForLevel, level]
  );

  const correctColor = useMemo(
    () => getHexColorFromNumber(Math.sin(Math.PI / 2 / level)),
    [getHexColorFromNumber, level]
  );

  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      setMousePos({ x: clientX, y: clientY });
    },
    [setMousePos]
  );

  const possibleColors = useMemo(
    () =>
      shuffle([
        correctColor,
        ...Array.from(Array(3).keys()).map((n) =>
          getHexColorFromNumber(
            Math.sin(Math.PI / 2 / level) * getRandForLevel(n + 1)
          )
        ),
      ]),
    [correctColor, getHexColorFromNumber, getRandForLevel, level]
  );

  const handleTileClick = useCallback(
    (color) => {
      if (isRevealing || isFinished) return;
      if (color !== correctColor) {
        setRevealing(true);
        revealTimer.current = setTimeout(() => {
          setRevealing(false);
          setLevel((n) => parseInt(n) + 1);
        }, 3500);
        setLifes((n) => n - 1);
      } else {
        setLevel((n) => parseInt(n) + 1);
      }
    },
    [correctColor, isRevealing, isFinished]
  );

  useEffect(() => {
    if (lifes === 0) {
      setFinished(true);
      finalDialog.current.showModal();
      if (revealTimer.current) {
        clearTimeout(revealTimer.current);
      }
    }
  }, [lifes]);

  return (
    <>
      <div
        style={isFinished ? { display: 'none' } : undefined}
        onMouseMove={handleMouseMove}
        className={'App ' + (isRevealing ? 'reveal' : '')}
      >
        <span className="color-code">#{correctColor}</span>
        <main>
          {possibleColors.map((c, i) => (
            <ColorTile
              key={i}
              color={c}
              mouseX={mousePos.x}
              mouseY={mousePos.y}
              onClick={() => handleTileClick(c)}
              className={c === correctColor ? '' : 'incorrect'}
            />
          ))}
        </main>
        <aside>
          <div className="lifes">
            {Array.from(Array(lifes).keys()).map(() => '♥')}
          </div>
          <div className="level">
            {level}
            <span>level</span>
          </div>
        </aside>
      </div>
      <div className="bottom-particles">{bubbles}</div>

      <dialog ref={finalDialog}>
        <h3>Good, you reached level</h3>
        <h1>{level}</h1>
        <h3>This is over now.</h3>
      </dialog>
    </>
  );
}

export default App;
