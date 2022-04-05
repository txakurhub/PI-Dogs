import React from "react";
import { useDispatch } from "react-redux";
import { filterDogsByName } from "../../../redux/actions/actions";
import styles from "./FilterByName.module.css"

export default function FilterByName() {
  const dispatch = useDispatch();
 

  function handleFilterName(e) {
    dispatch(filterDogsByName(e));
  }

  return (
    <select className={styles.select} onChange={(e) => handleFilterName(e.target.value)}>
      <option value="All">All Breeds</option>
      <option value="Created">Created</option>
      <option value="Existing">Existing</option>
    </select>
  );
}
