import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  getDashboardData,
  type DashboardData,
} from "../services/systemApi";

const defaultData: DashboardData = {
  cpu: 0,
  ram: 0,
  disk: 0,
  media: 0,
  upload: 0,
  download: 0,
};

const DashboardContext =
  createContext<DashboardData>(defaultData);

export function DashboardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [data, setData] =
    useState(defaultData);

  useEffect(() => {
    async function refresh() {
      try {
        setData(await getDashboardData());
      } catch (err) {
        console.error(err);
      }
    }

    refresh();

    const timer = setInterval(
      refresh,
      1000
    );

    return () => clearInterval(timer);
  }, []);

  return (
    <DashboardContext.Provider value={data}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}