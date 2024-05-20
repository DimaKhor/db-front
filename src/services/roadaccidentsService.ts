import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:8080';

export const getRoadAccidentById = async (id: number): Promise<any> => {
    try {
        const response = await axios.get(`${API_URL}/roadaccidents/${id}`);
        return response.data;
    } catch (error: any) {
        handleRequestError(error);
    }
};

export const addRoadAccident = async (dto: any): Promise<any> => {
    try {
        const response = await axios.post(`${API_URL}/roadaccidents`, dto);
        return response.data;
    } catch (error: any) {
        handleRequestError(error);
    }
};

export const updateRoadAccident = async (id: number, dto: any): Promise<any> => {
    try {
        const response = await axios.put(`${API_URL}/roadaccidents/${id}`, dto);
        return response.data;
    } catch (error: any) {
        handleRequestError(error);
    }
};

export const deleteRoadAccident = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/roadaccidents/${id}`);
    } catch (error: any) {
        if (error.response) {
            throw new Error(`Failed to delete road accident: ${error.response.data}`);
        } else {
            throw new Error(`Failed to delete road accidente: ${error.message}`);
        }
    }
};

const handleRequestError = (error: AxiosError): void => {
    if (error.response) {
        console.error('Request failed with status code:', error.response.status);
        console.error('Response data:', error.response.data);
        throw new Error(`Request failed with status code: ${error.response.status}`);
    } else if (error.request) {
        console.error('No response received:', error.request);
        throw new Error('No response received from server');
    } else {
        console.error('Error setting up the request:', error.message);
        throw new Error(`Error setting up the request: ${error.message}`);
    }
};
