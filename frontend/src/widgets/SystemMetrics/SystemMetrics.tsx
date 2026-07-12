import {
  StatusMeter,
  NetworkGraph,
} from "./components";

import { Card } from "../../components/ui";

import { useDashboard } from "../../context/DashboardContext";


export default function SystemMetrics() {
  const stats = useDashboard();

  return (
    <div className="system-metrics">

      <Card title="SYSTEM">

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

      </Card>


      <Card title="NETWORK">

        <NetworkGraph
          upload={stats.upload}
          download={stats.download}
        />

      </Card>

    </div>
  );
}