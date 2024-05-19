import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const getColors = async () => {
    const response = await axios.get(`${API_URL}/colors`);
    return response.data;
};

export const getTransportTypes = async () => {
    const response = await axios.get(`${API_URL}/transporttypes`);
    return response.data;
};

export const getBrands = async () => {
    const response = await axios.get(`${API_URL}/brands`);
    return response.data;
};

export const getPersons = async () => {
    const response = await axios.get(`${API_URL}/persons`);
    return response.data;
};

export const getOrganizations = async () => {
    const response = await axios.get(`${API_URL}/organizations`);
    return response.data;
};

export const getTransportNumberDirectory = async () => {
    const response = await axios.get(`${API_URL}/transport-number`);
    return response.data;
};

export const getAccidentTypes = async () => {
    const response = await axios.get(`${API_URL}/accidenttypes`);
    return response.data;
};

export const getRoadAccidents = async () => {
    const response = await axios.get(`${API_URL}/roadaccidents`);
    return response.data;
};

export const getTransportsDamagedInAccident = async () => {
    const response = await axios.get(`${API_URL}/transports-damaged-in-accident`);
    return response.data;
};

export const getHijackingsResult = async () => {
    const response = await axios.get(`${API_URL}/hijackings-result`);
    return response.data;
};

export const getHijackings = async () => {
    const response = await axios.get(`${API_URL}/hijackings`);
    return response.data;
};

export const getInspection = async () => {
    const response = await axios.get(`${API_URL}/inspection`);
    return response.data;
};
