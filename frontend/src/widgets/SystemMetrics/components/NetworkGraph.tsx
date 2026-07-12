import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  YAxis,
} from "recharts";

type Props = {
  upload: number;
  download: number;
};

type Point = {
  upload: number;
  download: number;
};

const HISTORY_LENGTH = 60;

export default function NetworkGraph({
  upload,
  download,
}: Props) {
  const [history, setHistory] = useState<Point[]>(
    Array.from({ length: HISTORY_LENGTH }, () => ({
      upload: 0,
      download: 0,
    }))
  );

  useEffect(() => {
    setHistory((prev) => [
      ...prev.slice(1),
      {
        upload,
        download,
      },
    ]);
  }, [upload, download]);

  const maxValue = Math.max(
    1,
    ...history.map((p) =>
      Math.max(p.upload, p.download)
    )
  );

  return (
    <div className="network-card">
      <div className="network-title">
        NETWORK
      </div>

      <div className="network-graph">
        <ResponsiveContainer
          width="100%"
          height={140}
        >
          <LineChart data={history}>
            <YAxis
              hide
              domain={[0, maxValue]}
            />

            <Line
              type="monotone"
              dataKey="upload"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />

            <Line
              type="monotone"
              dataKey="download"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="network-stats">
        <div className="upload">
          ↑ {upload.toFixed(2)} MB/s
        </div>

        <div className="download">
          ↓ {download.toFixed(2)} MB/s
        </div>
      </div>
    </div>
  );
}