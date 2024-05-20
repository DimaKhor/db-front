import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:8080';

export const getHijackingById = async (id: number): Promise<any> => {
    try {
        const response = await axios.get(`${API_URL}/hijackings/${id}`);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(`Failed to get hijacking: ${error.response.data}`);
        } else {
            throw new Error(`Failed to get hijacking: ${error.message}`);
        }
    }
};

export const addHijacking = async (dto: any): Promise<any> => {
    try {
        const response = await axios.post(`${API_URL}/hijackings`, dto);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(`Failed to add hijacking: ${error.response.data}`);
        } else {
            throw new Error(`Failed to add hijacking: ${error.message}`);
        }
    }
};

export const updateHijacking = async (id: number, dto: any): Promise<any> => {
    try {
        const response = await axios.put(`${API_URL}/hijackings/${id}`, dto);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(`Failed to update hijacking: ${error.response.data}`);
        } else {
            throw new Error(`Failed to update hijacking: ${error.message}`);
        }
    }
};

export const deleteHijacking = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/hijackings/${id}`);
    } catch (error: any) {
        if (error.response) {
            throw new Error(`Failed to delete hijacking: ${error.response.data}`);
        } else {
            throw new Error(`Failed to delete hijacking: ${error.message}`);
        }
    }
};
