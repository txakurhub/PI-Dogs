import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterDogsByTemp } from "../../../redux/actions/actions";
import styles from "./FilterByTemp.module.css"

export default function FilterByTemp() {
  const dispatch = useDispatch();
  const allTemps = useSelector((state) => state.temperaments);

  let tempsName = allTemps.map((t) => t.name).sort();
  // console.log("FILTER LOG: " + tempsName)

  function handleFilterTemp(e) {
    dispatch(filterDogsByTemp(e));
  }

  return (
    <select  className={styles.select} onChange={(e) => handleFilterTemp(e.target.value)}>
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
