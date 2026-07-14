import Clock from "../../widgets/Clock/Clock";
import Panchangam from "../../widgets/Panchangam/Panchangam";


export default function CenterColumn() {

  return (

    <section className="column center">

      <Clock />

      <Panchangam />

    </section>

  );

}