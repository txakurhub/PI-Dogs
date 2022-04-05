import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createDog, getAllTemperaments } from "../../redux/actions/actions";
import styles from "./CreateDog.module.css"

export default function CreateDog() {
  const dispatch = useDispatch();
  const allTemps = useSelector((state) => state.temperaments);
  let tempsName = allTemps.map((t) => t.name).sort();

  const [dog, setDog] = useState({
    name: "",
    minHeight: 0,
    maxHeight: 0,
    minWeight: 0,
    maxWeight: 0,
    temperaments: [],
    min_life_span: 0,
    max_life_span: 0,
    imgUrl: "",
  });
  const [errors, setErrors] = useState("")

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, [dispatch]);

  function handleChange(e) {
    setDog({ ...dog, [e.target.name]: e.target.value });
    setErrors(validate(dog))
  }
  let weight = `${dog.minWeight} - ${dog.maxWeight} kgs`;
  let height = `${dog.minHeight} - ${dog.maxHeight} inches`;
  let life_span = `${dog.min_life_span} - ${dog.max_life_span} years`;

  function handleSelect(e) {
    setDog({
      ...dog,
      temperaments: [...dog.temperaments, e.target.value],
    });
  }

  let newDog = {
    name: dog.name,
    weight,
    height,
    temperaments: dog.temperaments,
    life_span,
    imgUrl: dog.imgUrl,
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createDog(newDog));
  }
console.log(errors)
  return (
    <div className="dogForm">
      <Link to="/home">
        <button className={styles.goBack}>Back to home</button>
      </Link>
      <br />
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Create a new breed!</h1>
        <label>Name: </label>
        <br />
        <input
        className={errors.name && "danger"}
          type="text"
          name="name"
          value={dog.name}
          onChange={(e) => handleChange(e)}
        ></input>
           {errors.name && <p className={styles.danger}>{errors.name}</p>}
        <br />
        <label>Height: </label>
        <br />
        <input
        className={errors.height && "danger"}
          type="number"
          name="minHeight"
          value={dog.minHeight}
          onChange={(e) => handleChange(e)}
        ></input>
        <input
          className={errors.height && "danger"}
          type="number"
          name="maxHeight"
          value={dog.maxHeight}
          onChange={(e) => handleChange(e)}
        ></input>
        <br />
         {errors.height && <p className={styles.danger}>{errors.height}</p>}
        <label>Weight: </label>
        <br />
        <input
          className={errors.weight && "danger"}
          type="number"
          name="minWeight"
          value={dog.minWeight}
          onChange={(e) => handleChange(e)}
        ></input>
        <input
        className={errors.weight && "danger"}
          type="number"
          name="maxWeight"
          value={dog.maxWeight}
          onChange={(e) => handleChange(e)}
        ></input>
        {errors.weight && <p className={styles.danger}>{errors.weight}</p>}
        <br />
        <label>Life Span: </label>
        <br />
        <input
        className={errors.life_span && "danger"}
          type="number"
          name="min_life_span"
          value={dog.min_life_span}
          onChange={(e) => handleChange(e)}
        ></input>
        <input
         className={errors.life_span && "danger"}
          type="number"
          name="max_life_span"
          value={dog.max_life_span}
          onChange={(e) => handleChange(e)}
        ></input>
        {errors.life_span && <p className={styles.danger}>{errors.life_span}</p>}
        <br />
        <label>Image: </label>
        <br />
        <input
          type="url"
          name="imgUrl"
          value={dog.imgUrl}
          onChange={(e) => handleChange(e)}
        ></input>
        <br />
        <label>Temperament: </label>
        <br />
        <select>
          <option onChange={(e) => handleSelect(e)}>Temperaments</option>
          {tempsName.map((t) => {
            return (
              <option value={t} key={tempsName.indexOf(t)}>
                {t}
              </option>
            );
          })}
        </select>
        <ul>
          <li>{dog.temperaments.map((t) => t + ", ")}</li>
        </ul>

        {/* <input
          type="checkbox"
          name="temperament"
          value={dog.temperament}
          onChange={(e) => handleChange(e)}
        ></input>*/}

        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
export function validate(dog) {
  let errors = {};

  if (!dog.name) {
    errors.name = "Name is required";
  }

 
  if (parseInt(dog.minHeight) < 2 || parseInt(dog.maxWeight) > 90) {
    errors.height = "The height has to be between of 2 and 90 kgs"
  } 
  // else  if(!dog.minWeight || !dog.maxWeight){
  //   errors.weight = "Weight is required"
  // } 

  if (parseInt(dog.minHeight) < 5 || parseInt(dog.maxWeight) > 36) {
    errors.weight = "The weight has to be between of 5 and 36 inches"
  } 
  // else if(!dog.minHeight || !dog.maxHeight){
  //   errors.height = "Height is required"
  // }

  if (parseInt(dog.min_life_span) < 6 || parseInt(dog.max_life_span) > 20) {
    errors.life_span = "The weight has to be between of 6 and 20 inches"
  } 
  // else if(!dog.min_life_span || !dog.max_life_span){
  //   errors.life_span = "Life Span is required"
  // }
 
  
  
  return errors;
}
