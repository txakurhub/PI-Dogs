import {
  GET_ALL_TEMPERAMENT,
  FILTER_BY_TEMP,
  CREATE_DOG,
  SEARCH_BY_QUERY,
  FILTER_BY_NAME,
  // DELETE_DOG,
  GET_ALL_DOGS,
  SORT,
  GET_DOG_DETAILS,
} from "../actions/actions";

const initialState = {
  dog: {},
  dogs: [],
  dogsTotal: [],
  temperaments: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: payload,
        dogsTotal: payload,
      };
    case GET_ALL_TEMPERAMENT:
      return {
        ...state,
        temperaments: payload,
      };
    case FILTER_BY_TEMP:
      const allDogsTemp = state.dogsTotal;
      const tempFilter = allDogsTemp.filter((d) => {
        if (typeof d.temperament === "string")
          return payload === "All"
            ? allDogsTemp
            : d.temperament.includes(payload);
      });
      return {
        ...state,
        dogs: tempFilter,
      };

    case FILTER_BY_NAME:
      const allDogsName = state.dogsTotal;
      const nameFilter =
        payload === "Created"
          ? allDogsName.filter((d) => d.createdInDb)
          : allDogsName.filter((d) => !d.createdInDb);
      return {
        ...state,
        dogs: payload === "All" ? allDogsName : nameFilter,
      };

    case SORT:
      let sorting =
        payload === "Asc"
          ? state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sorting,
      };

    case CREATE_DOG:
      return {
        ...state,
      };

    case SEARCH_BY_QUERY:
      return {
        ...state,
        dogs: payload,
      };

    case GET_DOG_DETAILS:
      return {
        ...state,
        dog: payload,
      };

    // case DELETE_DOG:
    //   return {
    //     ...state,
    //     dogs: state.dogs.filter((x) => x.id !== payload),
    //   };

    default:
      return { ...state };
  }
};

export default rootReducer;
