"use client";

import { ReactNode, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  X, 
  Minus, 
  Maximize2, 
  Circle, 
  Clock, 
  Wifi, 
  Battery, 
  LayoutGrid, 
  Bell, 
  Settings, 
  RefreshCw,
  Server,
  Cpu,
  Database,
  BarChart
} from "lucide-react";
import { useTranslation } from "@/components/ui/language-selector";

interface AppFrameProps {
  children: ReactNode;
  title?: string;
}

export function AppFrame({ children, title = "Live Machine Monitor | Tp@ck OS" }: AppFrameProps) {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(frameRef, { once: false, amount: 0.3 });
  const { t } = useTranslation();

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const screenVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        delay: 0.3
      }
    }
  };

  const toolbarVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        delay: 0.5
      }
    }
  };

  const tabVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      ref={frameRef}
      className={`relative mx-auto ${isMaximized ? 'w-full max-w-none' : 'w-full max-w-7xl'}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* App window frame */}
      <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-200 bg-gray-900 text-white">
        {/* Window title bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          {/* Window controls */}
          <div className="flex items-center space-x-2">
            <motion.div 
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
            <motion.div 
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
            <motion.div 
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 cursor-pointer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMaximized(!isMaximized)}
            />
          </div>
          
          {/* Window title */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
            <motion.div
              className="flex items-center space-x-2 text-sm font-medium text-gray-300"
              variants={toolbarVariants}
            >
              <Server className="h-4 w-4" />
              <span>{title}</span>
            </motion.div>
          </div>
          
          {/* System indicators */}
          <motion.div 
            className="flex items-center space-x-3 text-xs text-gray-400"
            variants={toolbarVariants}
          >
            <div className="flex items-center">
              <Wifi className="h-3.5 w-3.5 mr-1" />
              <span>Connected</span>
            </div>
            <div className="flex items-center">
              <Battery className="h-3.5 w-3.5 mr-1" />
              <span>100%</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>{currentTime}</span>
            </div>
          </motion.div>
        </div>
        
        {/* App toolbar */}
        <motion.div 
          className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700"
          variants={toolbarVariants}
        >
          <div className="flex items-center space-x-4">
            <motion.div 
              className="flex items-center space-x-1 px-3 py-1 rounded-md bg-blue-600 text-white text-sm cursor-pointer"
              whileHover={{ backgroundColor: "#2563eb" }}
              whileTap={{ scale: 0.95 }}
            >
              <LayoutGrid className="h-4 w-4" />
              <span>{t("dashboard.toolbar.dashboard", "Dashboard")}</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-1 px-3 py-1 rounded-md hover:bg-gray-700 text-gray-300 text-sm cursor-pointer"
              whileHover={{ backgroundColor: "#374151" }}
              whileTap={{ scale: 0.95 }}
            >
              <Cpu className="h-4 w-4" />
              <span>{t("dashboard.toolbar.machines", "Machines")}</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-1 px-3 py-1 rounded-md hover:bg-gray-700 text-gray-300 text-sm cursor-pointer"
              whileHover={{ backgroundColor: "#374151" }}
              whileTap={{ scale: 0.95 }}
            >
              <Database className="h-4 w-4" />
              <span>{t("dashboard.toolbar.inventory", "Inventory")}</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-1 px-3 py-1 rounded-md hover:bg-gray-700 text-gray-300 text-sm cursor-pointer"
              whileHover={{ backgroundColor: "#374151" }}
              whileTap={{ scale: 0.95 }}
            >
              <BarChart className="h-4 w-4" />
              <span>{t("dashboard.toolbar.analytics", "Analytics")}</span>
            </motion.div>
          </div>
          
          <div className="flex items-center space-x-3">
            <motion.div 
              className="p-1.5 rounded-full hover:bg-gray-700 cursor-pointer"
              whileHover={{ backgroundColor: "#374151" }}
              whileTap={{ scale: 0.9 }}
            >
              <RefreshCw className="h-4 w-4 text-gray-400" />
            </motion.div>
            <motion.div 
              className="p-1.5 rounded-full hover:bg-gray-700 cursor-pointer"
              whileHover={{ backgroundColor: "#374151" }}
              whileTap={{ scale: 0.9 }}
            >
              <Bell className="h-4 w-4 text-gray-400" />
            </motion.div>
            <motion.div 
              className="p-1.5 rounded-full hover:bg-gray-700 cursor-pointer"
              whileHover={{ backgroundColor: "#374151" }}
              whileTap={{ scale: 0.9 }}
            >
              <Settings className="h-4 w-4 text-gray-400" />
            </motion.div>
          </div>
        </motion.div>
        
        {/* Tabs bar */}
        <motion.div 
          className="flex items-center px-4 py-1 bg-gray-800 border-b border-gray-700 overflow-x-auto"
          variants={toolbarVariants}
        >
          <motion.div 
            className="flex items-center space-x-2 px-3 py-1.5 rounded-t-md bg-white text-gray-900 text-xs font-medium border-b-2 border-blue-500"
            variants={tabVariants}
          >
            <Server className="h-3.5 w-3.5" />
            <span>{t("dashboard.tabs.overview", "Overview")}</span>
            <X className="h-3.5 w-3.5 ml-2 text-gray-500 hover:text-gray-700 cursor-pointer" />
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-2 px-3 py-1.5 rounded-t-md bg-gray-700 text-gray-300 text-xs font-medium ml-1"
            variants={tabVariants}
          >
            <Cpu className="h-3.5 w-3.5" />
            <span>{t("dashboard.tabs.machines", "Machine Status")}</span>
            <X className="h-3.5 w-3.5 ml-2 text-gray-500 hover:text-gray-400 cursor-pointer" />
          </motion.div>
        </motion.div>
        
        {/* App content */}
        <motion.div 
          className="bg-white text-gray-900"
          variants={screenVariants}
        >
          {children}
        </motion.div>
        
        {/* Status bar */}
        <motion.div 
          className="flex items-center justify-between px-4 py-1 bg-gray-800 border-t border-gray-700 text-xs text-gray-400"
          variants={toolbarVariants}
        >
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Circle className="h-2 w-2 mr-1 text-green-500 fill-current" />
              <span>{t("dashboard.status.allSystems", "All systems operational")}</span>
            </div>
          </div>
          <div>
            <span>{t("dashboard.status.version", "Tp@ck OS v2.4.1")}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
