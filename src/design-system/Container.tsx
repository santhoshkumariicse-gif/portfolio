import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size = 'default'
}) => {
  const sizeMap = {
    narrow: 'max-w-4xl',
    default: 'max-w-[1180px]',
    wide: 'max-w-[1440px]'
  };

  return (
    <div className={`w-full mx-auto px-4 sm:px-6 ${sizeMap[size]} ${className}`}>
      {children}
    </div>
  );
};

