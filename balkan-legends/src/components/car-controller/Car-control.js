
import React, { useEffect, useState } from "react";
import styles from "./Car-controller.module.css"

export default function CarController() {

    const [count, setCount] = useState(0)
    const [gasPower, setGasPower] = useState(0)
    const [speed, setSpeed] = useState(0)
    const [horsePower, setHorsePower] = useState(100);
    const [rpm, setRpm] = useState(800);
    const [maxRpm, setMaxRpm] = useState(4000)
    // function keyDownHandler(e) {
    //     if (e.key === 'w') {
    //        RpmSetter(rpm => rpm + 1)
    //     }
    // }; too fast
    
    useEffect(() => {
  
        const interval = setInterval(() => {
            setCount(count + 1);
            if (rpm >= maxRpm) {
                setRpm(rpm => rpm-200)
                console.log('interesting')
            } else {
            setRpm(rpm + (gasPower*horsePower*0.01))

            }
        }, 100);
  
        //Clearing the interval
        return () => clearInterval(interval);
    }, [count]);
   
    

    return <div className={styles.game}>
        <h1>ok</h1>
        <label>{rpm}</label>
        <progress value={rpm} max={maxRpm}></progress>
        <input type="range" value={gasPower} onChange={(e) => setGasPower(e.target.value)}></input>
        </div>
}