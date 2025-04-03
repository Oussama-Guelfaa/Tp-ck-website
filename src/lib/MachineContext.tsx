"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react";
import {
  generateMockMachineData,
  type MachineData,
  type MachineStatus
} from "@/lib/dashboard-utils";

interface MachineContextType {
  machines: MachineData[];
  updateMachine: (id: string, updates: Partial<MachineData>) => void;
  isLoading: boolean;
}

// Create context with a default value
const defaultContextValue: MachineContextType = {
  machines: [],
  updateMachine: () => {},
  isLoading: true
};

const MachineContext = createContext<MachineContextType>(defaultContextValue);

export function MachineProvider({ children }: { children: ReactNode }) {
  const [machines, setMachines] = useState<MachineData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize with mock data
    const data = generateMockMachineData();
    setMachines(data);
    setIsLoading(false);
  }, []);

  const updateMachine = (id: string, updates: Partial<MachineData>) => {
    setMachines(prevMachines =>
      prevMachines.map(machine =>
        machine.id === id ? { ...machine, ...updates } : machine
      )
    );
  };

  return (
    <MachineContext.Provider value={{ machines, updateMachine, isLoading }}>
      {children}
    </MachineContext.Provider>
  );
}

export function useMachineContext() {
  const context = useContext(MachineContext);
  if (context === undefined) {
    throw new Error("useMachineContext must be used within a MachineProvider");
  }
  return context;
}
