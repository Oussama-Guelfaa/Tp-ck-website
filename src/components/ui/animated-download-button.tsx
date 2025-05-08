"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/components/ui/language-selector';

interface AnimatedDownloadButtonProps {
  onClick: () => void;
  className?: string;
}

export const AnimatedDownloadButton = ({
  onClick,
  className = '',
}: AnimatedDownloadButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const { t } = useTranslation();

  const handleClick = () => {
    setIsClicked(true);
    onClick();
    
    // Reset the clicked state after animation completes
    setTimeout(() => {
      setIsClicked(false);
    }, 1500);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={className}
    >
      <Button
        variant="outline"
        className={`relative overflow-hidden border-primary text-primary hover:bg-primary hover:text-white px-6 py-6 h-auto transition-all duration-300 ${
          isClicked ? 'bg-green-600 text-white border-green-600' : ''
        }`}
        onClick={handleClick}
      >
        <motion.div
          className="flex items-center"
          animate={{
            x: isClicked ? [0, -5, 0] : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{
              rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
              y: isClicked ? [0, -20, 5] : 0,
            }}
            transition={{
              rotate: { duration: 0.5, ease: "easeInOut" },
              y: { duration: 0.3 }
            }}
            className="mr-2"
          >
            <Download className="h-4 w-4" />
          </motion.div>
          {t('products.downloadSpecs')}
        </motion.div>
        
        {isClicked && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-green-600 text-white"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {t('products.downloading')}
          </motion.div>
        )}
      </Button>
    </motion.div>
  );
};
