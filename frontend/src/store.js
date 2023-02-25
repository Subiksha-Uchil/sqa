import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { profilesReducer, profileDetailsReducer } from "./reducers/profileReducers";

const reducer = combineReducers({
    profiles: profilesReducer,
    profileDetails:profileDetailsReducer,
});

let initialState = {};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware))
);

export default store;