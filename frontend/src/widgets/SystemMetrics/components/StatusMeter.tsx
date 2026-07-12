type Props = {
  title: string;
  value: number;
  unit?: string;
};

export default function StatusMeter({
  title,
  value,
  unit = "%",
}: Props) {
  const segments = 20;
  const activeSegments = Math.round((value / 100) * segments);

  return (
    <div className="status-meter">
      <div className="status-meter-header">
        <span>{title}</span>

        <span>
          {value.toFixed(0)}
          {unit}
        </span>
      </div>

      <div className="status-meter-bar">
        {Array.from({ length: segments }).map((_, index) => {
          const active = index < activeSegments;

          let color = "#22c55e";

          if (index >= 16) color = "#ef4444";
          else if (index >= 12) color = "#f97316";
          else if (index >= 6) color = "#eab308";

          return (
            <div
              key={index}
              className="status-segment"
              style={{
                backgroundColor: active ? color : "#2b2b2b",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}