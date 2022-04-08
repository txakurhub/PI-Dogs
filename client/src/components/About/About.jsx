import React from "react";
import { Link } from "react-router-dom";
import styles from "./About.module.css";

export default function About() {
  return (
    <div>
      <h1>ABOUT</h1>

      <p className={styles.description}>
        It is a SPA (Single Page Application) in which we can see information of
        different breeds of dogs, brought from an external API
        (https://thedogapi.com/), as well as create new breeds through a
        controlled form and save them in a database, to later to be able to
        search, filter and obtain the details of the selected breed.
      </p>
      <div className={styles.tecs}>
        <h3 className={styles.h3}>Used technology</h3>
        <h4 className={styles.h4}>» JavaScript, ES6 </h4>
        <h4 className={styles.h4}>» Data Base: PostgreSQL</h4>
        <h4 className={styles.h4}>» Back-End: Nodejs, Express, Sequelize</h4>
        <h4 className={styles.h4}>» Front-End: React, Redux, CSS (puro), CSS Modules</h4>
      </div>
      <Link to="/home">
        <button className={styles.goBack}>Back to home</button>
      </Link>
    </div>
  );
}
