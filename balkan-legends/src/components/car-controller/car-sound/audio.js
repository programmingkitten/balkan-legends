import { useState } from 'react';
import useSound from 'use-sound';

import lowLow from './low-lowRpm.mp3'
import lowMid from './low-lowRpm.mp3'
import lowHigh from './low-lowRpm.mp3'
import midLow from './low-lowRpm.mp3'
import midMid from './low-lowRpm.mp3'
import midHigh from './low-lowRpm.mp3'
import highLow from './low-lowRpm.mp3'
import revLimiter from './low-lowRpm.mp3'





export default function EngineSound(props) {

    console.log(props.rpm)
    const sounds = {
        '2': playLowLow,
        '3': playLowMid,
        '4': playLowHigh,
        '5': playMidLow,
        '6': playMidMid,
        '7': playMidHigh,
        '8': playHighLow,
    }

    const [playLowLow] = useSound(lowLow, {volume: 0.99})
    const [playLowMid] = useSound(lowMid, {volume: 0.99})
    const [playLowHigh] = useSound(lowHigh, {volume: 0.99})
    const [playMidLow] = useSound(midLow, {volume: 0.99})
    const [playMidMid] = useSound(midMid, {volume: 0.99})
    const [playMidHigh] = useSound(midHigh, {volume: 0.99})
    const [playHighLow] = useSound(highLow, {volume: 0.99})
    const [playRevLimiter] = useSound(revLimiter, {volume: 0.99})

    return <div></div>
}

export function rpmSound(rpm, maxRpm) {
    console.log(rpm/maxRpm*10)
}