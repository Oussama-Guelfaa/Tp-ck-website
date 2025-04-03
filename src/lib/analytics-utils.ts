import { format, subDays, subHours, subWeeks, subMonths, parseISO } from 'date-fns';
import { MachineData } from './dashboard-utils';

// Define time periods for analytics
export type TimePeriod = '24h' | '7d' | '30d' | '90d';

// Machine performance metrics we track
export type MetricType =
  | 'efficiency'
  | 'temperature'
  | 'production'
  | 'workload'
  | 'uptime';

// Data point for time series data
export interface TimeSeriesDataPoint {
  timestamp: string;
  value: number;
}

// Performance snapshot for a specific point in time
export interface PerformanceSnapshot {
  timestamp: string;
  efficiency: number;
  temperature: number;
  production: number;
  workload: number;
  uptime: number; // in minutes
  status: string;
}

// Performance data history for a machine
export interface MachinePerformanceHistory {
  machineId: string;
  machineName: string;
  snapshots: PerformanceSnapshot[];
}

// Generate random value with variation based on a base value
function generateRandomValue(baseValue: number, variation: number): number {
  const minValue = Math.max(0, baseValue - variation);
  const maxValue = baseValue + variation;
  return Math.round(minValue + Math.random() * (maxValue - minValue));
}

// Generate a performance snapshot for a point in time
function generatePerformanceSnapshot(
  timestamp: Date,
  baseEfficiency: number,
  baseTemperature: number,
  baseProduction: number,
  baseWorkload: number,
  baseUptime: number
): PerformanceSnapshot {
  const efficiency = generateRandomValue(baseEfficiency, 15);
  const temperature = generateRandomValue(baseTemperature, 8);
  const production = generateRandomValue(baseProduction, baseProduction * 0.2);
  const workload = generateRandomValue(baseWorkload, 15);
  const uptime = generateRandomValue(baseUptime, baseUptime * 0.1);

  // Determine status based on generated values
  let status = 'Running';
  if (uptime < 10) {
    status = 'Stopped';
  } else if (temperature > 60) {
    status = 'Warning';
  } else if (Math.random() < 0.05) {
    status = 'Under Maintenance';
  }

  return {
    timestamp: format(timestamp, 'yyyy-MM-dd HH:mm:ss'),
    efficiency,
    temperature,
    production,
    workload,
    uptime,
    status
  };
}

// Generate historical data for a machine
export function generateMachineHistory(
  machineId: string,
  machineName: string,
  currentData: MachineData,
  period: TimePeriod = '30d'
): MachinePerformanceHistory {
  const now = new Date();
  const snapshots: PerformanceSnapshot[] = [];

  // Determine number of data points and interval based on period
  let dataPoints: number;
  let intervalHours: number;

  switch (period) {
    case '24h':
      dataPoints = 24;
      intervalHours = 1;
      break;
    case '7d':
      dataPoints = 28; // 4 data points per day for a week
      intervalHours = 6;
      break;
    case '30d':
      dataPoints = 30; // 1 data point per day for a month
      intervalHours = 24;
      break;
    case '90d':
      dataPoints = 45; // 1 data point every 2 days for 90 days
      intervalHours = 48;
      break;
  }

  // Current baseline values
  const baseEfficiency = currentData.efficiencyRate;
  const baseTemperature = currentData.temperature;
  const baseProduction = currentData.productsToday / 24; // hourly rate
  const baseWorkload = currentData.workload;
  const baseUptime = 60; // baseline 60 minutes of uptime per hour

  // Generate data points going backward from now
  for (let i = dataPoints - 1; i >= 0; i--) {
    const pointTime = subHours(now, i * intervalHours);

    // Add some long-term trends
    let trendMultiplier = 1.0;

    // Machines tend to improve over time (learning, optimizations)
    const daysSinceStart = dataPoints * intervalHours / 24 - (i * intervalHours / 24);
    trendMultiplier += daysSinceStart * 0.001; // slight improvement over time

    // Add workday patterns
    const hour = pointTime.getHours();
    if (hour >= 9 && hour <= 17) {
      trendMultiplier *= 1.1; // 10% better during working hours
    } else if (hour >= 0 && hour <= 5) {
      trendMultiplier *= 0.9; // 10% worse during night
    }

    // Weekend effect
    const day = pointTime.getDay();
    if (day === 0 || day === 6) {
      trendMultiplier *= 0.8; // 20% worse on weekends
    }

    // Generate the snapshot with trend applied
    const snapshot = generatePerformanceSnapshot(
      pointTime,
      baseEfficiency * trendMultiplier,
      baseTemperature,
      baseProduction * trendMultiplier,
      baseWorkload * trendMultiplier,
      baseUptime * trendMultiplier
    );

    snapshots.push(snapshot);
  }

  return {
    machineId,
    machineName,
    snapshots
  };
}

// Extract data for a specific metric
export function extractMetricData(
  history: MachinePerformanceHistory,
  metric: MetricType
): TimeSeriesDataPoint[] {
  return history.snapshots.map(snapshot => {
    let value: number;

    switch (metric) {
      case 'efficiency':
        value = snapshot.efficiency;
        break;
      case 'temperature':
        value = snapshot.temperature;
        break;
      case 'production':
        value = snapshot.production;
        break;
      case 'workload':
        value = snapshot.workload;
        break;
      case 'uptime':
        value = snapshot.uptime;
        break;
    }

    return {
      timestamp: snapshot.timestamp,
      value
    };
  });
}

// Calculate average for a metric
export function calculateMetricAverage(
  history: MachinePerformanceHistory,
  metric: MetricType
): number {
  const data = extractMetricData(history, metric);
  const sum = data.reduce((acc, point) => acc + point.value, 0);
  return sum / data.length;
}

// Format timestamps for display based on time period
export function formatTimestamp(timestamp: string, period: TimePeriod): string {
  const date = parseISO(timestamp);

  switch (period) {
    case '24h':
      return format(date, 'HH:mm');
    case '7d':
      return format(date, 'EEE HH:mm');
    case '30d':
    case '90d':
      return format(date, 'MMM dd');
  }
}

// Get color for metric value based on thresholds
export function getMetricColor(metric: MetricType, value: number): string {
  switch (metric) {
    case 'efficiency':
      if (value >= 85) return '#10b981'; // green
      if (value >= 70) return '#22c55e'; // light green
      if (value >= 50) return '#f59e0b'; // amber
      return '#ef4444'; // red

    case 'temperature':
      if (value <= 40) return '#22c55e'; // green
      if (value <= 50) return '#f59e0b'; // amber
      return '#ef4444'; // red

    case 'production':
      // Production is contextual, use neutral color
      return '#3b82f6'; // blue

    case 'workload':
      if (value <= 60) return '#22c55e'; // green
      if (value <= 80) return '#f59e0b'; // amber
      return '#ef4444'; // red

    case 'uptime':
      if (value >= 50) return '#22c55e'; // green
      if (value >= 30) return '#f59e0b'; // amber
      return '#ef4444'; // red
  }
}

// Get an appropriate label for a metric
export function getMetricLabel(metric: MetricType): string {
  switch (metric) {
    case 'efficiency':
      return 'Efficiency Rate (%)';
    case 'temperature':
      return 'Temperature (°C)';
    case 'production':
      return 'Production (units/hour)';
    case 'workload':
      return 'Workload (%)';
    case 'uptime':
      return 'Uptime (minutes/hour)';
  }
}

// Get reasonable value ranges for each metric type for chart displays
export function getMetricRange(metric: MetricType): [number, number] {
  switch (metric) {
    case 'efficiency':
      return [0, 100];
    case 'temperature':
      return [20, 70];
    case 'production':
      return [0, 200]; // This will be adjusted based on actual data
    case 'workload':
      return [0, 100];
    case 'uptime':
      return [0, 60]; // minutes per hour
  }
}
