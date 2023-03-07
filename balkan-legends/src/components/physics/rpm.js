export const wheelSpinRatios = {
    0: 'noMovement',
    2: 'slow',
    90: 'regular',
    120: 'quick',
    160: 'fast',
    210: 'veryFast',
}

export const gearRatios = {
    0: 1,
    1: 40,
    2: 80,
    3: 120,
    4: 150,
    5: 190,
    6: 220, 
}

export const windResistenceRations = {
    40: 1,
    60: 5,
    100: 10,
    140: 20,
    160: 30,
    200: 35,
    220: 70,

}

export function accelerationRpmCalculator(windResitenceRatios, rpm, gasPower, horsePower, gear, maxRpm, speed) {
    const bonus = (Number(gasPower)
    *horsePower*3
    *(0.07-(0.01*gear))
    *((rpm/maxRpm)))
    /gear
    /windResitenceRatios[nearestInAnArray(Object.keys(windResitenceRatios),speed)] 

    const result = (rpm + bonus)
    return result
}

export function gearUpRpmCalculator(maxRpm, gearRatios, gear, speed) {
    return maxRpm/gearRatios[gear+1]*speed
}

export function calculateWheelAnimationSpeed(wheelSpinRatios, speed) {
    console.log(wheelSpinRatios[nearestInAnArray(Object.keys(wheelSpinRatios), speed)])
    return wheelSpinRatios[nearestInAnArray(Object.keys(wheelSpinRatios), speed)]
}

export function nearestInAnArray(keys, number) {
    const closest = keys.reduce((a, b) => {
        return Math.abs(b - number) < Math.abs(a - number) ? b : a;
    });
    return closest
}