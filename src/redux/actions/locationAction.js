import { getDistricts, getProvinces, getWards } from "../../service/locationService";
import { CLEAR_DISTRICTS, CLEAR_WARDS, SET_DISTRICTS, SET_PROVINCES, SET_WARDS } from "../constant";

export const getProvincesAction = () => {
    return async (dispatch) => {
        try {
            const result = await getProvinces();
            console.log(result?.data?.data);
            console.log(result?.status);
            if (result.status === 200) {
                dispatch({
                    type: SET_PROVINCES,
                    arrProvinces: result.data.data || []
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const getDistrictsAction = (provinceId) => {
    return async (dispatch) => {
        try {
            const result = await getDistricts(provinceId);
            console.log(result?.data?.data);
            if (result.status === 200) {
                dispatch({
                    type: SET_DISTRICTS,
                    arrDistricts: result.data.data || []
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};
export const getWardsAction = (districtId) => {
    return async (dispatch) => {
        try {
            const result = await getWards(districtId);
            console.log(result?.data?.data);
            if (result.status === 200) {
                dispatch({
                    type: SET_WARDS,
                    arrWards: result.data.data || []
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const clearDistricts = () => {
    return (dispatch) => {
        dispatch({ type: CLEAR_DISTRICTS });
    };
};

export const clearWards = () => {
    return (dispatch) => {
        dispatch({ type: CLEAR_WARDS });
    };
};