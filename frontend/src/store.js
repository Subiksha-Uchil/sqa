import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	profilesReducer,
	profileDetailsReducer,
	newReviewReducer,
	newProfileReducer,
	profileReducer,
	profileReviewsReducer,
	reviewReducer,
} from "./reducers/profileReducers";
import {
	accountReducer,
	allUsersReducer,
	forgotPasswordReducer,
	newMessageReducer,
	userDetailsReducer,
	userReducer,
} from "./reducers/userReducer";

const reducer = combineReducers({
	profiles: profilesReducer,
	profile: profileReducer,
	profileDetails: profileDetailsReducer,
	users: userReducer,
	account: accountReducer,
	forgotPassword: forgotPasswordReducer,
	newReview: newReviewReducer,
	newMessage: newMessageReducer,
	newProfile: newProfileReducer,
	allUsers: allUsersReducer,
	userDetails: userDetailsReducer,
	profileReviews: profileReviewsReducer,
	review: reviewReducer,
});

let initialState = {};
const middleware = [thunk];
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
