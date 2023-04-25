import { useRef } from 'react';
import './ColorTile.scss';

const ColorTile = ({ mouseX, mouseY, color, onClick, className }) => {
  const localRef = useRef(null);

  const getRelativeMousePos = () => {
    if (!localRef.current) return { x: 0, y: 0 };

    const rect = localRef.current.getBoundingClientRect();

    return {
      x: (rect.left + rect.right) / 2 - mouseX,
      y: (rect.top + rect.bottom) / 2 - mouseY,
    };
  };

  const calculateTileTransform = () => {
    const relativePos = getRelativeMousePos();
    const rotationY = relativePos.x / 600;
    const rotationX = relativePos.y / 600;
    return `rotateY(${-rotationY}rad) rotateX(${rotationX}rad)`;
  };

  const getEyeTransform = () => {
    const relativePos = getRelativeMousePos();
    const translateX = relativePos.x / 50;
    const translateY = relativePos.y / 50;
    return `translateX(${-translateX}px) translateY(${-translateY}px)`;
  };

  const getPupilTransform = () => {
    const relativePos = getRelativeMousePos();
    const translateX = relativePos.x / 100;
    const translateY = relativePos.y / 100;
    return `translateX(${-translateX}px) translateY(${-translateY}px)`;
  };

  return (
    <div
      onClick={onClick}
      ref={localRef}
      style={{
        transform: calculateTileTransform(),
        backgroundColor: '#' + color,
      }}
      className={'color-tile ' + className}
    >
      <div className="eyes">
        <i
          className="eye"
          style={{
            transform: getEyeTransform(),
          }}
        >
          <i
            className="pupil"
            style={{
              transform: getPupilTransform(),
            }}
          />
        </i>
        <i
          className="eye"
          style={{
            transform: getEyeTransform(),
          }}
        >
          <i
            className="pupil"
            style={{
              transform: getPupilTransform(),
            }}
          />
        </i>
      </div>
      {/* {color} */}
    </div>
  );
};
export default ColorTile;
