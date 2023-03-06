
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
        60: 5,
        100: 10,
        140: 20,
        160: 40,
        200: 49,
        220: 70,

    })


    function nearestInAnArray(keys, number) {
        const closest = keys.reduce((a, b) => {
            return Math.abs(b - number) < Math.abs(a - number) ? b : a;
        });
        console.log(closest)
        return closest
    }

    // function windResistenceHandler(number ) {
    //     const closest = Object.keys(windResistenceRations).reduce((a, b) => {
    //         return Math.abs(b - number) < Math.abs(a - number) ? b : a;
    //     });
    //     console.log(closest)
    //     return closest
    // }
    const [revLimiter, setRevLimiter] = useState(false)
    const [speedHisotry, setSpeedHistory] = useState([]);
    const [gear, setGear] = useState(1)
    const [count, setCount] = useState(0)
    const [gasPower, setGasPower] = useState(0)
    const [speed, setSpeed] = useState(2)
    const [horsePower, setHorsePower] = useState(500);
    const [rpm, setRpm] = useState(800);
    const [maxRpm, setMaxRpm] = useState(7000)


    function revLimiterAnimation(rpm) {
        const options = {
            true: '7050',
            false: '6900'
        }
        
        if (rpm > 6999) {
            setRevLimiter(!revLimiter)
            return options[revLimiter]
        } return rpm.toFixed(0);
    };

    function gearUpRpmCalculator(maxRpm, gearRatios, gear, speed) {
        return maxRpm/gearRatios[gear+1]*speed
    }

    function accelerationRpmCalculator(rpm, gasPower, horsePower, gear, maxRpm, speed) {
        const bonus = (Number(gasPower)
        *horsePower
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
            setGasPower(0)
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
   
    

    return <div className={styles.game}>
        <label className={rpm < 5000 ? styles.lowSpeed : styles.blinktext}>RPM:{rpm.toFixed(0)}</label><br></br>
        <progress value={rpm} max={maxRpm}></progress>
        <input type="range" value={gasPower} onChange={(e) => setGasPower(e.target.value)}></input>
        <button onClick={gearUpHandler}>UP</button>
        <h1>Gear: {gear}</h1>
        <h1>speed: {speed} km/h</h1>
        </div>
}