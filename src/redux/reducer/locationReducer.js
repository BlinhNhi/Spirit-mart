import { CLEAR_DISTRICTS, CLEAR_WARDS, SET_DISTRICTS, SET_PROVINCES, SET_WARDS } from "../constant";
const initialState = {
    arrProvinces: [],
    arrDistricts: [],
    arrWards: [],
};

export default function locationReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PROVINCES:
            return {
                ...state,
                arrProvinces: [...action.arrProvinces]
            };

        case SET_DISTRICTS:
            return {
                ...state,
                arrDistricts: [...action.arrDistricts]
            };

        case SET_WARDS:
            return {
                ...state,
                arrWards: [...action.arrWards]
            };

        case CLEAR_DISTRICTS:
            return {
                ...state,
                arrDistricts: [],
                arrWards: []
            };

        case CLEAR_WARDS:
            return {
                ...state,
                arrWards: []
            };

        default:
            return state;
    }

}


