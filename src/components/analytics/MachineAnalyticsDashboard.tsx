"use client";

import { useState, useEffect } from 'react';
import {
  MachineData,
} from '@/lib/dashboard-utils';
import {
  MetricType,
  TimePeriod,
  MachinePerformanceHistory,
  generateMachineHistory,
  extractMetricData,
  getMetricLabel,
  getMetricColor
} from '@/lib/analytics-utils';
import { PerformanceChart } from './PerformanceChart';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';
import { BarChart3, LineChart, History, TrendingUp, Thermometer, GaugeCircle, Clock, Info, Server, Shield, Zap, Cpu, Download } from 'lucide-react';
import { useTranslation } from "@/components/ui/language-selector";

// Machine technical specifications type
interface MachineSpecs {
  throughput: string;
  dimensions: string;
  weight: string;
  power: string;
  air: string;
  materials: string;
  control: string;
  tempRange: string;
  connectivity: string;
}

// Machine integration type
interface MachineIntegration {
  wms: string;
  api: string;
  dataExchange: string;
  monitoring: string;
  remote: string;
}

// Machine technical specifications as a record
const machineTechnicalSpecs: Record<string, MachineSpecs> = {
  t20: {
    throughput: "500 units/hour",
    dimensions: "4m x 1.5m",
    weight: "400kg",
    power: "Three-phase, 16A",
    air: "None – 100% electric machine. Eco-friendly to the core!",
    materials: "Wood, recycled plastic, aluminum, steel – Sustainability first!",
    control: "Programmable logic controller (PLC)",
    tempRange: "10°C to 30°C",
    connectivity: "Ethernet, 4G module"
  },
  t30: {
    throughput: "500 units/hour",
    dimensions: "4m x 1.5m",
    weight: "400kg",
    power: "Three-phase, 16A",
    air: "None – 100% electric machine. Eco-friendly to the core!",
    materials: "Wood, recycled plastic, aluminum, steel – Sustainability first!",
    control: "Programmable logic controller (PLC)",
    tempRange: "10°C to 30°C",
    connectivity: "Ethernet, 4G module"
  },
  t50: {
    throughput: "500 units/hour",
    dimensions: "4m x 1.5m",
    weight: "400kg",
    power: "Three-phase, 16A",
    air: "None – 100% electric machine. Eco-friendly to the core!",
    materials: "Wood, recycled plastic, aluminum, steel – Sustainability first!",
    control: "Programmable logic controller (PLC)",
    tempRange: "10°C to 30°C",
    connectivity: "Ethernet, 4G module"
  }
};

// Machine integration capabilities as a record
const machineIntegration: Record<string, MachineIntegration> = {
  t20: {
    wms: "Compatible with all client WMS systems",
    api: "Exchange table, TCP/IP protocol",
    dataExchange: "Exchange table, TCP/IP protocol",
    monitoring: "IConnect Application",
    remote: "Via 4G module"
  },
  t30: {
    wms: "Compatible with all client WMS systems",
    api: "Exchange table, TCP/IP protocol",
    dataExchange: "Exchange table, TCP/IP protocol",
    monitoring: "IConnect Application",
    remote: "Via 4G module"
  },
  t50: {
    wms: "Compatible with all client WMS systems",
    api: "Exchange table, TCP/IP protocol",
    dataExchange: "Exchange table, TCP/IP protocol",
    monitoring: "IConnect Application",
    remote: "Via 4G module"
  }
}

// Define props interface for the component
interface MachineAnalyticsDashboardProps {
  machine: MachineData;
}

export function MachineAnalyticsDashboard({ machine }: MachineAnalyticsDashboardProps) {
  // State for time period selection
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('7d');
  const [performanceHistory, setPerformanceHistory] = useState<MachinePerformanceHistory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  // Generate historical data when machine or time period changes
  useEffect(() => {
    setIsLoading(true);

    // Simulate API call delay
    const timer = setTimeout(() => {
      const history = generateMachineHistory(
        machine.id,
        machine.name,
        machine,
        timePeriod
      );
      setPerformanceHistory(history);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [machine, timePeriod]);

  // Handle time period change
  const handleTimePeriodChange = (period: TimePeriod) => {
    setTimePeriod(period);
  };

  // Define metrics to display
  const metrics: { type: MetricType; title: string; icon: React.ReactNode }[] = [
    {
      type: 'efficiency',
      title: t('admin.dashboard.analytics.metrics.efficiency', 'Efficiency Rate'),
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      type: 'production',
      title: t('admin.dashboard.analytics.metrics.production', 'Production Volume'),
      icon: <BarChart3 className="h-5 w-5" />
    },
    {
      type: 'temperature',
      title: t('admin.dashboard.analytics.metrics.temperature', 'Temperature'),
      icon: <Thermometer className="h-5 w-5" />
    },
    {
      type: 'workload',
      title: t('admin.dashboard.analytics.metrics.workload', 'Workload'),
      icon: <GaugeCircle className="h-5 w-5" />
    },
    {
      type: 'uptime',
      title: t('admin.dashboard.analytics.metrics.uptime', 'Uptime'),
      icon: <Clock className="h-5 w-5" />
    }
  ];

  // Define loading state component
  const LoadingState = () => (
    <div className="flex justify-center items-center py-12">
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
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <History className="mr-2 h-6 w-6 text-primary" />
            {t('admin.dashboard.analytics.title', '{machine} Performance Analytics').replace('{machine}', machine.name)}
          </h2>
          <p className="text-gray-500 mt-1">
            {t('admin.dashboard.analytics.subtitle', 'Historical performance data and trends analysis')}
          </p>
        </div>

        <div className="flex space-x-1 bg-gray-100 p-1 rounded-md">
          <Button
            variant={timePeriod === '24h' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleTimePeriodChange('24h')}
            className={timePeriod === '24h' ? 'bg-primary text-white' : 'text-gray-600'}
          >
            {t('admin.dashboard.analytics.timeRanges.24h', '24h')}
          </Button>
          <Button
            variant={timePeriod === '7d' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleTimePeriodChange('7d')}
            className={timePeriod === '7d' ? 'bg-primary text-white' : 'text-gray-600'}
          >
            {t('admin.dashboard.analytics.timeRanges.7d', '7d')}
          </Button>
          <Button
            variant={timePeriod === '30d' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleTimePeriodChange('30d')}
            className={timePeriod === '30d' ? 'bg-primary text-white' : 'text-gray-600'}
          >
            {t('admin.dashboard.analytics.timeRanges.30d', '30d')}
          </Button>
          <Button
            variant={timePeriod === '90d' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleTimePeriodChange('90d')}
            className={timePeriod === '90d' ? 'bg-primary text-white' : 'text-gray-600'}
          >
            {t('admin.dashboard.analytics.timeRanges.90d', '90d')}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="charts" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="charts" className="text-base">
            <LineChart className="h-4 w-4 mr-2" />
            {t('admin.dashboard.analytics.charts', 'Performance Charts')}
          </TabsTrigger>
          <TabsTrigger value="summary" className="text-base">
            <BarChart3 className="h-4 w-4 mr-2" />
            {t('admin.dashboard.analytics.summary', 'Summary View')}
          </TabsTrigger>
          <TabsTrigger value="specs" className="text-base">
            <Info className="h-4 w-4 mr-2" />
            {t('admin.dashboard.analytics.specs', 'Technical Details')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="charts">
          {isLoading ? (
            <LoadingState />
          ) : performanceHistory ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {metrics.map((metric) => (
                <PerformanceChart
                  key={metric.type}
                  title={
                    <div className="flex items-center">
                      <span className="text-primary mr-2">{metric.icon}</span>
                      {metric.title}
                    </div>
                  }
                  metric={metric.type}
                  data={extractMetricData(performanceHistory, metric.type)}
                  period={timePeriod}
                  height={280}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              {t('admin.dashboard.analytics.noData', 'No data available for this machine')}
            </div>
          )}
        </TabsContent>

        <TabsContent value="summary">
          {isLoading ? (
            <LoadingState />
          ) : performanceHistory ? (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">{t('admin.dashboard.analytics.summaryTitle', 'Performance Summary')}</h3>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {metrics.map((metric) => {
                      const data = extractMetricData(performanceHistory, metric.type);
                      const values = data.map(point => point.value);
                      const average = values.reduce((sum, val) => sum + val, 0) / values.length;

                      // Calculate trend (last 7 days vs previous 7 days)
                      const midpoint = Math.floor(values.length / 2);
                      const recentAvg = values.slice(midpoint).reduce((sum, val) => sum + val, 0) /
                                       Math.max(1, values.slice(midpoint).length);
                      const previousAvg = values.slice(0, midpoint).reduce((sum, val) => sum + val, 0) /
                                         Math.max(1, values.slice(0, midpoint).length);
                      const trend = ((recentAvg - previousAvg) / previousAvg) * 100;

                      return (
                        <div
                          key={metric.type}
                          className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
                        >
                          <div className="flex items-center mb-2">
                            <div className="bg-primary/10 rounded-full p-2 mr-2">
                              {metric.icon}
                            </div>
                            <span className="font-medium">{metric.title}</span>
                          </div>

                          <div className="mt-2">
                            <p className="text-2xl font-bold" style={{ color: getMetricColor(metric.type, average) }}>
                              {average.toFixed(metric.type === 'production' ? 0 : 1)}
                            </p>
                            <p className="text-sm text-gray-500">{t('admin.dashboard.analytics.current', 'Current')}</p>
                          </div>

                          <div className="mt-2 flex items-center">
                            <div
                              className={`text-xs ${trend >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}
                            >
                              {trend >= 0 ? (
                                <TrendingUp className="h-3 w-3 mr-1" />
                              ) : (
                                <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
                              )}
                              {Math.abs(trend).toFixed(1)}% {trend >= 0 ?
                                t('admin.dashboard.analytics.increase', 'increase') :
                                t('admin.dashboard.analytics.decrease', 'decrease')}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium mb-2">{t('admin.dashboard.analytics.insights', 'Performance Insights')}</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <div className="mt-0.5 mr-2 h-2 w-2 rounded-full bg-blue-500"></div>
                        <span>
                          {t('admin.dashboard.analytics.efficiencyInsight', '{machine} has maintained an average efficiency rate of {rate}% over the selected period.')
                            .replace('{machine}', machine.name)
                            .replace('{rate}',
                              (extractMetricData(performanceHistory, 'efficiency')
                                .reduce((sum, point) => sum + point.value, 0) /
                                extractMetricData(performanceHistory, 'efficiency').length).toFixed(1)
                            )
                          }
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="mt-0.5 mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                        <span>
                          {(() => {
                            const productionData = extractMetricData(performanceHistory, 'production');
                            const maxIndex = productionData.reduce(
                              (maxIdx, point, idx, arr) => point.value > arr[maxIdx].value ? idx : maxIdx,
                              0
                            );
                            const date = new Date(productionData[maxIndex].timestamp);
                            return t('admin.dashboard.analytics.productionInsight', 'Peak production was observed on {date} with {units} units.')
                              .replace('{date}', date.toLocaleDateString())
                              .replace('{units}', productionData[maxIndex].value.toFixed(0));
                          })()}
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="mt-0.5 mr-2 h-2 w-2 rounded-full bg-amber-500"></div>
                        <span>
                          {(() => {
                            const tempData = extractMetricData(performanceHistory, 'temperature');
                            const highTempPoints = tempData.filter(point => point.value > 55);
                            if (highTempPoints.length > 0) {
                              return t('admin.dashboard.analytics.temperatureHighInsight', 'High temperature alerts occurred {count} times during this period.')
                                .replace('{count}', highTempPoints.length.toString());
                            } else {
                              return t('admin.dashboard.analytics.temperatureNormalInsight', 'Temperature has remained within optimal range throughout the period.');
                            }
                          })()}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-12 text-gray-500">
              {t('admin.dashboard.analytics.noData', 'No data available for this machine')}
            </div>
          )}
        </TabsContent>

        <TabsContent value="specs">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-5">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <Cpu className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">
                    {t('admin.dashboard.analytics.technicalSpecs', 'Technical Specifications')}
                  </h3>
                </div>

                <div className="space-y-4 mt-4">
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">{t('admin.dashboard.analytics.specs.throughput', 'Throughput Capacity')}</span>
                    <span className="text-gray-600">{machineTechnicalSpecs[machine.id]?.throughput}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">{t('admin.dashboard.analytics.specs.dimensions', 'Physical Dimensions')}</span>
                    <span className="text-gray-600">{machineTechnicalSpecs[machine.id]?.dimensions}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">{t('admin.dashboard.analytics.specs.weight', 'Weight')}</span>
                    <span className="text-gray-600">{machineTechnicalSpecs[machine.id]?.weight}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">{t('admin.dashboard.analytics.specs.power', 'Power Requirements')}</span>
                    <span className="text-gray-600">{machineTechnicalSpecs[machine.id]?.power}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">{t('admin.dashboard.analytics.specs.air', 'Air Consumption')}</span>
                    <span className="text-gray-600">{machineTechnicalSpecs[machine.id]?.air}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">{t('admin.dashboard.analytics.specs.control', 'Control System')}</span>
                    <span className="text-gray-600">{machineTechnicalSpecs[machine.id]?.control}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">{t('admin.dashboard.analytics.specs.materials', 'Supported Materials')}</span>
                    <span className="text-gray-600">{machineTechnicalSpecs[machine.id]?.materials}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">{t('admin.dashboard.analytics.specs.tempRange', 'Operating Temperature')}</span>
                    <span className="text-gray-600">{machineTechnicalSpecs[machine.id]?.tempRange}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">{t('admin.dashboard.analytics.specs.connectivity', 'Connectivity')}</span>
                    <span className="text-gray-600">{machineTechnicalSpecs[machine.id]?.connectivity}</span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white">
                    <Download className="mr-2 h-4 w-4" />
                    {t('admin.dashboard.analytics.specs.download', 'Download Technical Documentation')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-5">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <Server className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">
                    {t('admin.dashboard.analytics.integration', 'Integration & Connectivity')}
                  </h3>
                </div>

                <div className="space-y-4 mt-4">
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">{t('admin.dashboard.analytics.integration.wms', 'WMS Compatibility')}</span>
                    <span className="text-gray-600">{machineIntegration[machine.id]?.wms}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">{t('admin.dashboard.analytics.integration.api', 'API Documentation')}</span>
                    <span className="text-gray-600">{machineIntegration[machine.id]?.api}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">{t('admin.dashboard.analytics.integration.dataExchange', 'Data Exchange Protocols')}</span>
                    <span className="text-gray-600">{machineIntegration[machine.id]?.dataExchange}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">{t('admin.dashboard.analytics.integration.monitoring', 'Real-Time Monitoring')}</span>
                    <span className="text-gray-600">{machineIntegration[machine.id]?.monitoring}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">{t('admin.dashboard.analytics.integration.remote', 'Remote Management')}</span>
                    <span className="text-gray-600">{machineIntegration[machine.id]?.remote}</span>
                  </div>
                </div>

                <div className="mt-6 px-4 py-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">
                    {t('admin.dashboard.analytics.integration.apiKey', 'API Access')}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {t('admin.dashboard.analytics.integration.apiInstruction', 'Download complete API documentation for system integration:')}
                  </p>
                  <Button size="sm" className="bg-primary text-white hover:bg-primary/90 w-full">
                    {t('admin.dashboard.analytics.integration.apiButton', 'Access API Documentation')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
