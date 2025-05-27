import axios from "axios";
import { BASE_LOCATION_URL } from "./baseService";

export const getProvinces = () =>
    axios.get(`${BASE_LOCATION_URL}/1/0.htm`);

export const getDistricts = (provinceId) =>
    axios.get(`${BASE_LOCATION_URL}/2/${provinceId}.htm`);

export const getWards = (districtId) =>
    axios.get(`${BASE_LOCATION_URL}/3/${districtId}.htm`);