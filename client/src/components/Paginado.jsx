import React from "react";
import styles from "./Paginado.module.css";


export default function Paginado({dogsPerPage, allDogs, paginado}) {
  const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(allDogs / dogsPerPage) -1; i++) {
    pageNumbers.push(i + 1);
  }
  return (
    <div className={styles.paginadoE}>
      <ul>
        {pageNumbers?.map((n) => (
          <li className={styles.li}key={n}>
            <button className={styles.button} type="button" onClick={() => paginado(n)} >
              {n}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
