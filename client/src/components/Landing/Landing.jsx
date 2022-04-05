import React from "react";
import { Link } from "react-router-dom";
import loguito from "../../images/dog_logo.jpg";
import styles from "./Landing.module.css"
import logoLink from "../../images/logolinkedin.png"
import logoGit from "../../images/logogithub.png"

export default function Landing() {
  return (
    <div className={styles.landing}>
      <h1 className={styles.h1Land}>BARK</h1>
      <Link to="/home">
        <img src={loguito} alt="imagen loca" className={styles.logoLand}/>
      </Link>
        <div className={styles.chivos} >
      <a href="https://www.linkedin.com/in/leandro-pereyra-1a7468227/">
        <img src={logoLink} className={styles.linkedin} alt="linkedin" />
      </a>
      <a href="https://github.com/txakurhub">
      <img src={logoGit} className={styles.github} alt="linkedin" />
      </a>
        </div>
    </div>
  );
}
