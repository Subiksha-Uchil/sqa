import {
	LOGIN_REQUEST,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAIL,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAIL,
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,
	UPDATE_ACCOUNT_REQUEST,
	UPDATE_ACCOUNT_SUCCESS,
	UPDATE_ACCOUNT_FAIL,
	UPDATE_ACCOUNT_RESET,
	UPDATE_PASSWORD_REQUEST,
	UPDATE_PASSWORD_SUCCESS,
	UPDATE_PASSWORD_RESET,
	UPDATE_PASSWORD_FAIL,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAIL,
	ALL_USERS_REQUEST,
	ALL_USERS_SUCCESS,
	ALL_USERS_FAIL,
	DELETE_USER_REQUEST,
	DELETE_USER_SUCCESS,
	DELETE_USER_FAIL,
	DELETE_USER_RESET,
	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAIL,
	UPDATE_USER_RESET,
	NEW_MESSAGE_FAIL,
	NEW_MESSAGE_REQUEST,
	NEW_MESSAGE_RESET,
	NEW_MESSAGE_SUCCESS,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	CLEAR_ERRORS,
} from "../constants/userConstants";

export const userReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
		case REGISTER_USER_REQUEST:
		case LOAD_USER_REQUEST:
			return {
				loading: true,
				isAuthenticated: false,
			};
		case LOGIN_SUCCESS:
		case REGISTER_USER_SUCCESS:
		case LOAD_USER_SUCCESS:
			return {
				...state,
				loading: false,
				isAuthenticated: true,
				users: action.payload,
			};

		case LOGOUT_SUCCESS:
			return {
				loading: false,
				users: null,
				isAuthenticated: false,
			};
		case LOGIN_FAIL:
		case REGISTER_USER_FAIL:
			return {
				...state,
				loading: false,
				isAuthenticated: false,
				users: null,
				error: action.payload,
			};

		case LOAD_USER_FAIL:
			return {
				loading: false,
				isAuthenticated: false,
				users: null,
				error: action.payload,
			};

		case LOGOUT_FAIL:
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

export const accountReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_ACCOUNT_REQUEST:
		case UPDATE_PASSWORD_REQUEST:
		case UPDATE_USER_REQUEST:
		case DELETE_USER_REQUEST:
			return {
				...state,
				loading: true,
			};
		case UPDATE_ACCOUNT_SUCCESS:
		case UPDATE_PASSWORD_SUCCESS:
		case UPDATE_USER_SUCCESS:
			return {
				...state,
				loading: false,
				isUpdated: action.payload,
			};

		case DELETE_USER_SUCCESS:
			return {
				...state,
				loading: false,
				isDeleted: action.payload.success,
				message: action.payload.message,
			};

		case UPDATE_ACCOUNT_FAIL:
		case UPDATE_PASSWORD_FAIL:
		case UPDATE_USER_FAIL:
		case DELETE_USER_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		case UPDATE_ACCOUNT_RESET:
		case UPDATE_PASSWORD_RESET:
		case UPDATE_USER_RESET:
			return {
				...state,
				isUpdated: false,
			};

		case DELETE_USER_RESET:
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

export const forgotPasswordReducer = (state = {}, action) => {
	switch (action.type) {
		case FORGOT_PASSWORD_REQUEST:
		case RESET_PASSWORD_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			};
		case FORGOT_PASSWORD_SUCCESS:
			return {
				...state,
				loading: false,
				message: action.payload,
			};

		case RESET_PASSWORD_SUCCESS:
			return {
				...state,
				loading: false,
				success: action.payload,
			};

		case FORGOT_PASSWORD_FAIL:
		case RESET_PASSWORD_FAIL:
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

export const newMessageReducer = (state = {}, action) => {
	switch (action.type) {
		case NEW_MESSAGE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case NEW_MESSAGE_SUCCESS:
			return {
				loading: false,
				success: action.payload,
			};
		case NEW_MESSAGE_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case NEW_MESSAGE_RESET:
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
