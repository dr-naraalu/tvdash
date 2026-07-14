import { useDashboard } from "../../context/DashboardContext";
import styles from "./Panchangam.module.css";


export default function Panchangam() {

  const { calendar } = useDashboard();


  return (

    <div className={styles.container}>


      <div className={styles.samvatsaram}>
        {calendar.samvatsaram}
      </div>


      <div className={styles.season}>
        {calendar.ayanam}, {calendar.rutuvu}
      </div>


      <div className={styles.maasam}>
        {calendar.maasam}
      </div>


      <div className={styles.tithi}>

        {calendar.tithi}

        <div className={styles.tithiEnd}>
          రా|| {calendar.tithi_end}
        </div>

      </div>


      <div className={styles.nakshatram}>
        న|| {calendar.nakshatram}
      </div>



      <div className={styles.sunmoon}>


        <div>

          <div className={styles.label}>
            సూర్యోదయం
          </div>

          <div className={styles.time}>
            {calendar.sunrise}
          </div>

        </div>



        <div>

          <div className={styles.label}>
            సూర్యాస్తమయం
          </div>

          <div className={styles.time}>
            {calendar.sunset}
          </div>

        </div>


      </div>


    </div>

  );

}