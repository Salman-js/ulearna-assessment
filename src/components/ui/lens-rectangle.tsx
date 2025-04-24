'use client';

import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface LensProps {
  children: React.ReactNode;
  zoomFactor?: number;
  lensWidth?: number;
  lensHeight?: number;
  position?: {
    x: number;
    y: number;
  };
  isStatic?: boolean;
  isFocusing?: () => void;
  hovering?: boolean;
  setHovering?: (hovering: boolean) => void;
}

export const LensRectangle: React.FC<LensProps> = ({
  children,
  zoomFactor = 1.5,
  lensWidth = 170,
  lensHeight = 120,
  isStatic = false,
  position = { x: 200, y: 150 },
  hovering,
  setHovering,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [localIsHovering, setLocalIsHovering] = useState(false);

  const isHovering = hovering !== undefined ? hovering : localIsHovering;
  const setIsHovering = setHovering || setLocalIsHovering;

  const [mousePosition, setMousePosition] = useState({ x: 100, y: 100 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className='relative overflow-hidden rounded-lg z-20'
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {children}

      {isStatic ? (
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.58 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className='absolute inset-0 overflow-hidden'
            style={{
              maskImage: `linear-gradient(to right, 
                transparent 0%, 
                transparent ${position.x - lensWidth / 2}px, 
                black ${position.x - lensWidth / 2}px, 
                black ${position.x + lensWidth / 2}px, 
                transparent ${position.x + lensWidth / 2}px, 
                transparent 100%),
                linear-gradient(to bottom, 
                transparent 0%, 
                transparent ${position.y - lensHeight / 2}px, 
                black ${position.y - lensHeight / 2}px, 
                black ${position.y + lensHeight / 2}px, 
                transparent ${position.y + lensHeight / 2}px, 
                transparent 100%)`,
              WebkitMaskImage: `linear-gradient(to right, 
                transparent 0%, 
                transparent ${position.x - lensWidth / 2}px, 
                black ${position.x - lensWidth / 2}px, 
                black ${position.x + lensWidth / 2}px, 
                transparent ${position.x + lensWidth / 2}px, 
                transparent 100%),
                linear-gradient(to bottom, 
                transparent 0%, 
                transparent ${position.y - lensHeight / 2}px, 
                black ${position.y - lensHeight / 2}px, 
                black ${position.y + lensHeight / 2}px, 
                transparent ${position.y + lensHeight / 2}px, 
                transparent 100%)`,
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in',
              transformOrigin: `${position.x}px ${position.y}px`,
            }}
          >
            <div
              className='absolute inset-0'
              style={{
                transform: `scale(${zoomFactor})`,
                transformOrigin: `${position.x}px ${position.y}px`,
              }}
            >
              {children}
            </div>
          </motion.div>
        </div>
      ) : (
        <AnimatePresence>
          {isHovering && (
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.58 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className='absolute inset-0 overflow-hidden'
                style={{
                  maskImage: `linear-gradient(to right, 
                    transparent 0%, 
                    transparent ${mousePosition.x - lensWidth / 2}px, 
                    black ${mousePosition.x - lensWidth / 2}px, 
                    black ${mousePosition.x + lensWidth / 2}px, 
                    transparent ${mousePosition.x + lensWidth / 2}px, 
                    transparent 100%),
                    linear-gradient(to bottom, 
                    transparent 0%, 
                    transparent ${mousePosition.y - lensHeight / 2}px, 
                    black ${mousePosition.y - lensHeight / 2}px, 
                    black ${mousePosition.y + lensHeight / 2}px, 
                    transparent ${mousePosition.y + lensHeight / 2}px, 
                    transparent 100%)`,
                  WebkitMaskImage: `linear-gradient(to right, 
                    transparent 0%, 
                    transparent ${mousePosition.x - lensWidth / 2}px, 
                    black ${mousePosition.x - lensWidth / 2}px, 
                    black ${mousePosition.x + lensWidth / 2}px, 
                    transparent ${mousePosition.x + lensWidth / 2}px, 
                    transparent 100%),
                    linear-gradient(to bottom, 
                    transparent 0%, 
                    transparent ${mousePosition.y - lensHeight / 2}px, 
                    black ${mousePosition.y - lensHeight / 2}px, 
                    black ${mousePosition.y + lensHeight / 2}px, 
                    transparent ${mousePosition.y + lensHeight / 2}px, 
                    transparent 100%)`,
                  maskComposite: 'intersect',
                  WebkitMaskComposite: 'source-in',
                  transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
                  zIndex: 50,
                }}
              >
                <div
                  className='absolute inset-0'
                  style={{
                    transform: `scale(${zoomFactor})`,
                    transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
                  }}
                >
                  {children}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};
