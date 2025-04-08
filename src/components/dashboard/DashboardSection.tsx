"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, LineChart, Gauge, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MachineStatusCard } from "@/components/dashboard/MachineStatusCard";
import { useMachineContext } from "@/lib/MachineContext";
import { useTranslation } from "@/components/ui/language-selector";
import { AppFrame } from "./AppFrame";

export function DashboardSection() {
  const { machines, isLoading } = useMachineContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTab, setCurrentTab] = useState("overview");
  const { t } = useTranslation();

  // Calculate total statistics
  const totalProducts = machines.reduce((total, machine) => total + machine.productsToday, 0);
  const avgEfficiency = machines.length > 0
    ? Math.round(machines.reduce((sum, machine) => sum + machine.efficiencyRate, 0) / machines.length)
    : 0;
  const runningMachines = machines.filter(machine => machine.status === "Running").length;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section className="bg-white py-16 md:py-20 relative overflow-hidden">
      {/* Background elements - subtle gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white/50 z-0"></div>
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-center opacity-5 z-0"></div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.h2
            className="heading-lg mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t("dashboard.title", "Real-Time Machine Status Dashboard")}
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t("dashboard.subtitle", "Monitor the operational status, production metrics, and performance indicators of all TP@CK machines in real-time.")}
          </motion.p>

          {/* Summary Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12"
            variants={containerVariants}
            initial="hidden"
            animate={!isLoading ? "visible" : "hidden"}
          >
            <motion.div
              className="bg-white rounded-xl p-4 shadow-md border border-gray-100 flex items-center"
              variants={itemVariants}
            >
              <div className="bg-primary/10 rounded-lg p-3 mr-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500">{t("dashboard.stats.totalProduction", "Total Production")}</p>
                <p className="text-2xl font-bold">{totalProducts.toLocaleString()}</p>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-4 shadow-md border border-gray-100 flex items-center"
              variants={itemVariants}
            >
              <div className="bg-primary/10 rounded-lg p-3 mr-4">
                <Gauge className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500">{t("dashboard.stats.avgEfficiency", "Avg. Efficiency")}</p>
                <p className="text-2xl font-bold">{avgEfficiency}%</p>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-4 shadow-md border border-gray-100 flex items-center"
              variants={itemVariants}
            >
              <div className="bg-primary/10 rounded-lg p-3 mr-4">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500">{t("dashboard.stats.machinesRunning", "Machines Running")}</p>
                <p className="text-2xl font-bold">{runningMachines}/{machines.length}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Machine Cards */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="relative w-16 h-16">
              <motion.div
                className="absolute top-0 left-0 w-16 h-16 border-4 border-gray-200 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute top-0 left-0 w-16 h-16 border-t-4 border-primary rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
        ) : (
          <>
            <AppFrame title="Live Machine Monitor | Tp@ck OS">
              <div className="p-6 bg-gray-50">
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {machines.map((machine) => (
                    <motion.div key={machine.id} variants={itemVariants}>
                      <MachineStatusCard machine={machine} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </AppFrame>

            {/* View Full Dashboard Button */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link href="/admin/dashboard">
                <Button
                  className="bg-black hover:bg-black/90 text-white px-6 py-6 h-12 rounded-md"
                >
                  {t("dashboard.viewFull", "View Full Dashboard")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <p className="text-sm text-gray-500 mt-4">
                {t("dashboard.accessText", "Access the admin dashboard for detailed analytics and controls")}
              </p>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
