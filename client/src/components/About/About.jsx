import React from "react";
import { Link } from "react-router-dom";
import styles from "./About.module.css";
import logoLink from "../../images/logolinkedin.png";
import logoGit from "../../images/logogithub.png";

export default function About() {
  return (
    <div className={styles.container}>
      <div className={styles.h1About}>

      <h1 className={styles.h1}>ABOUT</h1>
      </div>
    <div className={styles.pContainer}>
      <p className={styles.description}>
        This proyect is a SPA (Single Page Application) in which we can see
        information of different breeds of dogs, brought from an external API
        (https://thedogapi.com/), as well as create new breeds through a
        controlled form and save them in a database, to later to be able to
        search, filter and obtain the details of the selected breed.
      </p>
    </div>
      <div className={styles.medium}>
      
        <div className={styles.tecs}>
          <h3 className={styles.h3}>Used technology</h3>
          <h4 className={styles.h4}>» JavaScript, ES6 </h4>
          <h4 className={styles.h4}>» Data Base: PostgreSQL</h4>
          <h4 className={styles.h4}>» Back-End: Nodejs, Express, Sequelize</h4>
          <h4 className={styles.h4}>
            » Front-End: React, Redux, CSS, CSS Modules
          </h4>
        </div>
        <div className={styles.chivos}>
          <a href="https://github.com/txakurhub">
            <img src={logoGit} className={styles.github} alt="linkedin" />
          </a>
          <a href="https://www.linkedin.com/in/leandro-pereyra-1a7468227/">
            <img src={logoLink} className={styles.linkedin} alt="linkedin" />
          </a>
        </div>
      </div>
      <Link to="/home">
        <button className={styles.goBack}>Back to home</button>
      </Link>
    </div>
  );
}
