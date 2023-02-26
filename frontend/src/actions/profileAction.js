import axios from "axios";
import {ALL_PROFILE_FAIL,ALL_PROFILE_REQUEST,ALL_PROFILE_SUCCESS,PROFILE_DETAILS_REQUEST,PROFILE_DETAILS_SUCCESS,PROFILE_DETAILS_FAIL, CLEAR_ERRORS} from "../constants/profileConstants"

export const getProfile = (keyword=" ", currentPage = 1) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PROFILE_REQUEST });
        const { data } = await axios.get(`/api/v1/profiles?keyword=${keyword}&page=${currentPage}`);
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