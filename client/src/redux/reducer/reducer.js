import {
  GET_ALL_TEMPERAMENT,
  FILTER_BY_TEMP,
  CREATE_DOG,
  SEARCH_BY_QUERY,
  FILTER_BY_NAME,
  DELETE_DOG,
  GET_ALL_DOGS,
  SORT,
  GET_DOG_DETAILS,
  SORT_WEIGHT,
  CLEAR_DETAIL,
  EDIT_DOGGY,
} from "../actions/actions";

const initialState = {
  dog: {},
  dogs: [],
  dogsTotal: [],
  temperaments: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    //----------------------------------------------------------------------
    case GET_ALL_DOGS:
   
      return {
        ...state,
        dogs: payload,
        dogsTotal: payload,
      };
    //----------------------------------------------------------------------
    case GET_ALL_TEMPERAMENT:
      return {
        ...state,
        temperaments: payload,
      };
    //----------------------------------------------------------------------
    case FILTER_BY_TEMP:
      const tempFilter = state.dogsTotal.filter((d) => {
        return payload !== "All"
          ? d.temperaments.includes(payload)
          : state.dogsTotal;
      });
      return {
        ...state,
        dogs: tempFilter,
      };
    //----------------------------------------------------------------------
    case FILTER_BY_NAME:
      const nameFilter =
        payload === "Created"
          ? state.dogsTotal.filter((d) => d.id > 999)
          : state.dogsTotal.filter((d) => d.id < 999);
      return {
        ...state,
        dogs: payload === "All" ? state.dogsTotal : nameFilter,
      };
    //----------------------------------------------------------------------
    case SORT:
      let sorting =
        payload === "Asc"
          ? state.dogs.sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
      return {
        ...state,
        dogs: sorting,
      };
    //----------------------------------------------------------------------
    case SORT_WEIGHT:
      let order =
        payload === "Min"
          ? state.dogs.sort(function (a, b) {
              if (
                parseInt(a.weight.slice(0, 2).trim()) >
                parseInt(b.weight.slice(0, 2).trim())
              )
                return 1;
              if (
                parseInt(b.weight.slice(0, 2).trim()) >
                parseInt(a.weight.slice(0, 2).trim())
              )
                return -1;
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (
                parseInt(a.weight.slice(-2).trim()) >
                parseInt(b.weight.slice(-2).trim())
              )
                return -1;
              if (
                parseInt(b.weight.slice(-2).trim()) >
                parseInt(a.weight.slice(-2).trim())
              )
                return 1;
              return 0;
            });
      return {
        ...state,
        dogs: order,
      };
    //----------------------------------------------------------------------
    case CREATE_DOG:
      return {
        ...state,
      };
    //----------------------------------------------------------------------
    case SEARCH_BY_QUERY:
      return {
        ...state,
        dogs: payload,
      };
    //----------------------------------------------------------------------
    case GET_DOG_DETAILS:
      return {
        ...state,
        dog: payload,
      };
    //----------------------------------------------------------------------
    case CLEAR_DETAIL:
      return {
        ...state,
        dog: {}
      }
    //----------------------------------------------------------------------
    case EDIT_DOGGY:
      return {
        ...state,
      };
    //----------------------------------------------------------------------
    case DELETE_DOG:
      return {
        ...state,
      };
    //----------------------------------------------------------------------
    default:
      return { ...state };
  }
};

export default rootReducer;
