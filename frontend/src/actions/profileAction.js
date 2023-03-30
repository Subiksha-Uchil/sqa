import axios from "axios";
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
	NEW_REVIEW_REQUEST,
	NEW_REVIEW_SUCCESS,
	NEW_REVIEW_FAIL,
	NEW_PROFILE_FAIL,
	NEW_PROFILE_REQUEST,
	NEW_PROFILE_SUCCESS,
	DELETE_PROFILE_REQUEST,
	DELETE_PROFILE_FAIL,
	UPDATE_PROFILE_FAIL,
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_SUCCESS,
	DELETE_PROFILE_SUCCESS,
	ALL_REVIEW_REQUEST,
	ALL_REVIEW_SUCCESS,
	ALL_REVIEW_FAIL,
	DELETE_REVIEW_REQUEST,
	DELETE_REVIEW_SUCCESS,
	DELETE_REVIEW_FAIL,
	DELETE_REVIEW_RESET,
	CLEAR_ERRORS,
} from "../constants/profileConstants";

export const getProfile =
	(
		keyword = "",
		currentPage = 1,
		salary = [0, 25000],
		category,
		location,
		ratings = 0
	) =>
	async (dispatch) => {
		try {
			dispatch({ type: ALL_PROFILE_REQUEST });
			let link = `/api/v1/profiles?keyword=${keyword}&page=${currentPage}&salary[gte]=${salary[0]}&salary[lte]=${salary[1]}&ratings[gte]=${ratings}`;
			if (category) {
				link = `/api/v1/profiles?keyword=${keyword}&page=${currentPage}&salary[gte]=${salary[0]}&salary[lte]=${salary[1]}&category=${category}&ratings[gte]=${ratings}`;
			}
			if (location) {
				link = `/api/v1/profiles?keyword=${keyword}&page=${currentPage}&salary[gte]=${salary[0]}&salary[lte]=${salary[1]}&category=${category}&location=${location}&ratings[gte]=${ratings}`;
			}
			const { data } = await axios.get(link);
			dispatch({
				type: ALL_PROFILE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: ALL_PROFILE_FAIL,
				payload: error.response.data.message,
			});
		}
	};

// Get All Products For Admin
export const getAdminProfile = () => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_PROFILE_REQUEST });

		const { data } = await axios.get("/api/v1/admin/profiles");

		dispatch({
			type: ADMIN_PROFILE_SUCCESS,
			payload: data.profiles,
		});
	} catch (error) {
		dispatch({
			type: ADMIN_PROFILE_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const getProfileDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: PROFILE_DETAILS_REQUEST });
		const { data } = await axios.get(`/api/v1/profile/${id}`);
		dispatch({
			type: PROFILE_DETAILS_SUCCESS,
			payload: data.profile,
		});
	} catch (error) {
		dispatch({
			type: PROFILE_DETAILS_FAIL,
			payload: error.response.data.message,
		});
	}
};

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
	try {
		dispatch({ type: NEW_REVIEW_REQUEST });

		const config = {
			headers: { "Content-Type": "application/json" },
		};

		const { data } = await axios.put(`/api/v1/review`, reviewData, config);

		dispatch({
			type: NEW_REVIEW_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: NEW_REVIEW_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Create Product
export const createProfile = (profileData) => async (dispatch) => {
	try {
		dispatch({ type: NEW_PROFILE_REQUEST });

		const config = {
			headers: { "Content-Type": "application/json" },
		};

		const { data } = await axios.post(
			`/api/v1/profile/new`,
			profileData,
			config
		);

		dispatch({
			type: NEW_PROFILE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: NEW_PROFILE_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Update Product
export const updateProfile = (id, profileData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_PROFILE_REQUEST });

		const config = {
			headers: { "Content-Type": "application/json" },
		};

		const { data } = await axios.put(
			`/api/v1/admin/profile/${id}`,
			profileData,
			config
		);

		dispatch({
			type: UPDATE_PROFILE_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: UPDATE_PROFILE_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Delete Product
export const deleteProfile = (id) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_PROFILE_REQUEST });

		const { data } = await axios.delete(`/api/v1/admin/profile/${id}`);

		dispatch({
			type: DELETE_PROFILE_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: DELETE_PROFILE_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Get All Reviews of a Profile
export const getAllReviews = (id) => async (dispatch) => {
	try {
		dispatch({ type: ALL_REVIEW_REQUEST });

		const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

		dispatch({
			type: ALL_REVIEW_SUCCESS,
			payload: data.reviews,
		});
	} catch (error) {
		dispatch({
			type: ALL_REVIEW_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Delete Review of a Profile
export const deleteReviews = (reviewId, profileId) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_REVIEW_REQUEST });

		const { data } = await axios.delete(
			`/api/v1/reviews?id=${reviewId}&profileId=${profileId}`
		);

		dispatch({
			type: DELETE_REVIEW_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: DELETE_REVIEW_FAIL,
			payload: error.response.data.message,
		});
	}
};

//clearing errors

export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
