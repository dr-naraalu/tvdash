const API_ENDPOINTS = [
  "http://192.168.0.102:8000",
  "http://100.94.65.59:8000",
];

let apiBase: string | null = null;

export async function getApiBase() {
  if (apiBase) return apiBase;

  for (const url of API_ENDPOINTS) {
    try {
      const res = await fetch(`${url}/stats`, {
        signal: AbortSignal.timeout(1000),
      });

      if (res.ok) {
        apiBase = url;
        console.log("Using backend:", url);
        return url;
      }
    } catch {}
  }

  throw new Error("No backend found");
}