import React, { useRef, useState, useCallback, useEffect } from 'react';

export interface JoystickVector {
  x: number;
  y: number;
}

export interface VirtualJoystickProps {
  onMove: (vector: JoystickVector) => void;
  className?: string;
}

export const VirtualJoystick: React.FC<VirtualJoystickProps> = ({ onMove, className = '' }) => {
  const baseRef = useRef<HTMLDivElement>(null);
  const [knobPos, setKnobPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const radius = 50; // Max movement radius in px

  const handlePointer = useCallback(
    (clientX: number, clientY: number) => {
      if (!baseRef.current) return;
      const rect = baseRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      let dx = clientX - centerX;
      let dy = clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > radius) {
        dx = (dx / distance) * radius;
        dy = (dy / distance) * radius;
      }

      setKnobPos({ x: dx, y: dy });
      onMove({
        x: Number((dx / radius).toFixed(2)),
        y: Number((-dy / radius).toFixed(2)) // Up is positive Y
      });
    },
    [onMove, radius]
  );

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handlePointer(e.clientX, e.clientY);
  };

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      handlePointer(e.clientX, e.clientY);
    };

    const onPointerUp = () => {
      if (!isDragging) return;
      setIsDragging(false);
      setKnobPos({ x: 0, y: 0 });
      onMove({ x: 0, y: 0 });
    };

    if (isDragging) {
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerUp);
    }

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, [isDragging, handlePointer, onMove]);

  return (
    <div
      ref={baseRef}
      onPointerDown={onPointerDown}
      className={`relative w-28 h-28 rounded-full bg-[#0A0D0B]/80 border-2 border-[#C7FF45]/50 backdrop-blur-md shadow-[0_0_20px_rgba(199,255,69,0.25)] flex items-center justify-center touch-none select-none ${className}`}
    >
      {/* Outer Crosshair Marks */}
      <span className="absolute top-1 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-[#C7FF45]/60" />
      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-[#C7FF45]/60" />
      <span className="absolute left-1 top-1/2 -translate-y-1/2 w-2 h-0.5 bg-[#C7FF45]/60" />
      <span className="absolute right-1 top-1/2 -translate-y-1/2 w-2 h-0.5 bg-[#C7FF45]/60" />

      {/* Inner Center Deadzone Indicator */}
      <div className="w-6 h-6 rounded-full border border-white/20" />

      {/* Movable Thumb Knob */}
      <div
        className="absolute w-12 h-12 rounded-full bg-[#C7FF45] border-2 border-white shadow-[0_0_15px_rgba(199,255,69,0.6)] flex items-center justify-center transition-transform"
        style={{
          transform: `translate(${knobPos.x}px, ${knobPos.y}px)`
        }}
      >
        <span className="w-3 h-3 rounded-full bg-[#0A0D0B]" />
      </div>
    </div>
  );
};

