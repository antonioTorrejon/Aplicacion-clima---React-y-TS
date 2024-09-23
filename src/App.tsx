import styles from "./App.module.css"
import Alerta from "./componentes/Alertas/Alerta"
import DetalleClima from "./componentes/DetalleClima/DetalleClima"
import Formulario from "./componentes/Formulario/Formulario"
import Spinner from "./componentes/Spinners/Spinner"
import useWeather from "./hooks/useWeather"

function App() {

  const { clima, loading, noEncontrado, consultaClima, tenemosDatos } = useWeather()

  return (
    <>
      <h1 className={styles.titulo}>Buscador de clima</h1>

      <div className={styles.contenedor}>
            <Formulario 
                consultaClima = {consultaClima}
            />
            {loading && <Spinner />}
            {tenemosDatos &&
                <DetalleClima 
                    clima = {clima}
                />
            }   
            {noEncontrado && <Alerta>Ciudad no encontrada</Alerta>}    
      </div>
    </>
  )
}

export default App
