import React, { useState, useRef, useEffect } from 'react';
import { playCursedSound } from '../../hooks/useChaos';

export const ButtonDodge = ({ children, threshold = 75, maxEvaded = 5 }) => {
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [evadeCount, setEvadeCount] = useState(0);
  const [isFrozen, setIsFrozen] = useState(false);

  const handleMouseMove = (e) => {
    if (isFrozen || !containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    // Get mouse positions relative to container center
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const btn = container.firstElementChild;
    if (!btn) return;
    const btnRect = btn.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    // Calculate distance between mouse and button center
    const distX = mouseX - btnCenterX;
    const distY = mouseY - btnCenterY;
    const distance = Math.hypot(distX, distY);

    // If cursor enters activation range, dodge!
    if (distance < threshold) {
      playCursedSound('laser');
      
      const newEvade = evadeCount + 1;
      
      if (newEvade >= maxEvaded) {
        // Freeze system to trigger fake comfort so they can click it!
        setIsFrozen(true);
        setEvadeCount(0);
        setTimeout(() => {
          setIsFrozen(false);
        }, 2200); // 2.2 seconds of mercy
      } else {
        setEvadeCount(newEvade);
        
        // Displace by randomly escalating multiplier
        const multiplier = 30 + newEvade * 15;
        const randomAngle = Math.random() * 2 * Math.PI;
        const shiftX = Math.cos(randomAngle) * multiplier;
        const shiftY = Math.sin(randomAngle) * multiplier;
        
        // Keep within reasonable viewport bounding boundaries
        setPosition({
          x: Math.max(-150, Math.min(shiftX, 150)),
          y: Math.max(-100, Math.min(shiftY, 100))
        });
      }
    }
  };

  const handleClick = () => {
    // Reset positions once clicked
    setPosition({ x: 0, y: 0 });
    setEvadeCount(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        display: 'inline-block',
        position: 'relative',
        padding: '30px', // Cushion area to capture mouse moves
        verticalAlign: 'middle'
      }}
    >
      <div
        onClick={handleClick}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: isFrozen ? 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'transform 0.15s ease-out',
          display: 'inline-block'
        }}
      >
        {children}
      </div>
      {evadeCount > 0 && !isFrozen && (
        <span style={{
          position: 'absolute',
          bottom: '-2px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'monospace',
          fontSize: '9px',
          color: 'red',
          whiteSpace: 'nowrap',
          pointerEvents: 'none'
        }}>
          Evade Velocity: Level {evadeCount}
        </span>
      )}
    </div>
  );
};

export default ButtonDodge;
