import { useEffect, useState } from "react";

export default function Clock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const day = now.toLocaleDateString("en-IN", {
    weekday: "long",
  });

  const date = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="clock">
      <div className="clock-time">
        {time}
      </div>

      <div className="clock-day">
        {day.toUpperCase()}
      </div>

      <div className="clock-date">
        {date.toUpperCase()}
      </div>
    </div>
  );
}