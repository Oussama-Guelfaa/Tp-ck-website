"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowLeft,
  Sliders,
  AlertCircle,
  Settings,
  BarChart,
  User,
  LogOut,
  ShieldAlert,
  Clock,
  Activity,
  ChevronDown,
  ChevronUp,
  X
} from "lucide-react";
import { useMachineContext } from "@/lib/MachineContext";
import { useAuth } from "@/lib/AuthContext";
import { MachineStatusCard } from "@/components/dashboard/MachineStatusCard";
import { MachineAnalyticsDashboard } from "@/components/analytics/MachineAnalyticsDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { type MachineData, type MachineStatus } from "@/lib/dashboard-utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/components/ui/language-selector";

export default function AdminDashboardPage() {
  const { machines, updateMachine, isLoading } = useMachineContext();
  const { user, logout, hasPermission, isAuthenticated } = useAuth();
  const [selectedMachine, setSelectedMachine] = useState<string>("t20");
  const router = useRouter();
  const { t } = useTranslation();

  // State for analytics panel
  const [selectedAnalyticsMachine, setSelectedAnalyticsMachine] = useState<MachineData | null>(null);

  // Force redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, router]);

  // Find the currently selected machine
  const currentMachine = machines.find((m) => m.id === selectedMachine);

  // Form state for machine controls
  const [formData, setFormData] = useState({
    status: "Running" as MachineStatus,
    hasWarning: false,
    productsToday: 0,
    timeRunning: "00:00:00",
    progressPercent: 0,
    efficiencyRate: 0,
    temperature: 0,
    workload: 0,
    lastMaintenance: new Date().toISOString().slice(0, 10),
  });

  // Update form data when selected machine changes
  useEffect(() => {
    if (currentMachine) {
      setFormData({
        status: currentMachine.status,
        hasWarning: currentMachine.hasWarning,
        productsToday: currentMachine.productsToday,
        timeRunning: currentMachine.timeRunning,
        progressPercent: currentMachine.progressPercent,
        efficiencyRate: currentMachine.efficiencyRate,
        temperature: currentMachine.temperature,
        workload: currentMachine.workload,
        lastMaintenance: currentMachine.lastMaintenance,
      });
    }
  }, [currentMachine]);

  // Handle form input changes
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Update the machine context immediately for real-time feedback
    if (currentMachine) {
      const updatedMachine = {
        ...currentMachine,
        [field]: value,
      };
      updateMachine(currentMachine.id, { [field]: value });
    }
  };

  // Toggle warning state
  const toggleWarning = (value: boolean) => {
    handleInputChange("hasWarning", value);
  };

  // Handle opening analytics for a machine
  const handleOpenAnalytics = (machine: MachineData) => {
    setSelectedAnalyticsMachine(machine);
  };

  // Handle closing analytics panel
  const handleCloseAnalytics = () => {
    setSelectedAnalyticsMachine(null);
  };

  // Check if there is no machine selected - should never happen but handle it anyway
  if (!currentMachine && !isLoading && machines.length > 0) {
    setSelectedMachine(machines[0].id);
  }

  return (
    <MainLayout>
      <section className="py-8">
        <div className="container-custom">
          {/* Admin Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-8">
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <Sliders className="mr-2 h-6 w-6 text-primary" />
                {t("admin.dashboard.title", "Admin Dashboard")}
              </h1>
              <p className="text-gray-500 mt-1">
                {t("admin.dashboard.welcome", "Welcome to the TP@CK administrative control panel.")}
              </p>
            </div>
            <div className="flex space-x-2">
              <Link href="/">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  {t("admin.dashboard.backToSite", "Back to Site")}
                </Button>
              </Link>
              <Button variant="destructive" onClick={logout} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                {t("admin.dashboard.logout", "Logout")}
              </Button>
            </div>
          </div>

          {/* User Role Banner */}
          <div className={`mb-8 rounded-md p-4 flex items-center space-x-3 ${
            user?.role === 'admin' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
            user?.role === 'operator' ? 'bg-green-50 text-green-800 border border-green-200' :
            'bg-amber-50 text-amber-800 border border-amber-200'
          }`}>
            <div className={`p-2 rounded-full ${
              user?.role === 'admin' ? 'bg-blue-100' :
              user?.role === 'operator' ? 'bg-green-100' :
              'bg-amber-100'
            }`}>
              {user?.role === 'admin' ? <ShieldAlert className="h-5 w-5" /> :
               user?.role === 'operator' ? <Activity className="h-5 w-5" /> :
               <User className="h-5 w-5" />}
            </div>
            <div>
              <p className="font-medium">
                {user?.role === 'admin' ? t("admin.roles.admin", "Administrator Access") :
                 user?.role === 'operator' ? t("admin.roles.operator", "Operator Access") :
                 t("admin.roles.viewer", "Viewer Access")}
              </p>
              <p className="text-sm">
                {user?.role === 'admin' ? t("admin.roles.adminDesc", "You have full permissions to control all machine parameters and settings.") :
                 user?.role === 'operator' ? t("admin.roles.operatorDesc", "You can control machine parameters but cannot change system settings.") :
                 t("admin.roles.viewerDesc", "You have read-only access to monitor machines. Controls are disabled.")}
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Display analytics panel if a machine is selected for analytics */}
            {selectedAnalyticsMachine ? (
              <div className="bg-white p-6 rounded-lg border shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">{t("admin.dashboard.analytics.title", "{machine} Performance Analytics").replace("{machine}", selectedAnalyticsMachine.name)}</h2>
                  <Button variant="ghost" size="sm" onClick={handleCloseAnalytics}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <MachineAnalyticsDashboard machine={selectedAnalyticsMachine} />
              </div>
            ) : (
              /* Machine Status Dashboard */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {machines.map((machine) => (
                  <div key={machine.id} className="flex flex-col">
                    <MachineStatusCard machine={machine} />
                    <Button
                      variant="ghost"
                      className="mt-2 text-primary"
                      onClick={() => handleOpenAnalytics(machine)}
                    >
                      <BarChart className="h-4 w-4 mr-2" />
                      {t("admin.dashboard.monitor.viewAnalytics", "View Analytics")}
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Machine Controls */}
            <div id="controls" className="mt-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Sliders className="mr-2 h-6 w-6 text-primary" />
                {t("admin.dashboard.controlPanel", "Machine Control Panel")}
              </h2>

              <Tabs defaultValue="controls" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="controls">
                    <Sliders className="h-4 w-4 mr-2" />
                    {t("admin.dashboard.controls.title", "Machine Parameters Control")}
                  </TabsTrigger>
                  {hasPermission("changeSettings") && (
                    <TabsTrigger value="system">
                      <Settings className="h-4 w-4 mr-2" />
                      {t("admin.dashboard.system.title", "System Settings")}
                    </TabsTrigger>
                  )}
                </TabsList>

                <TabsContent value="controls">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("admin.dashboard.controls.title", "Machine Parameters Control")}</CardTitle>
                      <CardDescription>
                        {t("admin.dashboard.controls.description", "Modify machine settings and parameters. Changes will be reflected in real-time on the dashboard.")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {!hasPermission("controlMachines") && (
                        <Alert variant="destructive" className="mb-6">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            {t("admin.dashboard.controls.viewOnly", "You have view-only access. To modify machine parameters, please log in with an operator or admin account.")}
                          </AlertDescription>
                        </Alert>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          {/* Machine Selection */}
                          <div className="space-y-2">
                            <Label htmlFor="machineSelect">{t("admin.dashboard.controls.selectMachine", "Select Machine")}</Label>
                            <Select
                              value={selectedMachine}
                              onValueChange={(value) => setSelectedMachine(value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Machine" />
                              </SelectTrigger>
                              <SelectContent>
                                {machines.map((machine) => (
                                  <SelectItem key={machine.id} value={machine.id}>
                                    {machine.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Machine Status */}
                          <div className="space-y-2">
                            <Label htmlFor="status">{t("admin.dashboard.controls.machineStatus", "Machine Status")}</Label>
                            <Select
                              value={formData.status}
                              onValueChange={(value: MachineStatus) =>
                                handleInputChange("status", value)
                              }
                              disabled={!hasPermission("controlMachines")}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Running">{t("machine.status.running", "Running")}</SelectItem>
                                <SelectItem value="Stopped">{t("machine.status.stopped", "Stopped")}</SelectItem>
                                <SelectItem value="Under Maintenance">{t("machine.status.maintenance", "Under Maintenance")}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Warning Status */}
                          <div className="space-y-2">
                            <Label>{t("admin.dashboard.controls.warningStatus", "Warning Status")}</Label>
                            <div className="flex space-x-2">
                              <Button
                                variant={formData.hasWarning ? "destructive" : "outline"}
                                onClick={() => toggleWarning(true)}
                                disabled={!hasPermission("controlMachines")}
                                className="flex-1"
                              >
                                <AlertCircle className="h-4 w-4 mr-2" />
                                {t("admin.dashboard.controls.enableWarning", "Enable Warning")}
                              </Button>
                              <Button
                                variant={!formData.hasWarning ? "default" : "outline"}
                                onClick={() => toggleWarning(false)}
                                disabled={!hasPermission("controlMachines")}
                                className="flex-1"
                              >
                                <X className="h-4 w-4 mr-2" />
                                {t("admin.dashboard.controls.clearWarning", "Clear Warning")}
                              </Button>
                            </div>
                          </div>

                          {/* Products Today */}
                          <div className="space-y-2">
                            <Label htmlFor="productsToday">{t("admin.dashboard.controls.products", "Total Products Produced Today")}</Label>
                            <div className="flex items-center space-x-4">
                              <Input
                                id="productsToday"
                                type="number"
                                value={formData.productsToday}
                                onChange={(e) => handleInputChange("productsToday", parseInt(e.target.value) || 0)}
                                disabled={!hasPermission("controlMachines")}
                                className="flex-1"
                              />
                              <span className="text-gray-500 w-12">units</span>
                            </div>
                          </div>

                          {/* Time Running */}
                          <div className="space-y-2">
                            <Label htmlFor="timeRunning">{t("admin.dashboard.controls.timeRunning", "Time Running (HH:MM:SS)")}</Label>
                            <Input
                              id="timeRunning"
                              value={formData.timeRunning}
                              onChange={(e) => handleInputChange("timeRunning", e.target.value)}
                              disabled={!hasPermission("controlMachines")}
                            />
                          </div>

                          {/* Last Maintenance */}
                          <div className="space-y-2">
                            <Label htmlFor="lastMaintenance">{t("admin.dashboard.controls.maintenance", "Last Maintenance Date")}</Label>
                            <Input
                              id="lastMaintenance"
                              type="date"
                              value={formData.lastMaintenance}
                              onChange={(e) => handleInputChange("lastMaintenance", e.target.value)}
                              disabled={!hasPermission("controlMachines")}
                            />
                          </div>
                        </div>

                        <div className="space-y-6">
                          {/* Progress Percent */}
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="progressPercent">{t("admin.dashboard.controls.progress", "Production Progress")}</Label>
                              <span>{formData.progressPercent}%</span>
                            </div>
                            <Slider
                              id="progressPercent"
                              min={0}
                              max={100}
                              step={1}
                              value={[formData.progressPercent]}
                              onValueChange={(value) => handleInputChange("progressPercent", value[0])}
                              disabled={!hasPermission("controlMachines")}
                            />
                          </div>

                          {/* Efficiency Rate */}
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="efficiencyRate">{t("admin.dashboard.controls.efficiency", "Efficiency Rate")}</Label>
                              <span>{formData.efficiencyRate}%</span>
                            </div>
                            <Slider
                              id="efficiencyRate"
                              min={0}
                              max={100}
                              step={1}
                              value={[formData.efficiencyRate]}
                              onValueChange={(value) => handleInputChange("efficiencyRate", value[0])}
                              disabled={!hasPermission("controlMachines")}
                            />
                          </div>

                          {/* Temperature */}
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="temperature">{t("admin.dashboard.controls.temperature", "Temperature (°C)")}</Label>
                              <span>{formData.temperature}°C</span>
                            </div>
                            <Slider
                              id="temperature"
                              min={0}
                              max={100}
                              step={1}
                              value={[formData.temperature]}
                              onValueChange={(value) => handleInputChange("temperature", value[0])}
                              disabled={!hasPermission("controlMachines")}
                            />
                          </div>

                          {/* Workload */}
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="workload">{t("admin.dashboard.controls.workload", "Workload")}</Label>
                              <span>{formData.workload}%</span>
                            </div>
                            <Slider
                              id="workload"
                              min={0}
                              max={100}
                              step={1}
                              value={[formData.workload]}
                              onValueChange={(value) => handleInputChange("workload", value[0])}
                              disabled={!hasPermission("controlMachines")}
                            />
                          </div>

                          <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center text-sm text-gray-500">
                              <span>{t("admin.dashboard.controls.lastUpdated", "Last updated:")}</span>
                              <span>{new Date().toLocaleTimeString()}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {t("admin.dashboard.controls.realTime", "Changes are applied in real-time")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {hasPermission("changeSettings") && (
                  <TabsContent value="system">
                    <Card>
                      <CardHeader>
                        <CardTitle>{t("admin.dashboard.system.title", "System Settings")}</CardTitle>
                        <CardDescription>
                          {t("admin.dashboard.system.description", "Configure global system parameters and preferences")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {/* System Info */}
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="font-semibold mb-2">{t("admin.dashboard.system.info.title", "System Information")}</h3>
                            <p className="text-sm text-gray-600 mb-3">
                              {t("admin.dashboard.system.info.description", "This is a demonstration of the admin control panel functionality with role-based permissions.")}
                            </p>

                            <div className="text-sm space-y-2 text-gray-700">
                              <div className="grid grid-cols-2">
                                <span>{t("admin.dashboard.system.info.version", "System Version:")}</span>
                                <span className="font-medium">1.0.5</span>
                              </div>
                              <div className="grid grid-cols-2">
                                <span>{t("admin.dashboard.system.info.lastSync", "Last Sync:")}</span>
                                <span className="font-medium">{t("admin.dashboard.system.info.justNow", "Just now (real-time)")}</span>
                              </div>
                              <div className="grid grid-cols-2">
                                <span>{t("admin.dashboard.system.info.apiStatus", "API Status:")}</span>
                                <span className="font-medium text-green-600">{t("admin.dashboard.system.info.connected", "Connected")}</span>
                              </div>
                              <div className="grid grid-cols-2">
                                <span>{t("admin.dashboard.system.info.currentUser", "Current User:")}</span>
                                <span className="font-medium">
                                  {user ? `${user.fullName} (${user.role})` : 'Not logged in'}
                                </span>
                              </div>
                            </div>
                          </div>

                          {hasPermission("changeSettings") && (
                            <div className="mt-6">
                              <Link href="/admin/settings">
                                <Button className="bg-primary hover:bg-primary/90 text-white">
                                  <Settings className="mr-2 h-4 w-4" /> {t("admin.dashboard.system.advancedSettings", "Advanced System Settings")}
                                </Button>
                              </Link>
                              <p className="text-sm text-gray-500 mt-2">
                                {t("admin.dashboard.system.advancedDescription", "Access advanced configuration options for administrators")}
                              </p>
                            </div>
                          )}

                          {hasPermission("changeSettings") && (
                            <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-3">
                                <Label className="text-base">{t("admin.dashboard.system.email", "System Notification Email")}</Label>
                                <Input
                                  type="email"
                                  defaultValue="admin@tpack.com"
                                />
                              </div>
                              <div className="space-y-3">
                                <Label className="text-base">{t("admin.dashboard.system.backup", "Backup Frequency")}</Label>
                                <Select defaultValue="daily">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select backup frequency" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="hourly">{t("admin.dashboard.system.backupOptions.hourly", "Hourly")}</SelectItem>
                                    <SelectItem value="daily">{t("admin.dashboard.system.backupOptions.daily", "Daily")}</SelectItem>
                                    <SelectItem value="weekly">{t("admin.dashboard.system.backupOptions.weekly", "Weekly")}</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      {hasPermission("changeSettings") && (
                        <CardFooter className="border-t pt-6">
                          <Button className="bg-primary hover:bg-primary/90 text-white">
                            {t("admin.dashboard.system.saveSettings", "Save Settings")}
                          </Button>
                        </CardFooter>
                      )}
                    </Card>
                  </TabsContent>
                )}
              </Tabs>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                {t("admin.dashboard.demoNotice", "This is a demonstration of the admin dashboard with role-based access control. In a production environment, additional security measures would be implemented.")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
