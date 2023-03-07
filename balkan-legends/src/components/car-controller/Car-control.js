
import React, { useEffect, useState } from "react";
import Car from "../car/car";
import styles from "./Car-controller.module.css"
import {accelerationRpmCalculator, gearUpRpmCalculator, nearestInAnArray, wheelSpinRatios, gearRatios, windResistenceRations} from "../physics/rpm"

export default function CarController() {
    

    
    const [gear, setGear] = useState(1)
    const [count, setCount] = useState(0)
    const [gasPower, setGasPower] = useState(0)
    const [speed, setSpeed] = useState(2)
    const horsePower = 500;
    const maxRpm = 7000;
    const [rpm, setRpm] = useState(800);

    function gearUpHandler() {
        if (gear < 6) {
            setGear(gear + 1)
            const rpmChange = gearUpRpmCalculator(maxRpm, gearRatios, gear, speed)
            setRpm(rpmChange)
            setGasPower(1)
        }
    }
    
    useEffect(() => {
  
        const interval = setInterval(() => {
            setCount(count + 1);
            if (rpm < maxRpm && gasPower > 0) {
                const rpmAcceleration = accelerationRpmCalculator(windResistenceRations, rpm, gasPower, horsePower, gear, maxRpm, speed)
                setRpm(rpmAcceleration)
            } 
            
            else if (gasPower==0 && rpm > 900) {
                setRpm(rpm-50)
            }
            setSpeed(Math.trunc((gearRatios[gear]/maxRpm) * rpm))
        }, 50);
  
        return () => clearInterval(interval);
    }, [count]);
   
    

    return <div>
        <div className={styles.game}>
        <label className={rpm < 5000 ? styles.lowSpeed : styles.blinktext}>RPM:{rpm.toFixed(0)}</label><br></br>
        <progress value={rpm} max={maxRpm}></progress>
        <input type="range" value={gasPower} onChange={(e) => setGasPower(e.target.value)}></input>
        <button onClick={gearUpHandler}>UP</button>
        <h1>Gear: {gear}</h1>
        <h1>speed: {speed} km/h</h1>

        <div className={`${styles.road} ${styles[wheelSpinRatios[nearestInAnArray(Object.keys(wheelSpinRatios), speed)]]}`}>
        </div>


      
        </div>
        <Car speed={wheelSpinRatios[nearestInAnArray(Object.keys(wheelSpinRatios), speed)]} car={"second"}></Car>
        <Car speed={wheelSpinRatios[nearestInAnArray(Object.keys(wheelSpinRatios), speed)]} car={"first"}></Car>

        </div>
}