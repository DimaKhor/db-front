import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:8080';

export const addAccidentType = async (name: string): Promise<any> => {
    try {
        const response = await axios.post(`${API_URL}/accidenttypes`, { name });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(`${error.response.data}`);
        } else {
            throw new Error(`${error.message}`);
        }
    }
};

export const updateAccidentType = async (id: number, name: string): Promise<any> => {
    try {
        const response = await axios.put(`${API_URL}/accidenttypes/${id}`, { name });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(`${error.response.data}`);
        } else {
            throw new Error(`${error.message}`);
        }
    }
};

export const deleteAccidentType = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/accidenttypes/${id}`);
    } catch (error: any) {
        if (error.response) {
            throw new Error(`${error.response.data}`);
        } else {
            throw new Error(`${error.message}`);
        }
    }
};
