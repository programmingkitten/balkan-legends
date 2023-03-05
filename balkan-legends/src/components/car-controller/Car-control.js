
import React, { useEffect, useState } from "react";
import styles from "./Car-controller.module.css"

export default function CarController() {

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
        60: 1.2,
        100: 1.6,
        140: 1.8,
        160: 2.2,
        200: 3,
        220: 3.2,

    })

    function windResistenceHandler(number ) {
        const closest = Object.keys(windResistenceRations).reduce((a, b) => {
            return Math.abs(b - number) < Math.abs(a - number) ? b : a;
        });
        return closest
    }

    const [gear, setGear] = useState(1)
    const [count, setCount] = useState(0)
    const [gasPower, setGasPower] = useState(0)
    const [speed, setSpeed] = useState(1)
    const [horsePower, setHorsePower] = useState(100);
    const [rpm, setRpm] = useState(800);
    const [maxRpm, setMaxRpm] = useState(7000)
    // function keyDownHandler(e) {
    //     if (e.key === 'w') {
    //        RpmSetter(rpm => rpm + 1)
    //     }
    // }; too fast

    function gearUpRpmCalculator(maxRpm, gearRatios, gear, speed) {
        return maxRpm/gearRatios[gear+1]*speed
    }

    function accelerationRpmCalculator(rpm, gasPower, horsePower, gear, maxRpm, speed) {
        return (rpm + 
        (Number(gasPower)
        *horsePower
        *(0.07-(0.01*gear))
        *((rpm/maxRpm)))
        /gear
        /windResistenceRations[windResistenceHandler(speed)])
    }

    function gearUpHandler() {
        if (gear < 6) {
            setGear(gear + 1)
            // 4000, 150, 
            const rpmChange = gearUpRpmCalculator(maxRpm, gearRatios, gear+1, speed)
            setRpm(rpmChange)
            setGasPower(0)
            windResistenceHandler(speed)
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
            
            else {
            }

            setSpeed(Math.trunc((gearRatios[gear]/maxRpm) * rpm))
        }, 100);
  
        //Clearing the interval
        return () => clearInterval(interval);
    }, [count]);
   
    

    return <div className={styles.game}>
        <h1>ok</h1>
        <label>{rpm.toFixed(0)}</label>
        <progress value={rpm} max={maxRpm}></progress>
        <input type="range" value={gasPower} onChange={(e) => setGasPower(e.target.value)}></input>
        <button onClick={gearUpHandler}>UP</button>
        <h1>Gear: {gear}</h1>
        <h1>speed: {speed}</h1>
        </div>
}