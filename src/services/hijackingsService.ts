import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:8080';

export const getHijackingById = async (id: number): Promise<any> => {
    try {
        const response = await axios.get(`${API_URL}/hijackings/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data);
        } else {
            throw new Error('An unexpected error occurred while adding the color.');
        }
    }
};

export const addHijacking = async (dto: any): Promise<any> => {
    try {
        const response = await axios.post(`${API_URL}/hijackings`, dto);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data);
        } else {
            throw new Error('An unexpected error occurred while adding the color.');
        }
    }
};

export const updateHijacking = async (id: number, dto: any): Promise<any> => {
    try {
        const response = await axios.put(`${API_URL}/hijackings/${id}`, dto);
        return response.data;
    } catch (error: any) {
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
    }
};

export const deleteHijacking = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/hijackings/${id}`);
    } catch (error: any) {
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
    }
};
