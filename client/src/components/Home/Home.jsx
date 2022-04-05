import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDogs,
  getAllTemperaments,
  sort,
} from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Logo from "../../images/dog_logo.jpg";
import Paginado from "../Paginado";
import styles from "./Home.module.css";
import SearchBar from "./SearchBar";
import FilterByName from "./filters/FilterByName";
import FilterByTemp from "./filters/FilterByTemp";

export default function Home() {
  const dispatch = useDispatch();

  const allDogs = useSelector((state) => state.dogs);

  const [currentPage, setCurrentPage] = useState(1);
  const [orden, setOrden] = useState("");
  // const [dogsPerPage, setDogsPerPage] = useState(8);
  const lastDogI = currentPage * 8;
  const firstDogI = lastDogI - 8;
  const currentDogs = allDogs.slice(firstDogI, lastDogI);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getAllTemperaments());
  }, [dispatch]);

  // function handleClick(e) {
  //   e.preventDefault();
  //   dispatch(getAllDogs());
  // }
  function handleSort(e) {
    e.preventDefault();
    dispatch(sort(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div>
      <nav className={styles.nav}>
        <div className={styles.fCapa}>
          <Link to="/about" className={styles.logoImg}>
            <img
              id="nav-img"
              src={Logo}
              width="70"
              height="70"
              alt="un loguito"
            />
          </Link>
          <h1>DOGS</h1>
          <SearchBar />
        </div>

        <div className={styles.sCapa}>

        {/* FILTRO ASCENDENTE - DESCENDENTE */}
        <select className={styles.select} onChange={handleSort}>
          <option value="Asc">Ascendant</option>
          <option value="Desc">Descendant</option>
          <option value="Min">Min Weight</option>
          <option value="Max">Max Weight</option>
        </select>

        <FilterByTemp className={styles.select} />
        <FilterByName className={styles.select} />

          <Link className={styles.link} to="/dog">
            Create<br/> new bark
          </Link>
        </div>
      </nav>

      <div className={styles.cardsGrid}>
        {currentDogs?.map((d) => {
          return (
            <div key={d.id} className={styles.cards}>
              <Link className={styles.link} key={d.id} to={`/home/${d.id}`}>
                <Card
                  key={d.id}
                  name={d.name}
                  img={d.imgUrl}
                  temperament={d.temperament}
                  weight={d.weight}
                />
              </Link>
            </div>
          );
        })}
      </div>
      <Paginado dogsPerPage={8} allDogs={allDogs.length} paginado={paginado} />
    </div>
  );
}
