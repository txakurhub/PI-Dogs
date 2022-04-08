import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterDogsByTemp } from "../../../redux/actions/actions";
import styles from "./FilterByTemp.module.css";

export default function FilterByTemp() {
  const dispatch = useDispatch();
  const allTemps = useSelector((state) => state.temperaments);

  //        --------------- ACÁ TEMPERAMENTS SIEMPRE SERÁ UN ARRAY

  let tempsName = allTemps.map((t) => t.name).sort();

  function handleFilterTemp(e) {
    console.log(e.target.value);
    dispatch(filterDogsByTemp(e.target.value));
  }
  return (
    <select className={styles.select} onChange={(e) => handleFilterTemp(e)}>
      <option value="All">All Temperaments</option>
      {tempsName.map((t) => {
        return (
          <option value={t} key={tempsName.indexOf(t)}>
            {t}
          </option>
        );
      })}
    </select>
  );
}
