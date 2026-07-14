import SystemInfo from "../../widgets/SystemInfo";
import SystemMetrics from "../../widgets/SystemMetrics/SystemMetrics";
import Services from "../../widgets/Services";


export default function RightColumn(){

  return (

    <section className="column right">

      <SystemInfo />

      <SystemMetrics />

      <Services />

    </section>

  );

}