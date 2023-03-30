import {
	ALL_PROFILE_FAIL,
	ALL_PROFILE_REQUEST,
	ALL_PROFILE_SUCCESS,
	ADMIN_PROFILE_FAIL,
	ADMIN_PROFILE_REQUEST,
	ADMIN_PROFILE_SUCCESS,
	PROFILE_DETAILS_REQUEST,
	PROFILE_DETAILS_SUCCESS,
	PROFILE_DETAILS_FAIL,
	NEW_PROFILE_FAIL,
	NEW_PROFILE_REQUEST,
	NEW_PROFILE_RESET,
	NEW_PROFILE_SUCCESS,
	DELETE_PROFILE_REQUEST,
	DELETE_PROFILE_FAIL,
	DELETE_PROFILE_RESET,
	DELETE_PROFILE_SUCCESS,
	UPDATE_PROFILE_FAIL,
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_RESET,
	UPDATE_PROFILE_SUCCESS,
	NEW_REVIEW_REQUEST,
	NEW_REVIEW_SUCCESS,
	NEW_REVIEW_FAIL,
	NEW_REVIEW_RESET,
	ALL_REVIEW_REQUEST,
	ALL_REVIEW_SUCCESS,
	ALL_REVIEW_FAIL,
	DELETE_REVIEW_REQUEST,
	DELETE_REVIEW_SUCCESS,
	DELETE_REVIEW_FAIL,
	DELETE_REVIEW_RESET,
	CLEAR_ERRORS,
} from "../constants/profileConstants";

export const profilesReducer = (state = { profiles: [] }, action) => {
	switch (action.type) {
		case ALL_PROFILE_REQUEST:
		case ADMIN_PROFILE_REQUEST:
			return {
				loading: true,
				profiles: [],
			};
		case ALL_PROFILE_SUCCESS:
			return {
				loading: false,
				profiles: action.payload.profiles,
				profilesCount: action.payload.profilesCount,
				resultPerPage: action.payload.resultPerPage,
				filteredProfilesCount: action.payload.filteredProfilesCount,
			};
		case ADMIN_PROFILE_SUCCESS:
			return {
				loading: false,
				profiles: action.payload,
			};
		case ALL_PROFILE_FAIL:
		case ADMIN_PROFILE_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

export const profileReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_PROFILE_REQUEST:
		case UPDATE_PROFILE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case DELETE_PROFILE_SUCCESS:
			return {
				...state,
				loading: false,
				isDeleted: action.payload,
			};
		case UPDATE_PROFILE_SUCCESS:
			return {
				...state,
				loading: false,
				isUpdated: action.payload,
			};
		case DELETE_PROFILE_FAIL:
		case UPDATE_PROFILE_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case DELETE_PROFILE_RESET:
			return {
				...state,
				isDeleted: false,
			};

		case UPDATE_PROFILE_RESET:
			return {
				...state,
				isUpdated: false,
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

export const profileDetailsReducer = (state = { profile: {} }, action) => {
	switch (action.type) {
		case PROFILE_DETAILS_REQUEST:
			return {
				loading: true,
				...state,
			};
		case PROFILE_DETAILS_SUCCESS:
			return {
				loading: false,
				profile: action.payload,
			};
		case PROFILE_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

export const newReviewReducer = (state = {}, action) => {
	switch (action.type) {
		case NEW_REVIEW_REQUEST:
			return {
				...state,
				loading: true,
			};
		case NEW_REVIEW_SUCCESS:
			return {
				loading: false,
				success: action.payload,
			};
		case NEW_REVIEW_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case NEW_REVIEW_RESET:
			return {
				...state,
				success: false,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

export const newProfileReducer = (state = { profile: {} }, action) => {
	switch (action.type) {
		case NEW_PROFILE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case NEW_PROFILE_SUCCESS:
			return {
				loading: false,
				success: action.payload.success,
				profile: action.payload.profile,
			};
		case NEW_PROFILE_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case NEW_PROFILE_RESET:
			return {
				...state,
				success: false,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

export const profileReviewsReducer = (state = { reviews: [] }, action) => {
	switch (action.type) {
		case ALL_REVIEW_REQUEST:
			return {
				...state,
				loading: true,
			};
		case ALL_REVIEW_SUCCESS:
			return {
				loading: false,
				reviews: action.payload,
			};
		case ALL_REVIEW_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

export const reviewReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_REVIEW_REQUEST:
			return {
				...state,
				loading: true,
			};
		case DELETE_REVIEW_SUCCESS:
			return {
				...state,
				loading: false,
				isDeleted: action.payload,
			};
		case DELETE_REVIEW_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case DELETE_REVIEW_RESET:
			return {
				...state,
				isDeleted: false,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
