import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createDog, getAllTemperaments } from "../../redux/actions/actions";
import styles from "./CreateDog.module.css";

export default function CreateDog() {
  const dispatch = useDispatch();
  const allTemps = useSelector((state) => state.temperaments);
  let tempsName = allTemps.map((t) => t.name).sort();

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
  }

  function handleSelect(e) {
    if(!dog.temperaments.includes(e.target.value))
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
    e.preventDefault();
    dispatch(createDog(newDog));
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
        <label>Name: </label>
        <br />
        <input
          type="text"
          name="name"
          value={dog.name}
          onChange={(e) => handleChange(e)}
          required
          minLength={3}
        ></input>
        {/* {!errors.name 
         ? <p className={styles.emergentW}>{errors.name}</p>
         :  <p className={styles.emergent}>{errors.name}</p>
         } */}
        <br />
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
          max={10}
        ></input>
        -
        <input
          // className={errors.height && "danger"}
          type="number"
          name="maxHeight"
          value={dog.maxHeight}
          onChange={(e) => handleChange(e)}
          required
          min={10}
          max={40}
        ></input>
        <span className={styles.guide}>max (40)</span>
        <br />
        {/* {!errors.height 
         ? <p className={styles.emergentW}>{errors.height}</p>
         :  <p className={styles.emergent}>{errors.height}</p>
         } */}
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
          max={20}
        ></input>
        -
        <input
          // className={errors.weight && "danger"}
          type="number"
          name="maxWeight"
          value={dog.maxWeight}
          onChange={(e) => handleChange(e)}
          required
          min={5}
          max={90}
        ></input>
        <span className={styles.guide}>max (90)</span>
        {/* {!errors.weight 
         ? <p className={styles.emergentW}>{errors.weight}</p>
         :  <p className={styles.emergent}>{errors.weight}</p>
         } */}
        <br />
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
          max={10}
        ></input>
        -
        <input
          //  className={errors.life_span && "danger"}
          type="number"
          name="max_life_span"
          value={dog.max_life_span}
          onChange={(e) => handleChange(e)}
          required
          min={10}
          max={20}
        ></input>
        <span className={styles.guide}>max (20)</span>
        {/* {!errors.life_span 
         ? <p className={styles.emergentW}>{errors.life_span}</p>
         :  <p className={styles.emergent}>{errors.life_span}</p>
         } */}
        <br />
        <label>Image: </label>
        <br />
        <input
          type="url"
          name="imgUrl"
          value={dog.imgUrl}
          onChange={(e) => handleChange(e)}
          required
        ></input>
        <br />
        <label>Temperament: </label>
        <br />
        <select onChange={(e) => handleSelect(e)}>
          <option disabled>Temperaments</option>
          {tempsName.map((t) => {
            return (
              <option value={t}  selected key={tempsName.indexOf(t)}>
                {t}
              </option>
            );
          })}
        </select>
        <ul>
          {dog.temperaments.map((t) => {
            return (
              <li>
                <button
                  key={dog.temperaments.indexOf(t)}
                  className={styles.buttonSelect}
                  onClick={() => handleDelete(t)}
                >
                  {t}
                </button>
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
// export function validate(dog) {
//   let errors = {};

//   if (!dog.name) {
//     errors.name = "Name is required";
//   }
//   if (dog.name.length<3) {
//     errors.name = "Name must have at least three characters";
//   }

//   if (parseInt(dog.minHeight) < 2 || parseInt(dog.maxWeight) > 90) {
//     errors.height = "The height has to be between of 2 and 90 kgs"
//   }
//   // else  if(!dog.minWeight || !dog.maxWeight){
//   //   errors.weight = "Weight is required"
//   // }

//   if (parseInt(dog.minHeight) < 5 || parseInt(dog.maxWeight) > 36) {
//     errors.weight = "The weight has to be between of 5 and 36 inches"
//   }
//   // else if(!dog.minHeight || !dog.maxHeight){
//   //   errors.height = "Height is required"
//   // }

//   if (parseInt(dog.min_life_span) < 6 || parseInt(dog.max_life_span) > 20) {
//     errors.life_span = "The weight has to be between of 6 and 20 inches"
//   }
//   // else if(!dog.min_life_span || !dog.max_life_span){
//   //   errors.life_span = "Life Span is required"
//   // }

//   return errors;
// }
