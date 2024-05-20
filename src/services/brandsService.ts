import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const addBrand = async (name: string) => {
    try {
        const response = await axios.post(`${API_URL}/brands`, { name });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(`Failed to add brand: ${error.response.data}`);
        } else {
            throw new Error(`Failed to add brand: ${error.message}`);
        }
    }
};

export const updateBrand = async (id: number, name: string) => {
    try {
        const response = await axios.put(`${API_URL}/brands/${id}`, { name });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(`Failed to update brand: ${error.response.data}`);
        } else {
            throw new Error(`Failed to update brand: ${error.message}`);
        }
    }
};

export const deleteBrand = async (id: number) => {
    try {
        await axios.delete(`${API_URL}/brands/${id}`);
    } catch (error: any) {
        if (error.response) {
            throw new Error(`Failed to delete brand: ${error.response.data}`);
        } else {
            throw new Error(`Failed to delete brand: ${error.message}`);
        }
    }
};
