import './background.scss';
import './app.scss';
import ColorTile from './components/ColorTile/ColorTile';
import { useState, useCallback } from 'react';

const bubbles = Array.from(Array(200).keys()).map((n) => (
  <i className="bubble" />
));

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = useCallback(
    ({ clientX, clientY, target }) => {
      setMousePos({ x: clientX, y: clientY });
    },
    [setMousePos]
  );

  return (
    <>
      <div onMouseMove={handleMouseMove} className="App">
        <span className="color-code">#ab33f5</span>
        <main>
          <ColorTile mouseX={mousePos.x} mouseY={mousePos.y} />
          <ColorTile mouseX={mousePos.x} mouseY={mousePos.y} />
          <ColorTile mouseX={mousePos.x} mouseY={mousePos.y} />
          <ColorTile mouseX={mousePos.x} mouseY={mousePos.y} />
        </main>
      </div>
      <div className="bottom-particles">{bubbles}</div>
    </>
  );
}

export default App;
