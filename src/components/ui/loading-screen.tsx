'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      // Check if there's a force parameter in the URL
      const urlParams = new URLSearchParams(window.location.search);
      const forceModelSelection = urlParams.get('forceModelSelection') === 'true';

      // We no longer need to check if user has already visited the model selection page

      // Always show loading screen on page refresh
      const timer = setTimeout(() => {
        setIsLoading(false);

        // If force parameter is present, go to model selection regardless
        if (forceModelSelection) {
          console.log('Forcing model selection page');
          router.push('/model-selection');
        } else {
          // Always go to home page by default
          console.log('Going to home page');
          router.push('/');
        }
      }, 2500); // 2.5 seconds loading time

      return () => clearTimeout(timer);
    } else {
      // Server-side rendering, don't show loading screen
      setIsLoading(false);
    }
  }, [router]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white"
        >
          {/* Background design elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary/5 translate-y-1/2 -translate-x-1/4 blur-3xl"></div>
          </div>
          <motion.div
            className="flex flex-col items-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative w-48 h-48 mb-8"
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            >
              <Image
                src="/images/tpack-logo.svg"
                alt="TP@CK Logo"
                fill
                className="object-contain drop-shadow-lg loading-pulse"
                priority
              />
            </motion.div>

            <div className="w-64 h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-primary/80 to-primary"
              />
            </div>

            <motion.p
              className="mt-4 text-sm text-gray-600 font-heading tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Loading...
            </motion.p>

            <motion.button
              className="mt-8 text-xs text-gray-400 hover:text-gray-600 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              onClick={() => {
                setIsLoading(false);
                // Check if there's a force parameter in the URL
                const urlParams = new URLSearchParams(window.location.search);
                const forceModelSelection = urlParams.get('forceModelSelection') === 'true';

                // We no longer need to check if user has already visited model selection

                // If force parameter is present, go to model selection regardless
                if (forceModelSelection) {
                  router.push('/model-selection');
                } else {
                  // Always go to home page by default
                  router.push('/');
                }
              }}
            >
              Skip
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
