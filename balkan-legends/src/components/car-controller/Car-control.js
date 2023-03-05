
import React, { useEffect, useState } from "react";
import styles from "./Car-controller.module.css"

export default function CarController() {


    useEffect(() => {
        document.addEventListener('keydown', keyDownHandler)
        //temporary solution due to react-use-keypress library not working correctly
    })

    function keyDownHandler(e) {
        console.log(e.key)
    }

    function onKeyDownHandler(e) {
        console.log(e.key)
        console.log("?")
    }
    

    return <div className={styles.game} onKeyDown={onKeyDownHandler}>
        <h1>ok</h1>
        </div>
}