import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:8080';

export const getInspectionById = async (id: number): Promise<any> => {
    try {
        const response = await axios.get(`${API_URL}/inspection/${id}`);
        return response.data;
    } catch (error: any) {
        handleRequestError(error);
    }
};

export const addInspection = async (dto: any): Promise<any> => {
    try {
        const response = await axios.post(`${API_URL}/inspection`, dto);
        return response.data;
    } catch (error: any) {
        handleRequestError(error);
    }
};

export const updateInspection = async (id: number, dto: any): Promise<any> => {
    try {
        const response = await axios.put(`${API_URL}/inspection/${id}`, dto);
        return response.data;
    } catch (error: any) {
        handleRequestError(error);
    }
};

export const deleteInspection = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/inspection/${id}`);
    } catch (error: any) {
        handleRequestError(error);
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
