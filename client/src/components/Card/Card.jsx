import React from "react";
import styles from "./Card.module.css";

export default function Card({ name, img, weight, temperament, id }) {
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
      <h4>{temperament}</h4>
      <h5>{weight + " kgs"}</h5>
    </div>
  );
}
