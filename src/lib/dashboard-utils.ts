import { useState, useEffect } from 'react';

// Machine status types
export type MachineStatus = 'Running' | 'Stopped' | 'Under Maintenance';

// Machine data type
export interface MachineData {
  id: string;
  name: string;
  productsToday: number;
  status: MachineStatus;
  progressPercent: number;
  timeRunning: string; // in HH:MM:SS format
  lastMaintenance: string; // ISO date format
  efficiencyRate: number; // 0-100
  temperature: number; // in celsius
  workload: number; // 0-100
  hasWarning: boolean;
  warningMessage?: string;
}

// Mock data generator for the dashboard
export function generateMockMachineData(): MachineData[] {
  return [
    {
      id: 't20',
      name: 'T20',
      productsToday: 1289,
      status: 'Running',
      progressPercent: 78,
      timeRunning: '06:45:12',
      lastMaintenance: '2025-03-15',
      efficiencyRate: 92,
      temperature: 42,
      workload: 75,
      hasWarning: false
    },
    {
      id: 't30',
      name: 'T30',
      productsToday: 2143,
      status: 'Under Maintenance',
      progressPercent: 0,
      timeRunning: '02:12:45',
      lastMaintenance: '2025-03-28',
      efficiencyRate: 0,
      temperature: 22,
      workload: 0,
      hasWarning: true,
      warningMessage: 'Scheduled maintenance in progress'
    },
    {
      id: 't50',
      name: 'T50',
      productsToday: 3567,
      status: 'Running',
      progressPercent: 94,
      timeRunning: '08:30:00',
      lastMaintenance: '2025-02-20',
      efficiencyRate: 87,
      temperature: 46,
      workload: 90,
      hasWarning: true,
      warningMessage: 'High temperature warning'
    }
  ];
}

// Custom hook for counter animation with SSR safety
export function useCountUp(target: number, duration: number = 2000, start: number = 0): number {
  const [count, setCount] = useState(start);

  // Only run the animation on the client side
  useEffect(() => {
    // Skip all animation logic during SSR
    if (typeof window === 'undefined') {
      return;
    }

    // If target is 0, just set to 0 and skip animation
    if (target === 0) {
      setCount(0);
      return;
    }

    let startTime: number | null = null;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressPercent = Math.min(progress / duration, 1);

      // Easing function for smoother animation
      const easeOutQuad = (t: number) => t * (2 - t);
      const easedProgress = easeOutQuad(progressPercent);

      setCount(Math.floor(easedProgress * (target - start) + start));

      if (progressPercent < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    // Only run requestAnimationFrame on the client
    if (typeof window !== 'undefined') {
      animationFrame = requestAnimationFrame(updateCount);

      return () => {
        cancelAnimationFrame(animationFrame);
      };
    }

    return undefined;
  }, [target, duration, start]);

  // For server-side rendering, return the target value immediately
  if (typeof window === 'undefined') {
    return target;
  }

  return count;
}

// Format date relative to now (e.g., "2 days ago")
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else {
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  }
}

// Get color for maintenance status based on date
export function getMaintenanceStatusColor(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 7) {
    return 'text-green-500'; // Recent maintenance
  } else if (diffDays < 30) {
    return 'text-amber-500'; // Maintenance in the last month
  } else {
    return 'text-red-500'; // Maintenance overdue
  }
}

// Get status color based on machine status
export function getStatusColor(status: MachineStatus): string {
  switch (status) {
    case 'Running':
      return 'bg-green-500';
    case 'Stopped':
      return 'bg-red-500';
    case 'Under Maintenance':
      return 'bg-amber-500';
    default:
      return 'bg-gray-500';
  }
}

// Get efficiency color based on percentage
export function getEfficiencyColor(percent: number): string {
  if (percent >= 90) {
    return '#10b981'; // Emerald-500
  } else if (percent >= 75) {
    return '#22c55e'; // Green-500
  } else if (percent >= 50) {
    return '#f59e0b'; // Amber-500
  } else {
    return '#ef4444'; // Red-500
  }
}
