"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { MachineData } from "@/lib/dashboard-utils";
import {
  useCountUp,
  formatRelativeDate,
  getMaintenanceStatusColor,
  getStatusColor,
  getEfficiencyColor,
} from "@/lib/dashboard-utils";
import { useTranslation } from "@/components/ui/language-selector";

// Machine technical specifications type
interface MachineSpecs {
  throughput: string;
  dimensions: string;
  weight: string;
  power: string;
  air: string;
  materials: string;
  tempRange: string;
}

// Machine integration type
interface MachineIntegration {
  wms: string;
  api: string;
  monitoring: string;
  remote: string;
}

// Machine technical specifications by machine type
const machineTechnicalSpecs: Record<string, MachineSpecs> = {
  t20: {
    throughput: "500 units/hour",
    dimensions: "4m x 1.5m",
    weight: "400kg",
    power: "Three-phase, 16A",
    air: "None – 100% electric machine",
    materials: "Wood, recycled plastic, aluminum, steel",
    tempRange: "10°C to 30°C"
  },
  t30: {
    throughput: "500 units/hour",
    dimensions: "4m x 1.5m",
    weight: "400kg",
    power: "Three-phase, 16A",
    air: "None – 100% electric machine",
    materials: "Wood, recycled plastic, aluminum, steel",
    tempRange: "10°C to 30°C"
  },
  t50: {
    throughput: "500 units/hour",
    dimensions: "4m x 1.5m",
    weight: "400kg",
    power: "Three-phase, 16A",
    air: "None – 100% electric machine",
    materials: "Wood, recycled plastic, aluminum, steel",
    tempRange: "10°C to 30°C"
  }
};

// Machine integration capabilities by machine type
const machineIntegration: Record<string, MachineIntegration> = {
  t20: {
    wms: "Compatible with all client WMS systems",
    api: "Exchange table, TCP/IP protocol",
    monitoring: "IConnect Application",
    remote: "Via 4G module"
  },
  t30: {
    wms: "Compatible with all client WMS systems",
    api: "Exchange table, TCP/IP protocol",
    monitoring: "IConnect Application",
    remote: "Via 4G module"
  },
  t50: {
    wms: "Compatible with all client WMS systems",
    api: "Exchange table, TCP/IP protocol",
    monitoring: "IConnect Application",
    remote: "Via 4G module"
  }
};

export function MachineStatusCard({ machine }: { machine: MachineData }) {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();
  const productCount = useCountUp(machine.productsToday, 3000);
  const efficiencyCount = useCountUp(machine.efficiencyRate, 2000);
  const progressCount = useCountUp(machine.progressPercent, 2500);

  // Animated pulse effect for status indicator
  const pulseAnimation = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  // Translate machine status
  const getStatusTranslation = (status: string) => {
    switch(status) {
      case "Running":
        return t("machine.status.running", "Running");
      case "Stopped":
        return t("machine.status.stopped", "Stopped");
      case "Under Maintenance":
        return t("machine.status.maintenance", "Under Maintenance");
      default:
        return status;
    }
  };

  // Translate efficiency levels
  const getEfficiencyTranslation = (efficiency: number) => {
    if (efficiency >= 85) {
      return t("machine.efficiency.excellent", "Excellent");
    } else if (efficiency >= 70) {
      return t("machine.efficiency.good", "Good");
    } else if (efficiency >= 50) {
      return t("machine.efficiency.average", "Average");
    } else {
      return t("machine.efficiency.low", "Low");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ translateY: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <div
          className={`h-2 w-full ${
            machine.status === "Running"
              ? "bg-green-500"
              : machine.status === "Stopped"
              ? "bg-red-500"
              : "bg-amber-500"
          }`}
        ></div>
        <CardHeader className="relative pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              {machine.name}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <div
                className={`relative flex items-center justify-center h-3 w-3 rounded-full ${getStatusColor(
                  machine.status
                )}`}
              >
                {machine.status === "Running" && (
                  <motion.div
                    className={`absolute inset-0 h-3 w-3 rounded-full ${getStatusColor(
                      machine.status
                    )}`}
                    {...pulseAnimation}
                  />
                )}
              </div>
              <span className="text-sm font-medium">{getStatusTranslation(machine.status)}</span>
            </div>
          </div>
          {machine.hasWarning && (
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="absolute top-3 right-0 mr-2 cursor-pointer">
                  <motion.div
                    animate={{
                      rotate: isHovered ? [0, 15, 0, -15, 0] : 0,
                    }}
                    transition={{ duration: 0.5, repeat: isHovered ? 1 : 0 }}
                  >
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                  </motion.div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="bg-amber-50 border-amber-200 p-3 w-60">
                <p className="text-sm font-medium text-amber-800">
                  {machine.warningMessage || t("machine.warning.default", "Warning alert active")}
                </p>
              </HoverCardContent>
            </HoverCard>
          )}
        </CardHeader>

        <CardContent className="space-y-6 pt-0">
          {/* Main Stats */}
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-md p-3">
                <p className="text-sm text-gray-500 mb-1">{t("machine.metrics.productsToday", "Products Today")}</p>
                <p className="text-2xl font-bold">{productCount}</p>
              </div>
              <div className="bg-gray-50 rounded-md p-3">
                <p className="text-sm text-gray-500 mb-1">{t("machine.metrics.timeRunning", "Time Running")}</p>
                <p className="text-2xl font-bold">{machine.timeRunning}</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between mb-1">
              <p className="text-sm text-gray-500">{t("machine.metrics.progress", "Production Progress")}</p>
              <p className="text-sm font-medium">{progressCount}%</p>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${machine.progressPercent}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Efficiency Circle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t("machine.metrics.efficiency", "Efficiency Rate")}</p>
              <div className="flex items-center space-x-2">
                <p className="text-xl font-bold">{efficiencyCount}%</p>
                <div
                  className={
                    machine.efficiencyRate >= 90
                      ? "text-green-500 text-xs"
                      : machine.efficiencyRate >= 75
                      ? "text-green-600 text-xs"
                      : machine.efficiencyRate >= 50
                      ? "text-amber-500 text-xs"
                      : "text-red-500 text-xs"
                  }
                >
                  {getEfficiencyTranslation(machine.efficiencyRate)}
                </div>
              </div>
            </div>
            <div className="relative w-16 h-16">
              <svg viewBox="0 0 36 36" className="w-16 h-16 transform -rotate-90">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#f3f4f6"
                  strokeWidth="3"
                />
                <motion.circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke={getEfficiencyColor(machine.efficiencyRate)}
                  strokeWidth="3"
                  strokeDasharray="100"
                  initial={{ strokeDashoffset: 100 }}
                  animate={{
                    strokeDashoffset: 100 - machine.efficiencyRate,
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeLinecap="round"
                  strokeDashoffset={100 - machine.efficiencyRate}
                />
              </svg>
            </div>
          </div>

          {/* System Indicators */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t("machine.metrics.temperature", "Temperature")}</p>
              <div className="flex items-center space-x-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    machine.temperature > 60
                      ? "bg-red-500"
                      : machine.temperature > 45
                      ? "bg-amber-500"
                      : "bg-green-500"
                  }`}
                ></div>
                <p className="text-lg font-medium">{machine.temperature}°C</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">{t("machine.metrics.workload", "Workload")}</p>
              <div className="flex items-center space-x-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    machine.workload > 90
                      ? "bg-red-500"
                      : machine.workload > 70
                      ? "bg-amber-500"
                      : "bg-green-500"
                  }`}
                ></div>
                <p className="text-lg font-medium">{machine.workload}%</p>
              </div>
            </div>
          </div>

          {/* Machine Technical Specifications Tabs */}
          <Tabs defaultValue="specs" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="specs">{t("machine.info.specs", "Specifications")}</TabsTrigger>
              <TabsTrigger value="integration">{t("machine.info.integration", "Integration")}</TabsTrigger>
            </TabsList>
            <TabsContent value="specs" className="pt-2">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("machine.specs.throughput", "Throughput")}:</span>
                  <span className="font-medium">{machineTechnicalSpecs[machine.id]?.throughput}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("machine.specs.dimensions", "Dimensions")}:</span>
                  <span className="font-medium">{machineTechnicalSpecs[machine.id]?.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("machine.specs.weight", "Weight")}:</span>
                  <span className="font-medium">{machineTechnicalSpecs[machine.id]?.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("machine.specs.power", "Power")}:</span>
                  <span className="font-medium">{machineTechnicalSpecs[machine.id]?.power}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("machine.specs.materials", "Materials")}:</span>
                  <span className="font-medium">{machineTechnicalSpecs[machine.id]?.materials}</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="integration" className="pt-2">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("machine.integration.wms", "WMS")}:</span>
                  <span className="font-medium">{machineIntegration[machine.id]?.wms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("machine.integration.api", "Protocol")}:</span>
                  <span className="font-medium">{machineIntegration[machine.id]?.api}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("machine.integration.monitoring", "Monitoring")}:</span>
                  <span className="font-medium">{machineIntegration[machine.id]?.monitoring}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("machine.integration.remote", "Remote")}:</span>
                  <span className="font-medium">{machineIntegration[machine.id]?.remote}</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="border-t pt-4 justify-between text-sm">
          <div>
            <span className="text-gray-500">{t("machine.metrics.lastMaintenance", "Last Maintenance")}:</span>
            <span className={`ml-2 font-medium ${getMaintenanceStatusColor(machine.lastMaintenance)}`}>
              {formatRelativeDate(machine.lastMaintenance)}
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-primary hover:text-primary/80 font-medium"
          >
            {t("machine.metrics.details", "Details")}
          </motion.button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
