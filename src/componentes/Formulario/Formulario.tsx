import { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { countries} from "../../data/paises";
import styles from "./Formulario.module.css"
import type { BusquedaType } from "../../types";
import Alerta from "../Alertas/Alerta";

type FormularioProps = {
    consultaClima: (busqueda: BusquedaType) => Promise<void>
}

export default function Formulario({consultaClima} : FormularioProps) {

    const [busqueda, setBusqueda] = useState<BusquedaType>({
        city: '',
        country: '', 
    })

    const [alerta, setAlerta] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> ) => 
    {
        setBusqueda({
            ...busqueda,
            [e.target.name] : [e.target.value]
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(Object.values(busqueda).includes('')){
            setAlerta('Todos los campos son obligatorios')
            return
        }
        consultaClima(busqueda)
    }

    return (
        <form 
            className={styles.formulario}
            onSubmit={handleSubmit}
        >
            <div className={styles.field}>
                <label htmlFor="city">Ciudad</label>
                <input 
                    type="text" 
                    id="city"
                    name="city"
                    placeholder="Ciudad"
                    value={busqueda.city}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="country">Pais</label>
                <select
                    id="country"
                    value={busqueda.country}
                    name="country"
                    onChange={handleChange}
                >
                    <option className={styles.opciones} value="">-- Seleccione un pais --</option>
                    {countries.map(country =>( 
                        <option
                            className={styles.opciones}
                            key={country.code}
                            value={country.code}
                        >{country.name}</option>
                    ))}
                </select>
            </div>

            <input type="submit" value="Consultar clima" className={styles.submit}/>

            {alerta && <Alerta>{alerta}</Alerta>}
        </form>
    )
}
