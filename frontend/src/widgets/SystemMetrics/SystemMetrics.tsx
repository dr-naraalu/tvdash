import { StatusMeter, NetworkGraph } from "./components";
import { useDashboard } from "../../context/DashboardContext";

export default function SystemMetrics() {
  const stats = useDashboard();

  return (
    <div className="system-metrics">
      <StatusMeter
        title="CPU"
        value={stats.cpu}
      />

      <StatusMeter
        title="RAM"
        value={stats.ram}
      />

      <StatusMeter
        title="ROOT"
        value={stats.disk}
      />

      <StatusMeter
        title="MEDIA"
        value={stats.media}
      />

      <NetworkGraph
        upload={stats.upload}
        download={stats.download}
      />
    </div>
  );
}