import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearDetail,
  getAllDogs,
  getAllTemperaments,
  sort,
  sortWeight,
} from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Logo from "../../images/dog_logo.jpg";
// import Paginado from "../Paginado";
import styles from "./Home.module.css";
import SearchBar from "./SearchBar";
import FilterByName from "./filters/FilterByName";
import FilterByTemp from "./filters/FilterByTemp";
import Loader from "./Loader";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [, setOrder] = useState("");
  const [loader, setLoader] = useState(true);

  //--------------------------PAGINADO PREV NEXT

  const pageNumbers = [];
  for (let i = 0; i <= Math.ceil(allDogs.length / 8) - 1; i++) {
    pageNumbers.push(i + 1);
  }
  const totalPagesToRender = pageNumbers.slice(currentPage, currentPage + 5);
  //--------------------------------------------

  const lastDogI = currentPage * 8;
  const firstDogI = lastDogI - 8;
  const currentDogs = allDogs.slice(firstDogI, lastDogI);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    dispatch(getAllDogs()).then(() => setLoader(false));
    dispatch(getAllTemperaments());
    dispatch(clearDetail());
  }, [dispatch]);

  function handleClick(e){
    e.preventDefault()
    dispatch(getAllDogs()).then(() => setLoader(false));
  }
  function handleSort(e) {
    e.preventDefault();
    dispatch(sort(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }
  function handleWeight(e) {
    e.preventDefault();
    dispatch(sortWeight(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  if (loader === true) {
    return <Loader />;
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
          <h1 onClick={handleClick}>Barkleaks</h1>
          <SearchBar />
        </div>

        <div className={styles.sCapa}>
          <div className={styles.sorts}>
            {/* FILTRO SORT */}
            <select className={styles.select} onChange={handleSort}>
              <option>Alphabetic</option>
              <option value="Asc">A - Z</option>
              <option value="Desc">Z - A</option>
            </select>
            <h4 className={styles.sorth4}>{`< SORT BY >`}</h4>
            {/* FILTRO PESO */}
            <select className={styles.select} onChange={handleWeight}>
              <option>Weight</option>
              <option value="Min">Min Weight</option>
              <option value="Max">Max Weight</option>
            </select>
          </div>
          <div className={styles.sorts}>
            <FilterByTemp className={styles.select} />
            <h4 className={styles.sorth4}>{`< FILTER BY >`}</h4>
            <FilterByName className={styles.select} />
          </div>

          <Link className={styles.linkNewBark} to="/dog">
            Create
            <br /> new bark
          </Link>
        </div>
      </nav>
      <div className={styles.SecondHalf}>
        <div className={styles.cardsGrid}>
          {currentDogs?.map((d) => {
            return (
              <div key={d.id} className={styles.cards}>
                <Link className={styles.link} key={d.id} to={`/home/${d.id}`}>
                  <Card
                    key={d.id}
                    name={d.name}
                    img={d.imgUrl}
                    temperaments={d.temperaments}
                    weight={d.weight}
                  />
                </Link>
              </div>
            );
          })}
        </div>
        {/* <Paginado
          dogsPerPage={8}
          allDogs={allDogs.length}
          paginado={paginado}
        /> */}
        {/*-------PAGINADO PREV NEXT -------------- */}
        <div className={styles.paginadoPrevNext}>
          {currentPage > 1 && (
            <button
              className={styles.button}
              onClick={() => paginado(currentPage - 1)}
            >
              Prev
            </button>
          )}
          {totalPagesToRender.map((p) => (
            <button
              className={styles.button}
              type="button"
              onClick={() => paginado(p)}
            >
              {p}
            </button>
          ))}
          {currentPage < pageNumbers.length - 1 && (
            <button
              className={styles.button}
              onClick={() => paginado(currentPage + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
