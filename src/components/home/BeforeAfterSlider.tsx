'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useTranslation } from '../../components/ui/language-selector';
import { Trash2, Recycle, PackagePlus, Package, ArrowLeftRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  className?: string;
  height?: string;
}

export function BeforeAfterSlider({
  className = '',
  height = '400px',
}: BeforeAfterSliderProps) {
  const { t } = useTranslation();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const controls = useAnimation();

  // Start animation when slider is in view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // Handle drag interactions
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (!isDragging || !containerRef.current) return;

    let clientX: number;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const newPos = ((clientX - rect.left) / rect.width) * 100;
    // Clamp to stay between 0 and 100
    setSliderPosition(Math.max(0, Math.min(100, newPos)));
  };

  // Cleanup
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height }}
    >
      <div
        className="relative w-full h-full"
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}
      >
        {/* BEFORE Label - Enhanced with icon */}
        <div className="absolute top-2 left-2 text-xs font-semibold text-red-500 z-10 flex items-center gap-1 bg-red-50/80 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm transition-all duration-300 hover:bg-red-100/80 hover:shadow-md">
          <Package className="w-3 h-3" />
          {t('beforeAfter.label.before', 'Before Tp@ack')}
        </div>

        {/* RED BLOCK = BEFORE - Enhanced with card design and emphasis */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              transition: { duration: 0.5 },
            },
          }}
        >
          {/* Using w-full & h-full to occupy the entire area */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-full h-full flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.3 },
                },
              }}
            >
              <motion.div
                className="bg-red-500/90 text-white px-6 py-5 
                           w-max max-w-[90%]
                           backdrop-blur-sm 
                           rounded-xl
                           shadow-lg border border-red-400/30
                           transition-all duration-300
                "
                whileHover={{ scale: 1.03, boxShadow: '0 20px 25px -5px rgba(239, 68, 68, 0.2)' }}
              >
                <div className="flex items-center justify-center gap-3">
                  <Trash2 className="w-8 h-8 text-red-200 drop-shadow-md" />
                  <div>
                    <div className="flex items-center">
                      <span className="text-4xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent drop-shadow-sm">+43%</span>
                      <div className="ml-2 flex flex-col">
                        <span className="text-lg font-bold tracking-wide uppercase">
                          {t('beforeAfter.before.description', 'Wasted Space')}
                        </span>
                        <div className="h-0.5 w-full bg-gradient-to-r from-red-300 to-transparent rounded-full mt-0.5 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="mt-3 text-sm font-medium">
                      {t(
                        'beforeAfter.before.details',
                        'Oversized boxes, excessive void fillers, plastic waste'
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* AFTER Label - Enhanced with icon */}
        <div className="absolute top-2 right-2 text-xs font-semibold text-green-600 z-10 flex items-center gap-1 bg-green-50/80 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm transition-all duration-300 hover:bg-green-100/80 hover:shadow-md">
          <PackagePlus className="w-3 h-3" />
          {t('beforeAfter.label.after', 'After Tp@ck')}
        </div>

        {/* GREEN BLOCK = AFTER - Enhanced with card design and emphasis */}
        <motion.div
          className="absolute inset-0"
          style={{
            // Clip the green area from the left
            clipPath: `inset(0 0 0 ${sliderPosition}%)`,
          }}
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              transition: { duration: 0.5 },
            },
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-full h-full flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.3 },
                },
              }}
            >
              <motion.div
                className="bg-green-600/90 text-white px-6 py-5 
                           w-max max-w-[90%]
                           backdrop-blur-sm
                           rounded-xl
                           shadow-lg border border-green-500/30
                           transition-all duration-300
                "
                whileHover={{ scale: 1.03, boxShadow: '0 20px 25px -5px rgba(22, 163, 74, 0.2)' }}
              >
                <div className="flex items-center justify-center gap-3">
                  <Recycle className="w-8 h-8 text-green-200 drop-shadow-md" />
                  <div>
                    <div className="flex items-center">
                      <span className="text-4xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent drop-shadow-sm">-70%</span>
                      <div className="ml-2 flex flex-col">
                        <span className="text-lg font-bold tracking-wide uppercase">
                          {t('beforeAfter.after.description', 'Volume Reduction')}
                        </span>
                        <div className="h-0.5 w-full bg-gradient-to-r from-green-300 to-transparent rounded-full mt-0.5 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="mt-3 text-sm font-medium">
                      {t(
                        'beforeAfter.after.details',
                        'Custom-fit, auto-sealing, 100% recyclable paper'
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Glass-style cursor - Enhanced with animations and better visual feedback */}
        <motion.div
          className="absolute top-0 bottom-0 cursor-ew-resize z-30
                     hover:w-2 transition-all duration-200"
          style={{
            left: `${sliderPosition}%`,
            width: '2px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.2))',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          animate={{
            boxShadow: isDragging 
              ? '0 0 15px 1px rgba(255,255,255,0.7)' 
              : '0 0 5px 0px rgba(255,255,255,0.3)'
          }}
        >
          {/* Circular button in the middle - Enhanced with animations */}
          <motion.div
            className="absolute top-1/2 left-1/2
                       w-12 h-12
                       bg-gradient-to-br from-white/40 to-white/20
                       rounded-full
                       -translate-x-1/2 -translate-y-1/2
                       shadow-lg
                       flex items-center justify-center
                       border border-white/30
            "
            style={{
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: isDragging 
                ? '0 0 20px 5px rgba(255,255,255,0.5)' 
                : '0 0 10px 0px rgba(255,255,255,0.3)',
              rotate: isDragging ? [-5, 5, -5, 5, 0] : 0,
              transition: { duration: 0.5 }
            }}
          >
            {/* Modern icon for slider handle */}
            <ArrowLeftRight className="w-6 h-6 text-white drop-shadow-md" />
            
            {/* Pulse animation ring */}
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-white/30"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
