import { useEffect, useRef, useState } from 'react';

export interface HighwayInput {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  wheelDelta: number;
}

export function useHighwayInput() {
  const [inputState, setInputState] = useState<HighwayInput>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    wheelDelta: 0
  });

  const keysRef = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    wheelDelta: 0
  });

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key events if typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keysRef.current.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          keysRef.current.backward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          keysRef.current.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          keysRef.current.right = true;
          break;
        default:
          return;
      }
      setInputState({ ...keysRef.current });
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keysRef.current.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          keysRef.current.backward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          keysRef.current.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          keysRef.current.right = false;
          break;
        default:
          return;
      }
      setInputState({ ...keysRef.current });
    };

    const handleWheel = (e: WheelEvent) => {
      // Scroll down (positive deltaY) moves backward or decelerates, scroll up moves forward
      // Normalized delta
      const delta = -Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY) / 100, 1.5);
      keysRef.current.wheelDelta = delta;
      setInputState({ ...keysRef.current });

      // Reset wheel delta after brief decay
      setTimeout(() => {
        keysRef.current.wheelDelta = 0;
        setInputState({ ...keysRef.current });
      }, 100);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartRef.current || e.touches.length === 0) return;
      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;

      // Vertical drag controls forward/backward
      if (deltaY < -15) {
        keysRef.current.forward = true;
        keysRef.current.backward = false;
      } else if (deltaY > 15) {
        keysRef.current.backward = true;
        keysRef.current.forward = false;
      } else {
        keysRef.current.forward = false;
        keysRef.current.backward = false;
      }

      // Horizontal drag controls steering
      if (deltaX < -15) {
        keysRef.current.left = true;
        keysRef.current.right = false;
      } else if (deltaX > 15) {
        keysRef.current.right = true;
        keysRef.current.left = false;
      } else {
        keysRef.current.left = false;
        keysRef.current.right = false;
      }

      setInputState({ ...keysRef.current });
    };

    const handleTouchEnd = () => {
      touchStartRef.current = null;
      keysRef.current.forward = false;
      keysRef.current.backward = false;
      keysRef.current.left = false;
      keysRef.current.right = false;
      setInputState({ ...keysRef.current });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return { inputState, keysRef };
}

