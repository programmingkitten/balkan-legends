
import React, { useEffect, useState } from "react";
import Car from "../car/car";
import styles from "./Car-controller.module.css"

export default function CarController() {
    const wheelSpinRatios = {
        0: 'noMovement',
        2: 'slow',
        90: 'regular',
        120: 'quick',
        160: 'fast',
        210: 'veryFast',
    }

    
    const [revLimiter, setRevLimiter] = useState(false)
    const [speedHisotry, setSpeedHistory] = useState([]);
    const [gear, setGear] = useState(1)
    const [count, setCount] = useState(0)
    const [gasPower, setGasPower] = useState(0)
    const [speed, setSpeed] = useState(2)
    const [horsePower, setHorsePower] = useState(500);
    const [rpm, setRpm] = useState(800);
    const [maxRpm, setMaxRpm] = useState(7000)

    const [gearRatios, setGearRatios] = useState({
        0: 1,
        1: 40,
        2: 80,
        3: 120,
        4: 150,
        5: 190,
        6: 220, 
    })

    const [windResistenceRations, setWindResistenceRations] = useState({
        40: 1,
        60: 5,
        100: 10,
        140: 20,
        160: 30,
        200: 35,
        220: 70,

    })

    function __calculateWheelAnimationSpeed() {
        console.log(wheelSpinRatios[nearestInAnArray(Object.keys(wheelSpinRatios), speed)])
        return wheelSpinRatios[nearestInAnArray(Object.keys(wheelSpinRatios), speed)]
    }

    function nearestInAnArray(keys, number) {
        const closest = keys.reduce((a, b) => {
            return Math.abs(b - number) < Math.abs(a - number) ? b : a;
        });
        console.log(closest)
        return closest
    }


    function gearUpRpmCalculator(maxRpm, gearRatios, gear, speed) {
        return maxRpm/gearRatios[gear+1]*speed
    }

    function accelerationRpmCalculator(rpm, gasPower, horsePower, gear, maxRpm, speed) {
        const bonus = (Number(gasPower)
        *horsePower*3
        *(0.07-(0.01*gear))
        *((rpm/maxRpm)))
        /gear
        /windResistenceRations[nearestInAnArray(Object.keys(windResistenceRations),speed)] 

        const result = (rpm + bonus)
        console.log(bonus)
        return result
    }

    function gearUpHandler() {
        if (gear < 6) {
            setGear(gear + 1)
            // 4000, 150, 
            const rpmChange = gearUpRpmCalculator(maxRpm, gearRatios, gear, speed)
            setRpm(rpmChange)
            setGasPower(1)
        }
    }
    
    useEffect(() => {
  
        const interval = setInterval(() => {
            setCount(count + 1);
            if (rpm < maxRpm && gasPower > 0) {
                const rpmAcceleration = accelerationRpmCalculator(rpm, gasPower, horsePower, gear, maxRpm, speed)
                setRpm(rpmAcceleration)
            } 
            
            else if (gasPower==0 && rpm > 900) {
                setRpm(rpm-50)
            }
            
            
            setSpeedHistory(oldArray => [...oldArray, speed])
            if (speedHisotry.length > 2) {
                if (speedHisotry.slice(-2)+20 > speedHisotry.slice(-1)) {
            setSpeed(Math.trunc((gearRatios[gear]/maxRpm) * rpm))

                }
            }

        }, 50);
  
        //Clearing the interval
        return () => clearInterval(interval);
    }, [count]);
   
    

    return <div>
          <h1 className={styles.ok}>OK</h1>
        <div className={styles.game}>
        <label className={rpm < 5000 ? styles.lowSpeed : styles.blinktext}>RPM:{rpm.toFixed(0)}</label><br></br>
        <progress value={rpm} max={maxRpm}></progress>
        <input type="range" value={gasPower} onChange={(e) => setGasPower(e.target.value)}></input>
        <button onClick={gearUpHandler}>UP</button>
        <h1>Gear: {gear}</h1>
        <h1>speed: {speed} km/h</h1>

        <div className={`${styles.road} ${styles[__calculateWheelAnimationSpeed()]}`}>
            <div className={styles.road2}></div>
        </div>


      
        </div>
        <Car speed={__calculateWheelAnimationSpeed()} car={"second"}></Car>
        <Car speed={__calculateWheelAnimationSpeed()} car={"first"}></Car>

        </div>
}