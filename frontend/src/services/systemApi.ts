import { getApiBase } from "../config/api";

export type DashboardData = {
  cpu: number;
  ram: number;
  disk: number;
  media: number;

  upload: number;
  download: number;
};

export async function getDashboardData(): Promise<DashboardData> {
  const API = await getApiBase();

  const response = await fetch(`${API}/stats`);

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  return response.json();
}