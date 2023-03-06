import {ALL_PROFILE_FAIL,ALL_PROFILE_REQUEST,ALL_PROFILE_SUCCESS,PROFILE_DETAILS_REQUEST,PROFILE_DETAILS_SUCCESS,PROFILE_DETAILS_FAIL, CLEAR_ERRORS} from "../constants/profileConstants"

export const profilesReducer =
    (state = { profiles: [] }, action) => {
        switch (action.type) {
            case ALL_PROFILE_REQUEST:
            
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
                };
            case ALL_PROFILE_FAIL:
            
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


    export const profileDetailsReducer =
    (state = { profile: {} }, action) => {
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