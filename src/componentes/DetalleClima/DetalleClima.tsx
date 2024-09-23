import { formatTemp } from "../../helpers"
import { Clima } from "../../hooks/useWeather"
import styles from "./DetalleClima.module.css"


type DetalleClimaProps = {
    clima: Clima
}

export default function DetalleClima({clima}: DetalleClimaProps) {
    return (
      <div className={styles.container}>
            <h2>Clima de: <span>{clima.name}</span></h2>
            <p className={styles.actual}>{ formatTemp (clima.main.temp)}&deg;C</p>
            <div className={styles.temperaturas}>
                <p>Min: <span>{ formatTemp (clima.main.temp_min)}&deg;C</span></p>
                <p>Max: <span>{ formatTemp (clima.main.temp_max)}&deg;C</span></p>
            </div>
            <div className={styles.temperaturas}>
                <p>Hum: <span>{clima.main.humidity}%</span></p>
                <p>Vie: <span>{clima.wind.speed}m/s</span></p>
            </div>
          
      </div>
    )
  } 

    