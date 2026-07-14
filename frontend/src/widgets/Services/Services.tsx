import { useDashboard } from "../../context/DashboardContext";
import styles from "./Services.module.css";


type ServiceProps = {
  name: string;
  status: boolean;
};


function Service({
  name,
  status,
}: ServiceProps) {

  return (

    <div className={styles.service}>

      <div
        className={
          status
            ? styles.online
            : styles.offline
        }
      />


      <span>
        {name}
      </span>


      <strong>
        {status
          ? "ONLINE"
          : "OFFLINE"}
      </strong>


    </div>

  );

}



export default function Services(){

  const {
    services
  } = useDashboard();


  return (

    <div className={styles.card}>


      <div className={styles.title}>
        SERVICES
      </div>


      <Service
        name="Jellyfin"
        status={services.jellyfin}
      />


      <Service
        name="Immich"
        status={services.immich}
      />


      <Service
        name="Pi-hole"
        status={services.pihole}
      />

     <Service
        name="Home Assistant"
        status={services.homeAssistant}
      />

    </div>

  );

}