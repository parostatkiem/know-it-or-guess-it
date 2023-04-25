import './ColorTile.scss';
import { useEffect, useRef, forwardRef } from 'react';

const ColorTile = ({ mouseX, mouseY, color, onClick, className }) => {
  const localRef = useRef(null);

  const calculateTransform = () => {
    if (!localRef.current) return '';

    const rect = localRef.current.getBoundingClientRect();

    const rotationY = ((rect.left + rect.right) / 2 - mouseX) / 600;
    const rotationX = ((rect.top + rect.bottom) / 2 - mouseY) / 600;
    return `rotateY(${-rotationY}rad) rotateX(${rotationX}rad)`;
  };

  return (
    <div
      onClick={onClick}
      ref={localRef}
      style={{ transform: calculateTransform(), backgroundColor: '#' + color }}
      className={'color-tile ' + className}
    >
      {/* {color} */}
    </div>
  );
};
export default ColorTile;
