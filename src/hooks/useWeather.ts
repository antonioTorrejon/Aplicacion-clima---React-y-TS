import axios from "axios"
import { z } from "zod"
// import {object, string, number, InferOutput, parse} from 'valibot'
import { BusquedaType} from "../types"
import { useMemo, useState } from "react"

//Type Guards
/* function isWeatherResponse ( clima: unknown ) : clima is Clima {
    return (
        Boolean(clima) &&
        typeof clima === 'object' &&
        typeof (clima as Clima).name === 'string' &&
        typeof (clima as Clima).main.temp === 'number' &&
        typeof (clima as Clima).main.temp_max === 'number' &&
        typeof (clima as Clima).main.temp_min === 'number'
    )
} */


//Zod
const Clima = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number(),
        humidity: z.number()
    }),
    wind: z.object({
        speed: z.number()
    })
})  

export type Clima = z.infer<typeof Clima>

/* //Valibot
const climaEsquema = object({
    name: string(),
    main: object({
        temp: number(),
        temp_max: number(),
        temp_min: number()
    })
})

type Clima = InferOutput<typeof climaEsquema> */

const initialState = {
    name: '',
    main: {
        temp: 0, 
        temp_max: 0, 
        temp_min: 0,
        humidity: 0
    },
    wind: {
        speed: 0
    }
}

export default function useWeather() {

    const [clima, setClima] = useState<Clima>(initialState)
    const [loading, setLoading] = useState(false)
    const [noEncontrado, setNoEncontrado] = useState(false)

    const consultaClima = async (busqueda: BusquedaType) => {

        const appId = import.meta.env.VITE_API_KEY

        setLoading(true)
        setClima(initialState)
        
        try {
            const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${busqueda.city},${busqueda.country}&appid=${appId}`
            const {data} = await axios(geoURL)

            //Comprobar si existe latitud y longitud
            if(!data[0]) {
                setNoEncontrado(true)
                return
            }

            const lat = data[0].lat
            const lon = data[0].lon

            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`


/*          //Castear el type: peor opción porque no reconoce errores
            const {data: weatherResult} = await axios<Clima>(weatherURL)
            console.log(weatherResult.main.temp)
            console.log(weatherResult.main.temp_max)
            console.log(weatherResult.name) */

            //Type guards
/*          const {data: weatherResult} = await axios(weatherURL)

            const resultado = isWeatherResponse(weatherResult)
            if(resultado) {
                console.log(weatherResult.name)
                console.log(weatherResult.main.temp)
            } else {
                console.log("Respuesta mal construida")
            } */


            //Zod
            const {data: weatherResult} = await axios(weatherURL)
            const resultado = Clima.safeParse(weatherResult)

            console.log(resultado)

            if(resultado.success){
                setClima(resultado.data)
                setNoEncontrado(false)
            } 

/*          //Valibot
            const {data: weatherResult} = await axios(weatherURL)
            const resultado = parse(climaEsquema, weatherResult)
            if(resultado){
                console.log(resultado.name)
            } else {
                console.log("Respuesta mal formada")
            } */

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const tenemosDatos = useMemo(() => clima.name, [clima])

    return{
        clima,
        loading,
        noEncontrado,
        consultaClima,
        tenemosDatos
    }
}
