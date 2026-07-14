import { useDashboard } from "../../context/DashboardContext";
import styles from "./Weather.module.css";


function weatherImage(code: number) {

  if (code <= 1)
    return "/weather/clear.jpg";


  if (code <= 3)
    return "/weather/cloudy.jpg";


  if (code <= 67)
    return "/weather/rain.jpg";


  if (code <= 77)
    return "/weather/cold.jpg";


  return "/weather/storm.jpg";

}



function weatherName(code: number) {

  if (code <= 1)
    return "Clear sky";


  if (code <= 3)
    return "Cloudy";


  if (code <= 67)
    return "Rain";


  if (code <= 77)
    return "Cold";


  return "Storm";

}



export default function Weather() {


  const {
    weather
  } = useDashboard();



  return (

    <div
      className={styles.weather}
      style={{
        backgroundImage:
          `url(${weatherImage(weather.condition)})`
      }}
    >


      <div className={styles.overlay}>


        <div className={styles.location}>
          HYDERABAD
        </div>



        <div className={styles.temperature}>
          {weather.temperature.toFixed(0)}°
        </div>



        <div className={styles.condition}>
          {weatherName(weather.condition)}
        </div>



        <div className={styles.details}>
          Humidity {weather.humidity}%
        </div>



        <div className={styles.forecast}>


          <div className={styles.forecastTitle}>
            NEXT HOURS
          </div>



          <div className={styles.hours}>

            {
              weather.forecast.map((hour)=>(

                <div
                  key={hour.time}
                  className={styles.hour}
                >

                  <span>
                    {hour.time}
                  </span>


                  <strong>
                    {hour.temp.toFixed(0)}°
                  </strong>


                </div>
                

              ))
            }

          </div>


        </div>

        <div className={styles.message}>
          {weather.message}
        </div>


      </div>


    </div>

  );

}