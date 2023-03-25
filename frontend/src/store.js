import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	profilesReducer,
	profileDetailsReducer,
	newReviewReducer,
	newProfileReducer,
} from "./reducers/profileReducers";
import {
	accountReducer,
	forgotPasswordReducer,
	newMessageReducer,
	userReducer,
} from "./reducers/userReducer";

const reducer = combineReducers({
	profiles: profilesReducer,
	profileDetails: profileDetailsReducer,
	users: userReducer,
	account: accountReducer,
	forgotPassword: forgotPasswordReducer,
	newReview: newReviewReducer,
	newMessage: newMessageReducer,
	newProfile: newProfileReducer,
});

let initialState = {};
const middleware = [thunk];
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
