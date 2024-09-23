import { ReactNode } from "react"
import styles from "./Alerta.module.css"

export default function Alerta({children} : {children: ReactNode}) {
  return (
    <div className={styles.alerta}>
        {children}
    </div>
  )
}
