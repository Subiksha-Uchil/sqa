import axios from "axios";
import {ALL_PROFILE_FAIL,ALL_PROFILE_REQUEST,ALL_PROFILE_SUCCESS,PROFILE_DETAILS_REQUEST,PROFILE_DETAILS_SUCCESS,PROFILE_DETAILS_FAIL, CLEAR_ERRORS} from "../constants/profileConstants"

export const getProfile = (keyword="", currentPage = 1, salary=[0,25000],category,location,ratings=0) => async (dispatch) => {
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



//clearing errors

export const clearErrors = () => async (dispatch) => { 
    dispatch({ type: CLEAR_ERRORS });
}