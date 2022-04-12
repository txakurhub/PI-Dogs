import React from "react";
import styles from "./Card.module.css";

export default function Card({ name, img, weight, temperaments, id }) {

//    -------- TEMPERAMENTS PUEDE SER ARRAY O STRING

  const tempAux = [];
  if (Array.isArray(temperaments)) {
    temperaments.forEach(t => { 
      tempAux.push(t)
    });
  }
  return (
    <div className={styles.card} key={id}>
      <img
        className={styles.cardImg}
        src={img}
        alt="thisDog"
        width="auto"
        height="150px"
      />
      <h3>{name}</h3>
      <h4>{tempAux.length > 0 ? tempAux.join(", ") : temperaments}</h4>
      <h5>{weight + " kgs"}</h5>
    </div>
  );
}
