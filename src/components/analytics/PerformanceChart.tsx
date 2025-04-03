"use client";

import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  TooltipProps
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MetricType,
  TimePeriod,
  TimeSeriesDataPoint,
  formatTimestamp,
  getMetricColor,
  getMetricLabel,
  getMetricRange
} from '@/lib/analytics-utils';
import { useTranslation } from "@/components/ui/language-selector";

interface PerformanceChartProps {
  title: string | React.ReactNode;
  metric: MetricType;
  data: TimeSeriesDataPoint[];
  period: TimePeriod;
  height?: number;
}

// Define the payload type for the tooltip
interface ChartDataPoint {
  time: string;
  value: number;
  fullTimestamp: string;
}

// Define a type for our custom tooltip props
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; name: string; }>;
  label?: string;
}

export function PerformanceChart({
  title,
  metric,
  data,
  period,
  height = 300
}: PerformanceChartProps) {
  const { t } = useTranslation();

  // Format data for the chart
  const chartData = data.map(point => ({
    time: formatTimestamp(point.timestamp, period),
    value: point.value,
    // Store the original timestamp for tooltips
    fullTimestamp: point.timestamp
  }));

  // Get value range for this metric type
  const [minValue, maxValue] = getMetricRange(metric);

  // Get color for this metric
  const lineColor = getMetricColor(metric,
    data.reduce((sum, point) => sum + point.value, 0) / data.length // Average value
  );

  // Get appropriate label
  const metricLabel = getMetricLabel(metric);

  // Calculate statistics
  const values = data.map(point => point.value);
  const average = values.reduce((sum, val) => sum + val, 0) / values.length;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const current = values[values.length - 1];

  // Translate period labels
  const getPeriodLabel = (period: TimePeriod) => {
    switch(period) {
      case '24h':
        return t('admin.dashboard.analytics.periodLabels.24h', 'Last 24 hours');
      case '7d':
        return t('admin.dashboard.analytics.periodLabels.7d', 'Last 7 days');
      case '30d':
        return t('admin.dashboard.analytics.periodLabels.30d', 'Last 30 days');
      case '90d':
        return t('admin.dashboard.analytics.periodLabels.90d', 'Last 90 days');
      default:
        return '';
    }
  };

  // Custom tooltip formatter with proper typing
  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm">
            <span className="font-medium">{metricLabel}:</span> {' '}
            <span style={{ color: getMetricColor(metric, payload[0].value) }}>
              {payload[0].value.toFixed(metric === 'production' ? 0 : 1)}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>
          {getPeriodLabel(period)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <div className="grid grid-cols-4 mb-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">{t('admin.dashboard.analytics.current', 'Current')}</p>
              <p className="text-xl font-semibold" style={{ color: getMetricColor(metric, current) }}>
                {current.toFixed(metric === 'production' ? 0 : 1)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">{t('admin.dashboard.analytics.average', 'Average')}</p>
              <p className="text-xl font-semibold" style={{ color: getMetricColor(metric, average) }}>
                {average.toFixed(metric === 'production' ? 0 : 1)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">{t('admin.dashboard.analytics.min', 'Min')}</p>
              <p className="text-xl font-semibold" style={{ color: getMetricColor(metric, min) }}>
                {min.toFixed(metric === 'production' ? 0 : 1)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">{t('admin.dashboard.analytics.max', 'Max')}</p>
              <p className="text-xl font-semibold" style={{ color: getMetricColor(metric, max) }}>
                {max.toFixed(metric === 'production' ? 0 : 1)}
              </p>
            </div>
          </div>

          <div style={{ width: '100%', height }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="time"
                  tickMargin={10}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  domain={[minValue, maxValue]}
                  tickMargin={10}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={lineColor}
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
