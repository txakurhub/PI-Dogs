import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteDog, getDogDetails } from "../../redux/actions/actions";
import Loader from "../Home/Loader";
import styles from "./Details.module.css";

export default function Details() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [loader, setLoader] = useState(true);
  let selected = useSelector((state) => state.dog[0]);

  useEffect(() => {
    dispatch(getDogDetails(params.id)).then(() => setLoader(false));
  }, [dispatch, params.id]);

  //   ----------------------  TEMPERAMENTS PUEDE SER UN ARRAY O STRING

  if (loader === true) {
    return <Loader />;
  }
  if (selected) {
    // --- Manipulación de temperaments
    let tempAux = [];
    if (Array.isArray(selected.temperaments)) {
      selected.temperaments.forEach((t) => {
        tempAux.push(t);
      });
      selected = { ...selected, temperaments: tempAux.join(",  ") };
    }

    function handleDestroy(e) {
      e.preventDefault();
      if (window.confirm("ARE YOU SURE ABOUT DELETING THIS DOG?")) {
        dispatch(deleteDog(selected.id));
        alert("Dog erased from dabase");
        navigate("/home");
      }
    }
    return (
      <div className={styles.details} key={selected.id}>
        <br />

        <img
          className={styles.detailImg}
          src={selected.imgUrl}
          alt="dogDetail"
          width="90%"
          height="auto"
        />
        <div className={styles.dogDetailsData}>
          <h2 className={styles.h2details}>{selected.name}</h2>
          <h5 className={styles.h5details}>
            {"Height: " + selected.height + " inches"}
          </h5>
          <h5 className={styles.h5details}>
            {"Weight: " + selected.weight + " kgs"}
          </h5>
          <h5 className={styles.h5details}>
            {"Life Span: " + selected.life_span}
          </h5>
          <h3 className={styles.h3details}>
            {"Temperaments: " + selected.temperaments}
          </h3>
          <p className={styles.pDetails}>
            {selected.description && "Description: " + selected.description}
          </p>
        </div>

        <div className={styles.botones}>
          {/*  ---  button delete --- */}
          {selected.hasOwnProperty("createdInDb") && (
            <button className={styles.deleteButton} onClick={handleDestroy}>
              Delete
            </button>
          )}
          {/* ---  button edit --- */}
          {/* {selected.hasOwnProperty("createdInDb") && (
            <Link to={`/home/${selected.id}/edit`}>
            <button className={styles.deleteButton}>
              Edit Dog
            </button>
            </Link>
          )} */}
          {/*  ---  button go Back --- */}
          <Link to="/home">
            <button className={styles.goBack}>GO BACK</button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>
          TRY WITH ANOTHER ONE, <br /> THIS DOG WAS <br/> NOT FOUND :(
        </h1>
        <Link to="/home">
            <button className={styles.goBack}>GO BACK</button>
          </Link>
      </div>
    );
  }
}
