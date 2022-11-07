import { combineReducers } from "redux";

import addsubReducer from "./reducers/addsub";
import countingReducer from "./reducers/counting";
import loadingReducer from "./reducers/loading";

const rootReducer = combineReducers({
  value: addsubReducer,
  count: countingReducer,
  loading: loadingReducer,
});

export default rootReducer;
