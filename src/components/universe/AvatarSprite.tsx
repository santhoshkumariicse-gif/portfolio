import React from 'react';
import { Html } from '@react-three/drei';
import {
  IdleAvatarSvg,
  ThinkingAvatarSvg,
  CodingAvatarSvg,
  AchievementAvatarSvg,
  ExploringAvatarSvg,
  FutureAvatarSvg
} from '../../svgs/character';
import { CharacterState } from './Avatar3D';

export interface AvatarSpriteProps {
  state?: CharacterState;
  position?: [number, number, number];
}

export const AvatarSprite: React.FC<AvatarSpriteProps> = ({
  state = 'idle',
  position = [0, 1.8, 0]
}) => {
  const renderSvg = () => {
    switch (state) {
      case 'idle':
        return <IdleAvatarSvg className="w-24 h-32" />;
      case 'thinking':
        return <ThinkingAvatarSvg className="w-24 h-32" />;
      case 'coding':
        return <CodingAvatarSvg className="w-24 h-32" />;
      case 'celebrating':
        return <AchievementAvatarSvg className="w-24 h-32" />;
      case 'interacting':
        return <ExploringAvatarSvg className="w-24 h-32" />;
      case 'future':
        return <FutureAvatarSvg className="w-24 h-32" />;
      case 'walking':
      case 'running':
      default:
        return <IdleAvatarSvg className="w-24 h-32" />;
    }
  };

  return (
    <group position={position}>
      <Html center distanceFactor={15} transform occlude>
        <div className="pointer-events-none select-none filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]">
          {renderSvg()}
        </div>
      </Html>
    </group>
  );
};
