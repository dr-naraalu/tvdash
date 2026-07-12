import { useDashboard } from "../../context/DashboardContext";
import styles from "./SystemInfo.module.css";


function formatUptime(seconds:number){

  const days =
    Math.floor(seconds / 86400);

  const hours =
    Math.floor(
      (seconds % 86400) / 3600
    );

  const minutes =
    Math.floor(
      (seconds % 3600) / 60
    );


  return `${days}d ${hours}h ${minutes}m`;

}



export default function SystemInfo(){

  const {
    hostname,
    uptime,
  } = useDashboard();


  return (

    <div className={styles.card}>


      <div className={styles.title}>
        SERVER
      </div>


      <div className={styles.row}>

        <span>
          NAME
        </span>

        <strong>
          {hostname || "unknown"}
        </strong>

      </div>



      <div className={styles.row}>

        <span>
          UPTIME
        </span>

        <strong>
          {formatUptime(uptime)}
        </strong>

      </div>


    </div>

  );

}