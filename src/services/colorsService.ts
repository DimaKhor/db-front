import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const addColor = async (name: string) => {
    try {
        const response = await axios.post(`${API_URL}/colors`, { name });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data);
        } else {
            throw new Error('An unexpected error occurred while adding the color.');
        }
    }
};

export const deleteColor = async (id: number) => {
    try {
        await axios.delete(`${API_URL}/colors/${id}`);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data);
        } else {
            throw new Error('An unexpected error occurred while deleting the color.');
        }
    }
};

export const updateColor = async (id: number, name: string) => {
    try {
        const response = await axios.put(`${API_URL}/colors/${id}`, { name });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data);
        } else {
            throw new Error('An unexpected error occurred while updating the color.');
        }
    }
};
