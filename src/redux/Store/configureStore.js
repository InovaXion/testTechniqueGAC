// Store/configureStore.js
// un mélange du tutoriel openclassroom, de la doc de redux-persist, de SOF, du deuxieme tuto openclassroom sur redux-persist et un peu de chance... App.js est très brouillon, désolé..


import { createStore } from "redux";
import mileageReducer from "./Reducers/mileageReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, mileageReducer);

export default createStore(persistedReducer);

