const axios = require("axios");

//          ACTION TYPES
export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_ALL_TEMPERAMENT = "GET_ALL_TEMPERAMENT";
export const FILTER_BY_TEMP = "FILTER_BY_TEMP";
export const CREATE_DOG = "CREATE_DOG";
export const SEARCH_BY_QUERY = "SEARCH_BY_QUERY";
export const FILTER_BY_NAME = "FILTER_BY_NAME";
export const SORT = "SORT";
export const GET_DOG_DETAILS = "GET_DOG_DETAILS";
export const SORT_WEIGHT = "SORT_WEIGHT";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const EDIT_DOGGY = "EDIT_DOGGY";
export const DELETE_DOG = "DELETE_DOG";


//                        ACTIONS
//----------------------------------------------------------------------
// export const getAllDogs = () => (dispatch) => {
//   return fetch("http://localhost:3001/dogs")
//   .then((res) => res.json())
//   .then((json) => dispatch({ type: GET_ALL_DOGS, payload: json }));
  export const getAllDogs = () => {
  return async function (dispatch) {
    const { data } = await axios.get("http://localhost:3001/dogs");
    dispatch({ type: GET_ALL_DOGS, payload: data });
  };
};
//----------------------------------------------------------------------
export const getAllTemperaments = () => {
  return async function (dispatch) {
    const { data } = await axios.get("http://localhost:3001/temperament");
    dispatch({ type: GET_ALL_TEMPERAMENT, payload: data });
  };
};
//----------------------------------------------------------------------
export const filterDogsByTemp = (payload) => {
  return {
    type: FILTER_BY_TEMP,
    payload: payload,
  };
};
//----------------------------------------------------------------------
export const filterDogsByName = (payload) => {
  return {
    type: FILTER_BY_NAME,
    payload,
  };
};
//----------------------------------------------------------------------
export const searchByQuery = (payload) => {
  return async function (dispatch) {
    const { data } = await axios.get(
      `http://localhost:3001/dogs?name=${payload}`
    );
    dispatch({
      type: SEARCH_BY_QUERY,
      payload: data,
    });
  };
};
//----------------------------------------------------------------------
export const getDogDetails = (id) => {
  return async function (dispatch) {
    const { data } = await axios.get(`http://localhost:3001/dogs/${id}`);
    dispatch({ type: GET_DOG_DETAILS, payload: data });
  };
};
//----------------------------------------------------------------------
export const sort = (payload) => {
  return {
    type: SORT,
    payload,
  };
};
//----------------------------------------------------------------------
export const sortWeight = (payload) => {
  return {
    type: SORT_WEIGHT,
    payload,
  };
};
//----------------------------------------------------------------------
export const createDog = (payload) => {
  return async function (dispatch) {
    const res = await axios.post("http://localhost:3001/dog", payload);
    return res;
  };
};
//----------------------------------------------------------------------
export const clearDetail = () => {
  return {
    type: CLEAR_DETAIL,
  };
};
//----------------------------------------------------------------------
export const editDoggy = (id, payload) => {
  return async function (dispatch) {
    const res = await axios.put(`http://localhost:3001/dogs/${id}`, payload);
    return res;
  };
};
//----------------------------------------------------------------------
export const deleteDog = (id) => {
  return async function (dispatch) {
    const res = await axios.delete(`http://localhost:3001/dogs/${id}`);
    return res;
  };
};
//----------------------------------------------------------------------
