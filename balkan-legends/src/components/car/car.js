import golf5 from './car-parts/golf5.png'
import rims from './car-parts/rims-1.png'
import styles from "./car.module.css"

const animation = {
    
}

export default function Car(props) {
    return <div className={styles.carWrapper}>
        <div className={styles.car}>
            <img src={golf5} alt="golf 5 car"></img>
        </div>

        <div className={[styles.rims]}>
            <div className={styles[props.speed]}>
                <img src={rims} alt="back tier rim" className={styles.frontTire} styles={{animation: "rotation 500ms infinite linear"}}></img>
                <img src={rims} alt="front tier rim" className={styles.backTire}></img>
            </div>
        </div>

        <styles></styles>
    </div>
}