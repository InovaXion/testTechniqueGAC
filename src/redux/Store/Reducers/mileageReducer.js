
var data = require("../../../../assets/json/mileage_readings.json");
const initialState = { mileage: data.mileage_readings };

function toggleMileage(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case "ADD_OR_UPDATE_MILEAGE":
      var mileageIndex = state.mileage.findIndex(
        (item) => item.id == action.value.id
      );
      if (mileageIndex !== -1) {

        // L'item est déjà dans le tableau, on l'update
        nextState = {
          ...state,
          mileage: state.mileage.map((item) =>
            item.id == action.value.id
              ? {
                  ...item,
                  issued_on: action.value.issued_on,
                  value: action.value.value,
                }
              : item
          ),
        };
      } else {
        // L'item n'est pas dans le tableau, on l'ajoute à la liste
        nextState = {
          ...state,
          mileage: [...state.mileage, action.value],
        };
      }
      return nextState || state;

    case "REMOVE_MILEAGE":
      var mileageIndex = state.mileage.findIndex(
        (item) => item.id == action.value.id
      );
      // L'item est remove du tableau
      console.log("action.value.id : ", action.value.id);
      nextState = {
        ...state,
        mileage: state.mileage.filter(
          (item, index) => item.id !== action.value.id
        ),
      };
      return nextState || state;

    case "REINI_MILEAGE":
      return initialState;

    default:
      return state;
  }
}

export default toggleMileage;
