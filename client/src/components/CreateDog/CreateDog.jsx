import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createDog, getAllTemperaments } from "../../redux/actions/actions";
import styles from "./CreateDog.module.css";

export default function CreateDog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allTemps = useSelector((state) => state.temperaments);
  let tempsName = allTemps.map((t) => t.name).sort();

  // ACÁ TEMPERAMENTS SIEMPRE ES UN ARRAY

  const [errors, setErrors] = useState("");
  const [dog, setDog] = useState({
    name: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    temperaments: [],
    min_life_span: "",
    max_life_span: "",
    imgUrl: "",
  });

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, [dispatch]);

  let weight = `${dog.minWeight} - ${dog.maxWeight} kgs`;
  let height = `${dog.minHeight} - ${dog.maxHeight} inches`;
  let life_span = `${dog.min_life_span} - ${dog.max_life_span} years`;
  let newDog = {
    name: dog.name,
    weight,
    height,
    temperaments: dog.temperaments,
    life_span,
    imgUrl: dog.imgUrl,
  };

  function handleChange(e) {
    setDog({ ...dog, [e.target.name]: e.target.value });
    setErrors(validate(dog));
  }

  function handleSelect(e) {
    if (!dog.temperaments.includes(e.target.value))
      setDog({
        ...dog,
        temperaments: [...dog.temperaments, e.target.value],
      });
  }

  const handleDelete = (t) => {
    setDog({
      ...dog,
      temperaments: dog.temperaments.filter((temp) => temp !== t),
    });
  };

  function handleSubmit(e) {
    console.log(newDog);
    if (newDog.imgUrl === "")
      newDog.imgUrl =
        "https://freepsdflyer.com/wp-content/uploads/2016/10/Lost-Dog-FREE-PSD-Flyer-Template-FreePSDFlyer-com.jpg";
    e.preventDefault();
    dispatch(createDog(newDog));
    alert("Dog created sucefully!");
    navigate("/home");
  }
  // console.log(errors)
  return (
    <div className={styles.dogForm}>
      <Link to="/home">
        <button className={styles.goBack}>Back to home</button>
      </Link>
      <br />
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Create a new breed!</h1>
        {/* --------------------------------------NAME */}
        <label>Name: </label>
        <br />
        <input
          type="text"
          name="name"
          autoComplete="off"
          value={dog.name}
          onChange={(e) => handleChange(e)}
          required
          minLength={3}
        ></input>
        {errors.name && <p className={styles.emergent}>{errors.name}</p>}
        <br />
        {/* --------------------------------------HEIGHT */}
        <label>Height in inches: </label>
        <br />
        <span className={styles.guide}>min (2)</span>
        <input
          type="number"
          name="minHeight"
          value={dog.minHeight}
          onChange={(e) => handleChange(e)}
          required
          min={2}
          // max={15}
        ></input>
        -
        <input
          // className={errors.height && "danger"}
          type="number"
          name="maxHeight"
          value={dog.maxHeight}
          onChange={(e) => handleChange(e)}
          required
          // min={10}
          max={40}
        ></input>
        <span className={styles.guide}>max (40)</span>
        <br />
        {errors.height && <p className={styles.emergent}>{errors.height}</p>}
        {/* --------------------------------------WEIGHT */}
        <label>Weight in kgs: </label>
        <br />
        <span className={styles.guide}>min (2)</span>
        <input
          // className={errors.weight && "danger"}
          type="number"
          name="minWeight"
          value={dog.minWeight}
          onChange={(e) => handleChange(e)}
          required
          min={2}
          // max={20}
        ></input>
        -
        <input
          // className={errors.weight && "danger"}
          type="number"
          name="maxWeight"
          value={dog.maxWeight}
          onChange={(e) => handleChange(e)}
          required
          // min={5}
          max={90}
        ></input>
        <span className={styles.guide}>max (90)</span>
        {errors.weight && <p className={styles.emergent}>{errors.weight}</p>}
        <br />
        {/* --------------------------------------LIFE SPAN */}
        <label>Life Span in years: </label>
        <br />
        <span className={styles.guide}>min (5) </span>
        <input
          // className={errors.life_span && "danger"}
          type="number"
          name="min_life_span"
          value={dog.min_life_span}
          onChange={(e) => handleChange(e)}
          required
          min={5}
          // max={10}
        ></input>
        -
        <input
          //  className={errors.life_span && "danger"}
          type="number"
          name="max_life_span"
          value={dog.max_life_span}
          onChange={(e) => handleChange(e)}
          required
          // min={10}
          max={20}
        ></input>
        <span className={styles.guide}>max (20)</span>
        {errors.life_span && (
          <p className={styles.emergent}>{errors.life_span}</p>
        )}
        <br />
        {/* --------------------------------------IMAGE */}
        <label>Image: </label>
        <br />
        <input
          type="url"
          name="imgUrl"
          value={dog.imgUrl}
          onChange={(e) => handleChange(e)}
        ></input>
        {errors.imgUrl && <p className={styles.emergent}>{errors.imgUrl}</p>}
        <br />
        {/* --------------------------------------TEMPERAMENT SELECT */}
        <label>Temperament: </label>
        <br />
        <select onChange={(e) => handleSelect(e)}>
          <option disabled>Temperaments</option>
          {tempsName.map((t) => {
            return (
              <option value={t} key={tempsName.indexOf(t)}>
                {t}
              </option>
            );
          })}
        </select>
        {/* --------------------------------------TEMPERAMENTS ADDED */}
        <ul className={styles.tempsAdded}>
          {dog.temperaments.map((t) => {
            return (
              <li key={dog.temperaments.indexOf(t)}>
                <div
                  key={dog.temperaments.indexOf(t)}
                  className={styles.buttonTemp}
                >
                  {t}
                  <button
                    className={styles.buttonSelect}
                    onClick={() => handleDelete(t)}
                  >
                    x
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <br />
        <button className={styles.create} type="submit">
          Create
        </button>
      </form>
    </div>
  );
}

//--------------FUNCION VALIDATE
export function validate(dog) {
  let errors = {};

  //--------------------------------NAME
  if (!dog.name) {
    errors.name = "Name is required";
  }
  if (/[0-9!@#$%^&*]/gim.test(dog.name)) {
    errors.name = "Name cannot contain numbers or symbols";
  }

  //-----------------------------WEIGHT
  if (parseInt(dog.minWeight) > 25) {
    errors.weight = "Minimum weight cannot exceed 25 kgs";
  }
  if (parseInt(dog.maxWeight) < 5) {
    errors.weight = "Maximum cannot be less than 5 kgs";
  }
  if (parseInt(dog.minWeight) > parseInt(dog.maxWeight)) {
    errors.height = "Minimum 2eight cannot be greater than maximum";
  }
  //   // if(!dog.minWeight || !dog.maxWeight){
  //   //   errors.weight = "Weight is required"
  //   // }

  //------------------------------HEIGHT
  if (parseInt(dog.minHeight) > 15) {
    errors.height = "Minimum height cannot exceed 15 inches";
  }
  if (parseInt(dog.maxHeight) < 5) {
    errors.height = "Maximum height cannot be less than 10 inches";
  }
  if (parseInt(dog.minHeight) > parseInt(dog.maxHeight)) {
    errors.height = "Minimum height cannot be greater than maximum";
  }
  //   if (parseInt(dog.minHeight) < 5 || parseInt(dog.maxWeight) > 36) {
  //     errors.weight = "The weight has to be between of 5 and 36 inches"
  //   }
  //   // if(!dog.minHeight || !dog.maxHeight){
  //   //   errors.height = "Height is required"
  //   // }

  //-----------------------------LIFE SPAN
  if (parseInt(dog.min_life_span) > 10) {
    errors.life_span = "Minimum life span cannot exceed 10 years";
  }
  if (parseInt(dog.max_life_span) < 5) {
    errors.life_span = "Maximum life span cannot be less than 10 years";
  }
  if (dog.min_life_span > dog.max_life_span) {
    errors.life_span = "Minimum life span cannot be greater than maximum";
  }
  //   if (parseInt(dog.min_life_span) < 6 || parseInt(dog.max_life_span) > 20) {
  //     errors.life_span = "The weight has to be between of 6 and 20 inches"
  //   }
  //   // else if(!dog.min_life_span || !dog.max_life_span){
  //   //   errors.life_span = "Life Span is required"
  //   // }

  //-----------------------------IMAGE
  // if(!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(dog.imgUrl)){
  //   errors.imgUrl = "Insert a valid image URL"
  // }

  return errors;
}
