import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:8080';

export const getInspectionById = async (id: number): Promise<any> => {
    try {
        const response = await axios.get(`${API_URL}/inspection/${id}`);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(`Failed to get inspection: ${error.response.data}`);
        } else {
            throw new Error(`Failed to get inspection: ${error.message}`);
        }
    }
};

export const addInspection = async (dto: any): Promise<any> => {
    try {
        const response = await axios.post(`${API_URL}/inspection`, dto);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(`Failed to add inspection: ${error.response.data}`);
        } else {
            throw new Error(`Failed to add inspection: ${error.message}`);
        }
    }
};

export const updateInspection = async (id: number, dto: any): Promise<any> => {
    try {
        const response = await axios.put(`${API_URL}/inspection/${id}`, dto);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(`Failed to update inspection: ${error.response.data}`);
        } else {
            throw new Error(`Failed to update inspection: ${error.message}`);
        }
    }
};

export const deleteInspection = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/inspection/${id}`);
    } catch (error: any) {
        if (error.response) {
            throw new Error(`Failed to delete inspection: ${error.response.data}`);
        } else {
            throw new Error(`Failed to delete inspection: ${error.message}`);
        }
    }
};
