import './ColorTile.scss';
import { useEffect, useRef } from 'react';

const ColorTile = ({ mouseX, mouseY }) => {
  const ref = useRef(null);

  const calculateTransform = () => {
    if (!ref.current) return '';

    const rect = ref.current.getBoundingClientRect();

    const rotationY = ((rect.left + rect.right) / 2 - mouseX) / 600;
    const rotationX = ((rect.top + rect.bottom) / 2 - mouseY) / 600;
    return `rotateY(${-rotationY}rad) rotateX(${rotationX}rad)`;
  };

  return (
    <div
      ref={ref}
      style={{ transform: calculateTransform() }}
      className="color-tile"
    ></div>
  );
};
export default ColorTile;
