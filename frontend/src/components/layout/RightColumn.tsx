import SystemMetrics from "../../widgets/SystemMetrics/SystemMetrics";
import SystemInfo from "../../widgets/SystemInfo";


export default function RightColumn(){

  return (

    <section className="column right">

      <SystemInfo />

      <SystemMetrics />

    </section>

  );

}