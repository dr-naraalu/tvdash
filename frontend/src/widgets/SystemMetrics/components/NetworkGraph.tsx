import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Props = {
  upload: number;
  download: number;
};

type Point = {
  upload: number;
  download: number;
};

const HISTORY = 60;

export default function NetworkGraph({
  upload,
  download,
}: Props) {

  const [history, setHistory] = useState<Point[]>(
    Array.from(
      { length: HISTORY },
      () => ({
        upload: 0,
        download: 0,
      })
    )
  );


  useEffect(() => {

    const timer = setInterval(() => {

      setHistory(prev => [
        ...prev.slice(1),
        {
          upload,
          download,
        },
      ]);

    }, 1000);


    return () =>
      clearInterval(timer);

  }, [
    upload,
    download
  ]);



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

          <LineChart
            data={history}
          >

            <CartesianGrid
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />


            <Line
              type="monotone"
              dataKey="upload"
              stroke="#7CFF9B"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />


            <Line
              type="monotone"
              dataKey="download"
              stroke="#78A8FF"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />


          </LineChart>

        </ResponsiveContainer>

      </div>



      <div className="network-stats">

        <span className="upload">
          ↑ {upload.toFixed(2)} MB/s
        </span>


        <span className="download">
          ↓ {download.toFixed(2)} MB/s
        </span>


      </div>


    </div>
  );
}