import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:8080';

export const addHijackingsResult = async (resultName: string): Promise<any> => {
    try {
        const response = await axios.post(`${API_URL}/hijackings-result`, { resultName });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data);
        } else {
            throw new Error('An unexpected error occurred while adding the color.');
        }
    }
};

export const updateHijackingsResult = async (id: number, resultName: string): Promise<any> => {
    try {
        const response = await axios.put(`${API_URL}/hijackings-result/${id}`, { resultName });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data);
        } else {
            throw new Error('An unexpected error occurred while adding the color.');
        }
    }
};

export const deleteHijackingsResult = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/hijackings-result/${id}`);
    } catch (error: any) {
        if (error.response) {
            throw new Error(`Failed to delete result: ${error.response.data}`);
        } else {
            throw new Error(`Failed to delete result: ${error.message}`);
        }
    }
};
