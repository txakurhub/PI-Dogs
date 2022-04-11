import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editDoggy, getAllTemperaments } from "../../redux/actions/actions";
// import styles from "./CreateDog.module.css";

export default function EditDog() {
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
  let newDog 
  if(dog.name !== "") newDog.name = dog.name
  if(dog.minWeight !== "") newDog.weight = weight
  if(dog.height !== "") newDog.height = height
  if(dog.life_span !== "") newDog.life_span = life_span
  if(dog.imgUrl !== "") newDog.imgUrl = dog.imgUrl
  

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
    e.preventDefault();
    dispatch(editDoggy(newDog));
    alert("Dog edited sucefully!");
    navigate("/home");
  }
  // console.log(errors)
  return (
    <div >
      <Link to="/home">
        <button >Back to home</button>
      </Link>
      <br />
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Edit a created breed!</h1>
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
        {errors.name && <p >{errors.name}</p>}
        <br />
        <label>Height in inches: </label>
        <br />
        <span >min (2)</span>
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
        <span >max (40)</span>
        <br />
        {errors.height && <p >{errors.height}</p>}
        <label>Weight in kgs: </label>
        <br />
        <span >min (2)</span>
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
        <span >max (90)</span>
        {errors.weight && <p >{errors.weight}</p>}
        <br />
        <label>Life Span in years: </label>
        <br />
        <span >min (5) </span>
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
        <span >max (20)</span>
        {errors.life_span && (
          <p >{errors.life_span}</p>
        )}
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
        <ul>
          {dog.temperaments.map((t) => {
            return (
              <li>
                <div
                  key={dog.temperaments.indexOf(t)}
            
                >
                  {t}
                  <button
                 
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
        <button  type="submit">
          Edit
        </button>
      </form>
    </div>
  );
}
export function validate(dog) {
  let errors = {};

  //   if (!dog.name) {
  //     errors.name = "Name is required";
  //   }
  if (/[0-9!@#$%^&*]/gim.test(dog.name)) {
    errors.name = "Name cannot contain numbers or symbols";
  }
  if (parseInt(dog.minWeight) > 20) {
    errors.weight = "Minimum weight cannot exceed 20 kgs";
  }
  if (parseInt(dog.maxWeight) < 5) {
    errors.weight = "Maximum cannot be less than 5 kgs";
  }
  //   // if(!dog.minWeight || !dog.maxWeight){
  //   //   errors.weight = "Weight is required"
  //   // }
  if (parseInt(dog.minHeight) > 15) {
    errors.height = "Minimum height cannot exceed 15 inches";
  }
  if (parseInt(dog.maxHeight) < 5) {
    errors.height = "Maximum height cannot be less than 10 inches";
  }
  //   if (parseInt(dog.minHeight) < 5 || parseInt(dog.maxWeight) > 36) {
  //     errors.weight = "The weight has to be between of 5 and 36 inches"
  //   }
  //   // if(!dog.minHeight || !dog.maxHeight){
  //   //   errors.height = "Height is required"
  //   // }

  if (parseInt(dog.min_life_span) > 10) {
    errors.life_span = "Minimum life span cannot exceed 10 years";
  }
  if (parseInt(dog.max_life_span) < 5) {
    errors.life_span = "Maximum life span cannot be less than 10 years";
  }
  //   if (parseInt(dog.min_life_span) < 6 || parseInt(dog.max_life_span) > 20) {
  //     errors.life_span = "The weight has to be between of 6 and 20 inches"
  //   }
  //   // else if(!dog.min_life_span || !dog.max_life_span){
  //   //   errors.life_span = "Life Span is required"
  //   // }

  return errors;
}
