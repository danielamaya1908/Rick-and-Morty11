const initialState = {
  myFavorites: [],
  allCharacters: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FAV":
      return { ...state, myFavorites: action.payload };

    case "REMOVE_FAV":
      return { ...state, myFavorites: action.payload };

    case "SET_ALL_CHARACTERS":
      return { ...state, allCharacters: action.payload };

    case "FILTER":
      if (action.payload === "ALL")
        return { ...state, myFavorites: state.allCharacters };
      else if (action.payload === "SELECCIONE") return { ...state };
      else
        return {
          ...state,
          myFavorites: state.allCharacters.filter(
            (char) => char.gender === action.payload
          ),
        };

    case "ORDER": {
      // Ordena tanto myFavorites como allCharacters
      let orderedFavs = state.myFavorites.slice().sort((a, b) => a.id - b.id);
      let orderedAll = state.allCharacters.slice().sort((a, b) => a.id - b.id);
      if (action.payload === "B") {
        orderedFavs.reverse();
        orderedAll.reverse();
      }
      if (action.payload === "SELECCIONE") return state;
      return { ...state, myFavorites: orderedFavs, allCharacters: orderedAll };
    }

    case "REMOVE_ALL_FAV":
      return {
        myFavorites: [],
        allCharacters: [],
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
