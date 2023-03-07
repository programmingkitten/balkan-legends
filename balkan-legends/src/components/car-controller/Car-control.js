import useSound from 'use-sound';
import React, { useEffect, useState } from "react";
import Car from "../car/car";
import styles from "./Car-controller.module.css"
import EngineSound, {rpmSound} from "./car-sound/audio"
import {accelerationRpmCalculator, gearUpRpmCalculator, nearestInAnArray, wheelSpinRatios, gearRatios, windResistenceRations} from "../physics/rpm"

import lowLow from './car-sound/low-lowRpm.mp3'
import lowMid from './car-sound/low-midRpm.mp3'
import lowHigh from './car-sound/low-highRpm.mp3'
import midLow from './car-sound/mid-highRpm.mp3'
import midMid from './car-sound/mid-highRpm.mp3'
import midHigh from './car-sound/mid-highRpm.mp3'
import highLow from './car-sound/high-lowRpm.mp3'
import revLimiter from './car-sound/revLimiter.mp3'

export default function CarController() {


    

    const [playLowLow] = useSound(lowLow, {volume: 0.99})
    const [playLowMid] = useSound(lowMid, {volume: 0.99})
    const [playLowHigh] = useSound(lowHigh, {volume: 0.99})
    const [playMidLow] = useSound(midLow, {volume: 0.99})
    const [playMidMid] = useSound(midMid, {volume: 0.99})
    const [playMidHigh] = useSound(midHigh, {volume: 0.99})
    const [playHighLow] = useSound(highLow, {volume: 0.99})
    const [playRevLimiter] = useSound(revLimiter, {volume: 0.99})

    const sounds = {
        '2': playLowLow,
        '3': playLowMid,
        '4': playLowHigh,
        '5': playMidLow,
        '6': playMidMid,
        '7': playMidHigh,
        '8': playHighLow,
        '9': playHighLow,
        '10': playRevLimiter,
    }
    
    const d = new Date();
    const [lastTime, setLastTime] = useState(-100)
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
            if (d.getSeconds()-lastTime > 0.3 || d.getSeconds() < 0) {
                const rpmPercentage = Math.round(rpm/maxRpm*10)
                const func = sounds[`${rpmPercentage}`];
                if (func) {
                    func();
                }
                setLastTime(d.getSeconds());
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