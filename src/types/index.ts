export type BusquedaType = {
    city: string
    country: string
}

export type Country = {
    code: string
    name: string
}

export type Clima = {
    name: string
    main: {
        temp: number
        temp_max: number
        temp_min: number
        humidity: number
   }
   wind: {
        speed: number
   }
}