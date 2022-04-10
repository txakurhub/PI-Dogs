import React from "react";
import pug from "../../images/loadergif2.gif"
import styles from "./Loader.module.css"


export default function Loader () {


    return (
<div className={styles.pug}>
<div className={styles.relleno}>
<img className={styles.imageloader} src={pug} alt="loader"/>
   </div>
</div>
    );
}