import './background.scss';
import './app.scss';
import ColorTile from './components/ColorTile/ColorTile';
import { useState, useCallback, useMemo } from 'react';

const bubbles = Array.from(Array(200).keys()).map((n) => (
  <i className="bubble" />
));

function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const toHex = (n) => parseInt(n).toString(16).padStart(2, '0');

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [level, setLevel] = useState(1);
  const [lifes, setLifes] = useState(3);

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
    ({ clientX, clientY, target }) => {
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

  return (
    <>
      <div onMouseMove={handleMouseMove} className="App">
        level
        <input
          type="number"
          step="1"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
        <span className="color-code">#{correctColor}</span>
        <main>
          {possibleColors.map((c, i) => (
            <ColorTile
              key={i}
              color={c}
              mouseX={mousePos.x}
              mouseY={mousePos.y}
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
    </>
  );
}

export default App;
