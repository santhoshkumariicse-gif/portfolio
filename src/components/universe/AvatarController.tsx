import React, { useState } from 'react';
import { Avatar3D, CharacterState } from './Avatar3D';
import { AvatarSprite } from './AvatarSprite';

export interface AvatarControllerProps {
  initialState?: CharacterState;
  position?: [number, number, number];
  rotation?: [number, number, number];
  renderMode?: '3d' | '2d-sprite';
}

export const AvatarController: React.FC<AvatarControllerProps> = ({
  initialState = 'idle',
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  renderMode = '3d'
}) => {
  const [currentState] = useState<CharacterState>(initialState);

  if (renderMode === '2d-sprite') {
    return <AvatarSprite state={currentState} position={position} />;
  }

  return (
    <Avatar3D
      state={currentState}
      position={position}
      rotation={rotation}
      scale={1.2}
    />
  );
};
