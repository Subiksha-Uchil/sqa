import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	profilesReducer,
	profileDetailsReducer,
	newReviewReducer,
} from "./reducers/profileReducers";
import {
	accountReducer,
	forgotPasswordReducer,
	userReducer,
} from "./reducers/userReducer";

const reducer = combineReducers({
	profiles: profilesReducer,
	profileDetails: profileDetailsReducer,
	users: userReducer,
	account: accountReducer,
	forgotPassword: forgotPasswordReducer,
	newReview: newReviewReducer,
});

let initialState = {};
const middleware = [thunk];
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
