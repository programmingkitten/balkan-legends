import golf5 from './car-parts/golf5.png'
import rims from './car-parts/rims-1.png'
import styles from "./car.module.css"

const animation = {
    
}

export default function Car(props) {
    return <div>
        <div className={styles[props.car]}>
            <div className={[styles.car]}>
                <img src={golf5} alt="golf 5 car"></img>
                <div className={[styles.rims]}>
                <div className={styles[props.speed]}>
                    <img src={rims} alt="back tier rim" className={styles.frontTire}></img>
                    <img src={rims} alt="front tier rim" className={styles.backTire}></img>
                </div>
                </div>
            </div>
        </div>
       

        <styles></styles>
    </div>
}