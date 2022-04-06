// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { sort } from "../../../redux/actions/actions";
// import styles from "./FilterSort.module.css";

// export default function FilterSort() {
//   const dispatch = useDispatch();

//   function handleSort(e) {
//     e.preventDefault();
//     dispatch(sort(e.target.value));
//    ;
//   }
//   return (
//     <select className={styles.select} onChange={e => handleSort(e)}>
//       <option value="Asc">Ascendant</option>
//       <option value="Desc">Descendant</option>
//       <option value="Min">Min Weight</option>
//       <option value="Max">Max Weight</option>
//     </select>
//   );
// }
