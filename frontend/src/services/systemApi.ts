export type DashboardData = {
  cpu: number;
  ram: number;
  disk: number;
  media: number;

  upload: number;
  download: number;
};

const API_URL = "http://192.168.0.102:8000/stats";

export async function getDashboardData(): Promise<DashboardData> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  return response.json();
}